/* ============================================================
   MATERIAS — a lista de matérias do site.

   O TEXTO de cada matéria NÃO fica aqui — fica num arquivo .md
   separado, dentro da pasta /Postagens, escrito em Markdown
   (a mesma sintaxe usada em fóruns, GitHub, Discord etc.):

     **negrito**       *itálico*        [texto](https://link.com)
     ## Subtítulo
     - item de lista
     - outro item

   Isso deixa o texto mais fácil de escrever (sem aspas, sem
   colchetes, sem vírgula entre parágrafo e parágrafo) e cada
   matéria fica isolada no seu próprio arquivo, então esta lista
   aqui não cresce conforme você publica mais conteúdo.

   COMO PUBLICAR UMA MATÉRIA NOVA:
   1. Copie um dos blocos { ... } abaixo (de "id:" até a chave que
      fecha o bloco) e cole no topo da lista, antes do primeiro "{".
   2. Troque o "id" por um número que ainda não exista na lista.
   3. Preencha:
      - title      → título da matéria
      - category   → EXATAMENTE uma destas cinco, sem acento:
                      'Retro', 'Atuais', 'Revistas', 'Detonados' ou
                      'Noticias'. É isso que decide em qual página ela
                      vai aparecer permanentemente.
      - date       → data no formato AAAA-MM-DD. É por essa data
                      que a ordem "mais recente primeiro" é decidida.
      - excerpt    → um resumo curto (aparece nos cards)
      - video      → (opcional) o código de um vídeo do YouTube.
                      Remova essa linha se não usar.
      - file       → (opcional) caminho de um arquivo pra baixar,
                      ex: "downloads/revista-01.pdf". Útil pra
                      Revistas e Detonados. Remova se não usar.
      - fileLabel  → (opcional) texto do botão de download, ex:
                      "BAIXAR PDF". Se omitir, usa um texto padrão.
      - featured   → (opcional) coloque "true" numa ÚNICA matéria pra
                      ela aparecer em destaque na home, logo abaixo do
                      PRESS START. Se remover essa propriedade de todas,
                      a mais recente aparece em destaque automaticamente.
      - image      → (opcional) caminho de uma imagem pra representar
                      essa matéria, ex: "Postagens/imagens/13-famicom.jpg".
                      Aparece como miniatura no card, tanto na home
                      quanto na página da categoria e na busca. Se a
                      matéria também estiver em destaque (featured),
                      essa mesma imagem é usada como fundo do destaque.
                      Se omitir, o card aparece sem imagem, normalmente.
   4. Crie o arquivo Postagens/<id>.md (troque <id> pelo número que
      você escolheu no passo 2) e escreva o texto da matéria nele,
      em Markdown, com uma linha em branco entre parágrafos.
   5. Salve tudo. Pronto — não precisa mexer em mais nada:
      - Na página inicial (index.html), a matéria aparece
        automaticamente SE estiver entre as mais recentes
        (esse número é o HOME_LIMIT, configurado dentro do
        index.html — hoje está em 5), não importa a categoria.
      - Na página da categoria (retro.html, atuais.html,
        revistas.html ou detonados.html), ela aparece SEMPRE,
        para sempre, não importa há quanto tempo foi publicada.
      - Na busca (busca.html), ela aparece se o termo buscado
        estiver no título, resumo ou categoria. (A busca não olha
        dentro do arquivo .md — ver observação no fim do arquivo.)
============================================================ */
const MATERIAS = [
  {
    id: 13,
    title: "Final Fantasy: o jogo que nasceu para ser o último",
    category: "Retro",
    date: "2026-07-19",
    excerpt: "Em 1987, a Square apostou tudo num RPG que seria sua despedida dos videogames — e o resultado foi o início de uma das maiores franquias da história.",
    featured: true,
    image: "Postagens/imagens/13-famicom.jpg"
  },
  {
    id: 9,
    title: "Edição Nº 01 — Revista de época",
    category: "Revistas",
    date: "2026-02-10",
    excerpt: "Espaço reservado para a primeira edição digitalizada. Descreva aqui o que essa edição trazia de especial.",
    file: "downloads/revista-01.pdf",
    fileLabel: "BAIXAR PDF"
  },
  {
    id: 10,
    title: "Edição Nº 02 — Revista de época",
    category: "Revistas",
    date: "2026-01-20",
    excerpt: "Espaço reservado para a segunda edição digitalizada.",
    file: "downloads/revista-02.pdf",
    fileLabel: "BAIXAR PDF"
  },
  {
    id: 11,
    title: "Detonado — Jogo clássico 1",
    category: "Detonados",
    date: "2026-02-20",
    excerpt: "Guia completo, fase a fase, para zerar esse jogo sem travar em nenhum ponto.",
    file: "downloads/detonado-01.pdf",
    fileLabel: "BAIXAR PDF"
  },
  {
    id: 12,
    title: "Detonado — Jogo clássico 2",
    category: "Detonados",
    date: "2026-01-05",
    excerpt: "Guia passo a passo para o segundo jogo da lista.",
    file: "downloads/detonado-02.pdf",
    fileLabel: "BAIXAR PDF"
  },
  {
    id: 1,
    title: "O primeiro console do mundo",
    category: "Retro",
    date: "2026-07-15",
    excerpt: "O primeiro console doméstico do mundo foi o Magnavox Odyssey, lançado nos Estados Unidos em 1972 por US$ 100.",
    video: "UeRpfWcHuR0"
  },
  {
    id: 6,
    title: "O que os remakes acertam (e erram) sobre nostalgia",
    category: "Atuais",
    date: "2026-07-10",
    excerpt: "Relançar um jogo antigo parece simples, mas mexer com a memória afetiva de quem jogou o original é um equilíbrio delicado."
  },
  {
    id: 7,
    title: "Pixel art no design de jogos atuais",
    category: "Atuais",
    date: "2026-06-25",
    excerpt: "Mesmo com hardware capaz de renderizar qualquer coisa, cada vez mais estúdios escolhem voltar aos pixels — e não é só nostalgia."
  },
  {
    id: 2,
    title: "Por que jogos de 16 bits ainda parecem atuais",
    category: "Retro",
    date: "2026-05-18",
    excerpt: "Pixel art bem feita não envelhece do mesmo jeito que um gráfico 3D tentando parecer realista."
  },
  {
    id: 8,
    title: "O que esperar dos próximos lançamentos",
    category: "Atuais",
    date: "2026-05-05",
    excerpt: "Um panorama rápido do que está no radar, sem hype vazio — só o que realmente vale acompanhar."
  },
  {
    id: 3,
    title: "A história por trás do recorde mais lendário do fliperama",
    category: "Retro",
    date: "2026-04-30",
    excerpt: "Antes da internet, bater um recorde significava provar presencialmente, na frente de testemunhas, que aquilo realmente aconteceu."
  },
  {
    id: 4,
    title: "Cartuchos, fitas e a arte perdida de soprar o cartucho",
    category: "Retro",
    date: "2026-04-09",
    excerpt: "Um ritual que virou mito: soprar o cartucho quase nunca resolvia o problema que todo mundo achava que resolvia."
  },
  {
    id: 5,
    title: "Como um punhado de pixels virou personagem",
    category: "Retro",
    date: "2026-03-22",
    excerpt: "Antes do 3D, criar um personagem memorável era um exercício de economia: dizer o máximo com o mínimo de blocos coloridos."
  },
];

/* Observação sobre a busca: como o texto completo de cada matéria
   agora vive em arquivos .md separados (carregados só quando a
   matéria é aberta), a busca em busca.html olha título, resumo e
   categoria — não entra em cada .md pra procurar. Na prática isso
   quase nunca faz diferença, porque o resumo (excerpt) já costuma
   conter as palavras-chave da matéria. */
