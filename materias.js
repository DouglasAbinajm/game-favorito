/* ============================================================
   MATERIAS — todo o conteúdo do site vem daqui.

   COMO PUBLICAR UMA MATÉRIA NOVA:
   1. Copie um dos blocos { ... } abaixo (de "id:" até a chave que
      fecha o bloco) e cole no topo da lista, antes do primeiro "{".
   2. Troque o "id" por um número que ainda não exista na lista.
   3. Preencha:
      - title      → título da matéria
      - category   → EXATAMENTE uma destas quatro, sem acento:
                      'Retro', 'Atuais', 'Revistas' ou 'Detonados'.
                      É isso que decide em qual página ela vai
                      aparecer permanentemente.
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
      - body       → um array de parágrafos (cada item do array
                      vira um parágrafo do texto).
   4. Salve o arquivo. Pronto — não precisa mexer em mais nada:
      - Na página inicial (index.html), a matéria aparece
        automaticamente SE estiver entre as mais recentes
        (esse número é o HOME_LIMIT, configurado dentro do
        index.html — hoje está em 5), não importa a categoria.
      - Na página da categoria (retro.html, atuais.html,
        revistas.html ou detonados.html), ela aparece SEMPRE,
        para sempre, não importa há quanto tempo foi publicada.
      - Na busca (busca.html), ela aparece se o termo buscado
        estiver no título, resumo, categoria ou texto da matéria.
============================================================ */
const MATERIAS = [
  {
    id: 9,
    title: "Edição Nº 01 — Revista de época",
    category: "Revistas",
    date: "2026-02-10",
    excerpt: "Espaço reservado para a primeira edição digitalizada. Descreva aqui o que essa edição trazia de especial.",
    file: "downloads/revista-01.pdf",
    fileLabel: "BAIXAR PDF",
    body: [
      "Espaço reservado para uma descrição maior dessa edição: quais jogos ou lançamentos ela cobria, curiosidades sobre a capa ou reportagens de destaque daquele mês.",
      "Substitua este texto pela sua própria descrição quando adicionar o arquivo real da revista na pasta downloads."
    ]
  },
  {
    id: 10,
    title: "Edição Nº 02 — Revista de época",
    category: "Revistas",
    date: "2026-01-20",
    excerpt: "Espaço reservado para a segunda edição digitalizada.",
    file: "downloads/revista-02.pdf",
    fileLabel: "BAIXAR PDF",
    body: [
      "Espaço reservado para uma descrição maior dessa edição.",
      "Substitua este texto pela sua própria descrição quando adicionar o arquivo real da revista na pasta downloads."
    ]
  },
  {
    id: 11,
    title: "Detonado — Jogo clássico 1",
    category: "Detonados",
    date: "2026-02-20",
    excerpt: "Guia completo, fase a fase, para zerar esse jogo sem travar em nenhum ponto.",
    file: "downloads/detonado-01.pdf",
    fileLabel: "BAIXAR PDF",
    body: [
      "Espaço reservado para o resumo do detonado: quantas fases o guia cobre, se tem dicas de itens secretos ou chefes difíceis, e qualquer outro destaque.",
      "Substitua este texto e o arquivo em downloads/detonado-01.pdf pelo guia real."
    ]
  },
  {
    id: 12,
    title: "Detonado — Jogo clássico 2",
    category: "Detonados",
    date: "2026-01-05",
    excerpt: "Guia passo a passo para o segundo jogo da lista.",
    file: "downloads/detonado-02.pdf",
    fileLabel: "BAIXAR PDF",
    body: [
      "Espaço reservado para o resumo do detonado.",
      "Substitua este texto e o arquivo em downloads/detonado-02.pdf pelo guia real."
    ]
  },
  {
    id: 1,
    title: "O primeiro console do mundo",
    category: "Retro",
    date: "2026-07-15",
    excerpt: "O primeiro console doméstico do mundo foi o Magnavox Odyssey, lançado nos Estados Unidos em 1972 por US$ 100.",
    video: "UeRpfWcHuR0",
    body: [
      "O primeiro console doméstico do mundo foi o Magnavox Odyssey, lançado nos Estados Unidos em 1972 por US$ 100. Criado pelo engenheiro Ralph Baer, o aparelho não tinha gráficos próprios — os jogadores colavam folhas de plástico coloridas e semitransparentes diretamente na tela da TV para simular os cenários.",
      "Para entender um pouco melhor esse começo, vale assistir a um bom vídeo sobre a história desse aparelho e de como tudo começou."
    ]
  },
  {
    id: 6,
    title: "O que os remakes acertam (e erram) sobre nostalgia",
    category: "Atuais",
    date: "2026-07-10",
    excerpt: "Relançar um jogo antigo parece simples, mas mexer com a memória afetiva de quem jogou o original é um equilíbrio delicado.",
    body: [
      "Um remake bem feito não é só trocar os gráficos por algo mais bonito. É decidir, parágrafo por parágrafo, o que da experiência original precisa ser preservado e o que pode — ou deve — mudar. Errar essa conta é o motivo pelo qual tantos relançamentos dividem opiniões antes mesmo de serem lançados.",
      "O maior risco não é tecnológico, é emocional: quando um remake tenta agradar todo mundo, corre o risco de não parecer fiel para quem jogou o original nem interessante para quem está descobrindo a história agora.",
      "Os remakes que mais funcionam costumam ser os que assumem uma posição clara sobre o que aquele jogo significava — e constroem a partir disso, em vez de tentar apagar o tempo que passou."
    ]
  },
  {
    id: 7,
    title: "Pixel art no design de jogos atuais",
    category: "Atuais",
    date: "2026-06-25",
    excerpt: "Mesmo com hardware capaz de renderizar qualquer coisa, cada vez mais estúdios escolhem voltar aos pixels — e não é só nostalgia.",
    body: [
      "Existe uma diferença entre usar pixel art porque é tudo que a tecnologia permite e escolher pixel art quando qualquer outro estilo também seria possível. A segunda opção é a que mais aparece hoje, e ela muda completamente o motivo por trás da escolha.",
      "Quando pixel art é uma escolha deliberada, ela deixa de ser limitação e passa a ser linguagem visual — assim como acontecia décadas atrás, mas agora com controle total sobre cada detalhe, sem as restrições de hardware que moldaram o estilo originalmente.",
      "É um lembrete de que um estilo visual nunca foi só sobre tecnologia disponível. Sempre foi, antes de tudo, sobre comunicação — e alguns problemas de comunicação visual, poucos pixels resolvem melhor que muitos."
    ]
  },
  {
    id: 2,
    title: "Por que jogos de 16 bits ainda parecem atuais",
    category: "Retro",
    date: "2026-05-18",
    excerpt: "Pixel art bem feita não envelhece do mesmo jeito que um gráfico 3D tentando parecer realista.",
    body: [
      "Um jogo 3D antigo costuma envelhecer mal porque tentava imitar a realidade com recursos limitados — e o resultado, hoje, parece uma versão incompleta de algo. Já a pixel art nunca tentou ser realista: ela sempre foi uma linguagem visual própria, com suas próprias regras.",
      "Isso significa que um cenário bem desenhado em 16 bits ainda comunica exatamente o que queria comunicar na época — não porque a tecnologia envelheceu bem, mas porque o estilo nunca dependeu da tecnologia para funcionar.",
      "Tentar reproduzir esse efeito hoje, décadas depois, tornou-se um gênero à parte. E funciona, porque o que fazia aqueles jogos bonitos nunca foi a quantidade de cores disponíveis — foi a escolha de como usá-las."
    ]
  },
  {
    id: 8,
    title: "O que esperar dos próximos lançamentos",
    category: "Atuais",
    date: "2026-05-05",
    excerpt: "Um panorama rápido do que está no radar, sem hype vazio — só o que realmente vale acompanhar.",
    body: [
      "Espaço reservado para acompanhar os próximos lançamentos que valem a pena ficar de olho. Atualize esse texto sempre que quiser trazer novidades frescas para os leitores.",
      "A ideia dessa seção é ser um resumo rápido e direto, sem enrolação — algumas linhas sobre cada lançamento, para quem só quer se situar sem precisar ler dez matérias diferentes."
    ]
  },
  {
    id: 3,
    title: "A história por trás do recorde mais lendário do fliperama",
    category: "Retro",
    date: "2026-04-30",
    excerpt: "Antes da internet, bater um recorde significava provar presencialmente, na frente de testemunhas, que aquilo realmente aconteceu.",
    body: [
      "Sem gravação de tela, sem replay automático e sem placar online, um recorde de fliperama só existia se alguém tivesse visto. Isso criava uma cultura estranha e fascinante: jogadores viajavam para acompanhar tentativas ao vivo, e a palavra de quem estava presente valia mais que qualquer número.",
      "Muitas dessas histórias hoje soam quase lendárias — números que parecem exagerados, sessões de jogo que duravam o dia inteiro, máquinas que precisavam ser fisicamente monitoradas para garantir que ninguém desligasse no meio de uma tentativa.",
      "O que essas histórias revelam não é só sobre habilidade, mas sobre como a ausência de registro digital transformava cada recorde em um evento social, não só numérico."
    ]
  },
  {
    id: 4,
    title: "Cartuchos, fitas e a arte perdida de soprar o cartucho",
    category: "Retro",
    date: "2026-04-09",
    excerpt: "Um ritual que virou mito: soprar o cartucho quase nunca resolvia o problema que todo mundo achava que resolvia.",
    body: [
      "Quase todo mundo que jogou naquela época tem a mesma lembrança: o cartucho não funcionava, então soprava-se dentro dele antes de tentar de novo. Curiosamente, o gesto raramente era a causa da solução — o mais provável é que o próprio ato de remover e recolocar o cartucho já resolvesse o contato elétrico.",
      "Mais do que uma solução técnica, virou um ritual coletivo, passado de jogador para jogador sem nenhuma explicação oficial. Era conhecimento popular, transmitido boca a boca, exatamente como muita cultura de jogos daquela era.",
      "Hoje sabemos que a umidade do sopro podia até acelerar a corrosão dos contatos a longo prazo. Mas isso não muda o carinho que existe em lembrar do gesto — ele era, antes de tudo, parte do jogo."
    ]
  },
  {
    id: 5,
    title: "Como um punhado de pixels virou personagem",
    category: "Retro",
    date: "2026-03-22",
    excerpt: "Antes do 3D, criar um personagem memorável era um exercício de economia: dizer o máximo com o mínimo de blocos coloridos.",
    body: [
      "Com poucos pixels disponíveis para desenhar um rosto, os designers precisavam decidir exatamente quais detalhes importavam. Um personagem não podia ter expressão sutil — precisava ser reconhecível numa tela pequena, de longe, em movimento.",
      "Esse tipo de restrição obrigou a indústria a pensar em silhueta antes de pensar em detalhe. Se a forma geral não funcionasse, nenhum detalhe interno salvaria o design — uma lição que continua válida mesmo em jogos com gráficos muito mais avançados.",
      "É por isso que tantos personagens daquela era ainda são reconhecíveis só pelo contorno, sem nenhuma cor. O design já estava resolvido antes mesmo de qualquer pixel ser pintado."
    ]
  },
];
