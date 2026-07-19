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
