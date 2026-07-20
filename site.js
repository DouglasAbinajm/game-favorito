/* ============ EFEITO CRT — liga/desliga ============
   Controla o botão "CRT: ON/OFF" do menu. Ao clicar, alterna a classe
   "crt-off" no <body> (que o styles.css já usa pra esconder o overlay)
   e guarda a preferência no localStorage, pra continuar igual ao trocar
   de página.
====================================================== */
(function crtToggle(){
  const btn = document.getElementById('crt-toggle');
  if (!btn) return;

  const KEY = 'gf_crt_off';
  const isOff = localStorage.getItem(KEY) === '1';

  document.body.classList.toggle('crt-off', isOff);
  btn.textContent = isOff ? 'CRT: OFF' : 'CRT: ON';

  btn.addEventListener('click', () => {
    const off = document.body.classList.toggle('crt-off');
    btn.textContent = off ? 'CRT: OFF' : 'CRT: ON';
    localStorage.setItem(KEY, off ? '1' : '0');
  });
})();

/* ============ BOTÃO VOLTAR AO TOPO ============
   Como site.js é carregado em TODAS as páginas, basta criar o
   botão aqui uma vez — ele aparece em todo lugar automaticamente,
   sem precisar copiar HTML em cada página. Ele some no topo da
   página e aparece depois de rolar um pouco.
====================================================== */
(function backToTop(){
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.className = 'back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Voltar ao topo');
  btn.title = 'Voltar ao topo';
  btn.innerHTML = '&#9650;';
  document.body.appendChild(btn);

  function updateVisibility(){
    btn.classList.toggle('show', window.scrollY > 420);
  }
  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
