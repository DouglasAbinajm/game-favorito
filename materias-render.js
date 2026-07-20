/* ============================================================
   MATERIAS-RENDER — funções compartilhadas usadas por retro.html
   e atuais.html para listar as matérias de cada categoria.
   Não precisa editar este arquivo para publicar conteúdo novo —
   edite apenas o materias.js.
============================================================ */

function mfFormatDate(iso){
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString('pt-BR', { day:'2-digit', month:'short', year:'numeric' }).replace('.', '');
}

function renderMateriaCategory(category, containerId){
  const list = MATERIAS
    .filter(m => m.category === category)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const grid = document.getElementById(containerId);

  if (list.length === 0){
    grid.innerHTML = '<div class="empty-state">Ainda não há matérias publicadas nessa categoria.</div>';
    return;
  }

  grid.innerHTML = list.map(m => `
    <a class="post-card show" href="index.html?post=${m.id}">
      ${m.image ? `<img class="card-thumb" src="${m.image}" alt="" loading="lazy">` : ''}
      <div class="post-meta-row">
        <span>${mfFormatDate(m.date)}</span>
      </div>
      <h2>${m.title}</h2>
      <p class="excerpt">${m.excerpt}</p>
      <div class="card-foot"><span>LER →</span></div>
    </a>
  `).join('');
}

/* ============ BUSCA GLOBAL ============
   Pesquisa em título, resumo e categoria de TODAS as matérias
   (o texto completo de cada uma vive num arquivo .md separado,
   carregado só quando a matéria é aberta — por isso a busca não
   entra nesse texto). */
function searchMaterias(query){
  const q = query.trim().toLowerCase();
  if (q === '') return [];
  return MATERIAS
    .filter(m => {
      const haystack = (
        m.title + ' ' + m.excerpt + ' ' + m.category
      ).toLowerCase();
      return haystack.includes(q);
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function renderSearchResults(list, containerId){
  const grid = document.getElementById(containerId);

  if (list.length === 0){
    grid.innerHTML = '<div class="empty-state">Nada encontrado. Tente outra palavra-chave.</div>';
    return;
  }

  grid.innerHTML = list.map(m => `
    <a class="post-card show" href="index.html?post=${m.id}">
      ${m.image ? `<img class="card-thumb" src="${m.image}" alt="" loading="lazy">` : ''}
      <div class="post-meta-row">
        <span>${mfFormatDate(m.date)}</span>
        <span>${m.category.toUpperCase()}</span>
      </div>
      <h2>${m.title}</h2>
      <p class="excerpt">${m.excerpt}</p>
      <div class="card-foot"><span>LER →</span></div>
    </a>
  `).join('');
}
