/* ============ PLAYLIST — arquivos reais dentro da pasta /music ============
   Cada faixa é um objeto aqui, com "file" apontando EXATAMENTE (maiúsculas/
   minúsculas e acentos importam num servidor real) para o nome do arquivo
   dentro da pasta /music, que deve ficar ao lado do index.html.

   Para adicionar mais músicas: coloque o .mp3 dentro de /music e adicione
   uma linha nova aqui, seguindo o mesmo formato.
============================================================================ */
const TRACKS = [
  {title: "Naruto Shippuden - Opening 1  Hero's Come Back", group: "Animes", file: "music/Naruto Shippuden - Opening 1  Hero's Come Back.mp3"},
  {title: "Naruto Shippuden - Opening 2  Distance by LONG SHOT PARTY", group: "Animes", file: "music/Naruto Shippuden - Opening 2  Distance by LONG SHOT PARTY.mp3"},
  {title: "Naruto Shippuden - Opening 3  Blue Bird", group: "Animes", file: "music/Naruto Shippuden - Opening 3  Blue Bird.mp3"},
  {title: "Naruto Shippuden - Opening 4  Closer", group: "Animes", file: "music/Naruto Shippuden - Opening 4  Closer.mp3"},
  {title: "Naruto Shippuden - Opening 5  Light of a Firefly", group: "Animes", file: "music/Naruto Shippuden - Opening 5  Light of a Firefly.mp3"},
  {title: "Naruto Shippuden - Opening 6  Sign by FLOW", group: "Animes", file: "music/Naruto Shippuden - Opening 6  Sign by FLOW.mp3"},
  {title: "Donkey Kong Country - Aquatic Ambience", group: "Games", file: "music/Donkey Kong Country - Aquatic Ambience.mp3"},
];

(function musicPlayer(){
  const LS = {
    idx: 'gf_music_track',
    time: 'gf_music_time',
    playing: 'gf_music_playing',
    volume: 'gf_music_volume',
    collapsed: 'gf_music_collapsed',
  };

  const savedIdx = parseInt(localStorage.getItem(LS.idx), 10);
  let currentIndex = (!isNaN(savedIdx) && savedIdx >= 0 && savedIdx < TRACKS.length) ? savedIdx : 0;
  let wasPlaying = localStorage.getItem(LS.playing) === '1';
  const savedTime = parseFloat(localStorage.getItem(LS.time));
  const savedVolume = parseFloat(localStorage.getItem(LS.volume));
  const savedCollapsed = localStorage.getItem(LS.collapsed);

  /* ---- build markup ---- */
  const root = document.createElement('div');
  root.id = 'music-player';
  root.className = 'music-player' + (savedCollapsed === '0' ? '' : ' collapsed');
  root.innerHTML = `
    <button id="mp-toggle" class="mp-toggle" title="Mostrar/ocultar player">&#9835; TRILHA</button>
    <div class="mp-panel">
      <div class="mp-header">&#9656; TRILHA SONORA</div>
      <div class="mp-track-title" id="mp-track-title">&mdash;</div>
      <div class="mp-track-sub" id="mp-track-sub">&mdash;</div>
      <div class="mp-progress"><div class="mp-progress-fill" id="mp-progress-fill"></div></div>
      <div class="mp-controls">
        <button id="mp-prev" title="Faixa anterior">&#9198;</button>
        <button id="mp-play" title="Tocar/Pausar">&#9654;</button>
        <button id="mp-next" title="Próxima faixa">&#9197;</button>
      </div>
      <input type="range" id="mp-volume" class="mp-volume" min="0" max="1" step="0.01">
    </div>
  `;
  document.body.appendChild(root);

  const audio = new Audio();
  audio.volume = !isNaN(savedVolume) ? savedVolume : 0.6;

  const toggleBtn = document.getElementById('mp-toggle');
  const playBtn = document.getElementById('mp-play');
  const prevBtn = document.getElementById('mp-prev');
  const nextBtn = document.getElementById('mp-next');
  const volumeInput = document.getElementById('mp-volume');
  const titleEl = document.getElementById('mp-track-title');
  const subEl = document.getElementById('mp-track-sub');
  const fillEl = document.getElementById('mp-progress-fill');

  volumeInput.value = audio.volume;

  /* ---- now playing (sem lista completa — só faixa atual + prev/next) ---- */

  function updateNowPlaying(){
    const t = TRACKS[currentIndex];
    titleEl.textContent = t.title;
    subEl.textContent = t.group;
    localStorage.setItem(LS.idx, String(currentIndex));
  }

  function loadTrack(index, autoplay){
    currentIndex = ((index % TRACKS.length) + TRACKS.length) % TRACKS.length;
    audio.src = TRACKS[currentIndex].file;
    audio.currentTime = 0;
    updateNowPlaying();
    if (autoplay) play();
  }

  function play(){
    audio.play().then(() => {
      playBtn.innerHTML = '&#10074;&#10074;';
      localStorage.setItem(LS.playing, '1');
    }).catch(() => {
      /* autoplay bloqueado pelo navegador — usuário precisa clicar em play manualmente */
      playBtn.innerHTML = '&#9654;';
      localStorage.setItem(LS.playing, '0');
    });
  }

  function pause(){
    audio.pause();
    playBtn.innerHTML = '&#9654;';
    localStorage.setItem(LS.playing, '0');
  }

  playBtn.addEventListener('click', () => { audio.paused ? play() : pause(); });
  prevBtn.addEventListener('click', () => loadTrack(currentIndex - 1, true));
  nextBtn.addEventListener('click', () => loadTrack(currentIndex + 1, true));
  audio.addEventListener('ended', () => loadTrack(currentIndex + 1, true));
  audio.addEventListener('timeupdate', () => {
    if (audio.duration){
      fillEl.style.width = ((audio.currentTime / audio.duration) * 100) + '%';
    }
    localStorage.setItem(LS.time, String(audio.currentTime));
  });
  audio.addEventListener('error', () => {
    titleEl.textContent = TRACKS[currentIndex].title + ' (arquivo não encontrado)';
    subEl.textContent = 'Adicione seus áudios na pasta /music';
  });

  volumeInput.addEventListener('input', () => {
    audio.volume = parseFloat(volumeInput.value);
    localStorage.setItem(LS.volume, String(audio.volume));
  });

  toggleBtn.addEventListener('click', () => {
    const collapsed = root.classList.toggle('collapsed');
    localStorage.setItem(LS.collapsed, collapsed ? '1' : '0');
  });

  /* ---- init / restore state across page loads ---- */
  audio.src = TRACKS[currentIndex].file;
  updateNowPlaying();

  audio.addEventListener('loadedmetadata', () => {
    if (!isNaN(savedTime) && savedTime > 0 && savedTime < audio.duration){
      audio.currentTime = savedTime;
    }
  }, { once: true });

  if (wasPlaying) play();

  /* ---- retomar automaticamente ao trocar de página ----
     Navegadores bloqueiam áudio com som até haver uma interação do
     usuário NA PÁGINA ATUAL (isso é uma trava de segurança do próprio
     navegador, não dá pra contornar por código). Então, se a música
     estava tocando na página anterior mas o navegador bloqueou o
     autoplay aqui, assim que o usuário clicar/tocar/apertar qualquer
     tecla em QUALQUER lugar do site — não precisa ser no botão do
     player — a música retoma sozinha, exatamente de onde parou. */
  function retomarNaPrimeiraInteracao(){
    if (wasPlaying && audio.paused){
      play();
    }
    document.removeEventListener('click', retomarNaPrimeiraInteracao);
    document.removeEventListener('keydown', retomarNaPrimeiraInteracao);
    document.removeEventListener('touchstart', retomarNaPrimeiraInteracao);
  }
  document.addEventListener('click', retomarNaPrimeiraInteracao);
  document.addEventListener('keydown', retomarNaPrimeiraInteracao);
  document.addEventListener('touchstart', retomarNaPrimeiraInteracao);
})();
