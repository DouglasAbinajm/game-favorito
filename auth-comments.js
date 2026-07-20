/* ============================================================
   AUTH-COMMENTS — sistema de conta (e-mail/senha) e comentários
   compartilhados de verdade, usando Firebase (Authentication +
   Firestore). Este arquivo é um "módulo" (por isso o
   type="module" no index.html) e conversa com o restante do
   site através de funções penduradas em `window`.

   Não precisa mexer neste arquivo pra usar — só preencher o
   firebase-config.js com as chaves do seu projeto.
============================================================ */

import { firebaseConfig } from './firebase-config.js';
import {
  initializeApp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut, updateProfile
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getFirestore, collection, addDoc, query, where, orderBy,
  onSnapshot, serverTimestamp, doc, getDoc, runTransaction
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;
let currentPostId = null;
let unsubscribeSnapshot = null;

/* ---- Traduz os erros mais comuns do Firebase pra português ---- */
function traduzErro(err){
  const code = err && err.code ? err.code : '';
  const mapa = {
    'auth/email-already-in-use': 'Esse e-mail já tem uma conta. Tente entrar.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
    'auth/user-not-found': 'Não existe conta com esse e-mail.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/too-many-requests': 'Muitas tentativas. Espere um pouco e tente de novo.',
  };
  return mapa[code] || 'Não foi possível concluir. Tente novamente.';
}

function formatWhen(ts){
  if (!ts || !ts.toDate) return 'agora mesmo';
  return ts.toDate().toLocaleDateString('pt-BR', {
    day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'
  }).replace('.', '');
}

/* ---- Alterna entre a caixa de login/cadastro e a de "logado" ---- */
function refreshAuthUI(){
  const authBox = document.getElementById('auth-box');
  const loggedBox = document.getElementById('logged-box');
  if (!authBox || !loggedBox) return;

  if (currentUser){
    authBox.classList.add('hidden');
    loggedBox.classList.remove('hidden');
    document.getElementById('logged-name').textContent =
      currentUser.displayName || currentUser.email;
  } else {
    authBox.classList.remove('hidden');
    loggedBox.classList.add('hidden');
  }
}

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  refreshAuthUI();
});

/* ---- Alternar abas Entrar / Criar conta ---- */
function setupTabs(){
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  if (!tabLogin) return;

  tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active'); tabSignup.classList.remove('active');
    loginForm.classList.remove('hidden'); signupForm.classList.add('hidden');
  });
  tabSignup.addEventListener('click', () => {
    tabSignup.classList.add('active'); tabLogin.classList.remove('active');
    signupForm.classList.remove('hidden'); loginForm.classList.add('hidden');
  });
}

/* ---- Cadastro ---- */
function setupSignup(){
  const form = document.getElementById('signup-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const msg = document.getElementById('signup-msg');
    msg.textContent = 'Criando conta...';
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      currentUser = { ...cred.user, displayName: name };
      msg.textContent = '';
      form.reset();
      refreshAuthUI();
    } catch (err){
      msg.textContent = traduzErro(err);
    }
  });
}

/* ---- Login ---- */
function setupLogin(){
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const msg = document.getElementById('login-msg');
    msg.textContent = 'Entrando...';
    try {
      await signInWithEmailAndPassword(auth, email, password);
      msg.textContent = '';
      form.reset();
    } catch (err){
      msg.textContent = traduzErro(err);
    }
  });
}

/* ---- Sair ---- */
function setupLogout(){
  const btn = document.getElementById('logout-btn');
  if (!btn) return;
  btn.addEventListener('click', () => signOut(auth));
}

/* ---- Publicar comentário ---- */
function setupCommentForm(){
  const form = document.getElementById('comment-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentUser || currentPostId === null) return;
    const textEl = document.getElementById('comment-text');
    const text = textEl.value.trim();
    if (!text) return;
    try {
      await addDoc(collection(db, 'comments'), {
        postId: currentPostId,
        uid: currentUser.uid,
        name: currentUser.displayName || currentUser.email,
        text,
        when: serverTimestamp()
      });
      textEl.value = '';
    } catch (err){
      alert('Não foi possível publicar o comentário. Tente novamente.');
    }
  });
}

/* ---- Renderizar a lista de comentários (com DOM, sem innerHTML,
   pra não correr risco de um comentário malicioso virar código) ---- */
function renderCommentsList(docs){
  const container = document.getElementById('comments-list');
  const title = document.getElementById('comments-title');
  title.textContent = `COMENTÁRIOS (${docs.length})`;
  container.innerHTML = '';

  if (docs.length === 0){
    const empty = document.createElement('div');
    empty.className = 'no-comments';
    empty.textContent = 'Seja a primeira pessoa a comentar.';
    container.appendChild(empty);
    return;
  }

  docs.forEach(d => {
    const item = document.createElement('div');
    item.className = 'comment-item';

    const who = document.createElement('div');
    who.className = 'who';
    who.textContent = d.name + ' ';

    const when = document.createElement('span');
    when.className = 'when';
    when.textContent = formatWhen(d.when);
    who.appendChild(when);

    const p = document.createElement('p');
    p.textContent = d.text;

    item.appendChild(who);
    item.appendChild(p);
    container.appendChild(item);
  });
}

/* ---- Chamada pelo index.html sempre que uma matéria é aberta ----
   Troca a "inscrição" (listener) do Firestore pra escutar só os
   comentários da matéria atual, em tempo real. */
window.loadCommentsForPost = function(postId){
  currentPostId = postId;
  if (unsubscribeSnapshot) unsubscribeSnapshot();

  const q = query(
    collection(db, 'comments'),
    where('postId', '==', postId),
    orderBy('when', 'asc')
  );

  unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs.map(doc => doc.data());
    renderCommentsList(docs);
  }, (err) => {
    document.getElementById('comments-list').innerHTML =
      '<div class="no-comments">Não foi possível carregar os comentários agora.</div>';
  });
};

/* ============================================================
   CURTIDAS — contagem compartilhada de verdade, no Firestore.
   Cada matéria tem um documento na coleção "likes" (o ID do
   documento é o ID da matéria) guardando só um campo: "count".
   Pra evitar que a mesma pessoa curta infinitas vezes sem
   precisar pedir login pra isso, guardamos no localStorage DESTE
   navegador se ela já curtiu essa matéria — não é à prova de
   trapaça (dá pra curtir de novo numa aba anônima), mas é
   suficiente pro nível do site.
============================================================ */

function likedLocallyKey(postId){ return 'gf_liked_' + postId; }

/* Se este navegador já curtiu essa matéria */
window.hasLikedPost = function(postId){
  return localStorage.getItem(likedLocallyKey(postId)) === '1';
};

/* Busca a contagem uma única vez (bom pra listas de cards) */
window.getLikesForPost = async function(postId){
  try {
    const snap = await getDoc(doc(db, 'likes', String(postId)));
    return snap.exists() ? (snap.data().count || 0) : 0;
  } catch (err){
    return 0;
  }
};

/* Acompanha a contagem em tempo real (bom pra página de UMA matéria
   aberta). Retorna uma função pra "desligar" essa escuta. */
window.watchLikesForPost = function(postId, onCount){
  return onSnapshot(doc(db, 'likes', String(postId)), (snap) => {
    onCount(snap.exists() ? (snap.data().count || 0) : 0);
  }, () => onCount(0));
};

/* Curte/descurte. Usa uma transação pra somar/subtrair 1 com
   segurança mesmo que várias pessoas curtam ao mesmo tempo. */
window.toggleLikePost = async function(postId, onResult){
  const liked = window.hasLikedPost(postId);
  const ref = doc(db, 'likes', String(postId));
  try {
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);
      const current = snap.exists() ? (snap.data().count || 0) : 0;
      const next = Math.max(0, current + (liked ? -1 : 1));
      tx.set(ref, { count: next }, { merge: true });
    });
    localStorage.setItem(likedLocallyKey(postId), liked ? '0' : '1');
    if (onResult) onResult(!liked);
  } catch (err){
    console.error(err);
    if (onResult) onResult(null); // null = deu erro, não muda a tela
  }
};

/* Avisa o resto do site que as funções acima já existem — o
   index.html usa isso pra saber quando pode chamá-las com
   segurança (este arquivo é um "module", que carrega um pouco
   depois dos outros scripts). */
window.dispatchEvent(new Event('gf-firebase-ready'));

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupSignup();
  setupLogin();
  setupLogout();
  setupCommentForm();
});
