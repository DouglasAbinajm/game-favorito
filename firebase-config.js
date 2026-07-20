/* ============================================================
   FIREBASE CONFIG — cole aqui as chaves do SEU projeto Firebase.

   Onde encontrar:
   1. Acesse https://console.firebase.google.com
   2. Abra seu projeto (ou crie um novo, é grátis)
   3. Clique na engrenagem (⚙) > "Configurações do projeto"
   4. Role até "Seus aplicativos" > clique no ícone </> (Web)
   5. Dê um nome (ex: "game favorito") e registre o app
   6. O Firebase mostra um bloco parecido com o objeto abaixo —
      copie os valores de lá e cole aqui embaixo.

   Essas chaves NÃO são secretas como uma senha — elas identificam
   seu projeto, não dão acesso a nada sozinhas. Quem protege os
   dados de verdade são as REGRAS do Firestore (ver instruções
   que te passei à parte).
============================================================ */
export const firebaseConfig = {
  apiKey: "AIzaSyBt5wrjUP-wpUpEFDdFni2RbckNNR64qUs",
  authDomain: "game-favorito.firebaseapp.com",
  projectId: "game-favorito",
  storageBucket: "game-favorito.firebasestorage.app",
  messagingSenderId: "749956279669",
  appId: "1:749956279669:web:95dfebd168d53ba008f73c",
  measurementId: "G-985MNFXPYB"
};
