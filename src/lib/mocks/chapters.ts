import type {
  AptitudeKey,
  ChapterDefinition,
  ChapterId,
  ChapterMeta,
  Question,
} from "@/types/assessment";

/**
 * Mock content for Fase 1.
 * Prompts are copied exactly from docs/ebook-inventory.md (Cap. 1–2).
 * Cap. 3–7 are interactive stubs only.
 */

const SCALE_HELP =
  "1 — Não tem nada a ver comigo · 2 — Tem pouco a ver comigo · 3 — Às vezes sou assim · 4 — Tem bastante a ver comigo · 5 — Sou exatamente assim";

function aptitudeItems(
  key: AptitudeKey,
  chapterId: ChapterId,
  section: string,
  statements: string[],
): Question[] {
  return statements.map((prompt, index) => ({
    id: `c2-${key}-${index + 1}`,
    chapterId,
    section,
    type: "aptitude_scale" as const,
    prompt,
    helpText: SCALE_HELP,
    aptitudeKey: key,
    scaleMin: 1 as const,
    scaleMax: 5 as const,
    required: true,
  }));
}

const CHAPTER_META: ChapterMeta[] = [
  {
    id: 1,
    title: "Questionário de Autoconhecimento",
    subtitle: "Capítulo 1",
    interactive: true,
  },
  {
    id: 2,
    title: "Questionário de Aptidões e Interesses",
    subtitle: "Capítulo 2",
    interactive: true,
  },
  {
    id: 3,
    title: "Questionário de Frases Incompletas",
    subtitle: "Capítulo 3",
    interactive: false,
  },
  {
    id: 4,
    title: "Árvore Genealógica das Profissões",
    subtitle: "Capítulo 4",
    interactive: false,
  },
  {
    id: 5,
    title: "Questionário de Expectativas Familiares",
    subtitle: "Capítulo 5",
    interactive: false,
  },
  {
    id: 6,
    title: "Questionário de Profissões Consideradas",
    subtitle: "Capítulo 6",
    interactive: false,
  },
  {
    id: 7,
    title: "Mapa da Clareza (Mapa Final)",
    subtitle: "Capítulo 7",
    interactive: false,
  },
];

const CHAPTER_1_QUESTIONS: Question[] = [
  {
    id: "c1-intro",
    chapterId: 1,
    section: "Antes de começar",
    type: "instruction",
    prompt:
      "Responda com sinceridade. Não há respostas certas ou erradas. Você pode fazer em mais de uma vez.",
  },
  {
    id: "c1-nome",
    chapterId: 1,
    section: "1 — Quem é você",
    type: "short_text",
    prompt: "Nome completo:",
    required: true,
  },
  {
    id: "c1-chamado",
    chapterId: 1,
    section: "1 — Quem é você",
    type: "short_text",
    prompt: "Como gosta de ser chamado(a):",
    required: true,
  },
  {
    id: "c1-idade",
    chapterId: 1,
    section: "1 — Quem é você",
    type: "short_text",
    prompt: "Idade:",
    required: true,
  },
  {
    id: "c1-nascimento",
    chapterId: 1,
    section: "1 — Quem é você",
    type: "short_text",
    prompt: "Data de nascimento:",
  },
  {
    id: "c1-cidade",
    chapterId: 1,
    section: "1 — Quem é você",
    type: "short_text",
    prompt: "Cidade e estado onde mora:",
  },
  {
    id: "c1-escola",
    chapterId: 1,
    section: "1 — Quem é você",
    type: "short_text",
    prompt: "Escola atual (ou última escola):",
  },
  {
    id: "c1-serie",
    chapterId: 1,
    section: "1 — Quem é você",
    type: "short_text",
    prompt:
      "Ano/série que está cursando ou ano em que concluiu o ensino médio:",
  },
  {
    id: "c1-estuda-trabalha",
    chapterId: 1,
    section: "1 — Quem é você",
    type: "long_text",
    prompt: "Estuda ou trabalha atualmente? Onde?",
  },
  {
    id: "c1-tres-palavras",
    chapterId: 1,
    section: "1 — Quem é você",
    type: "short_text",
    prompt:
      "Se você tivesse que se apresentar em três palavras, quais seriam?",
  },
  {
    id: "c1-familia-mora",
    chapterId: 1,
    section: "2 — Sua família",
    type: "long_text",
    prompt:
      "Com quem você mora hoje? (pais, mãe, pai, avós, padrasto, madrasta, outros)",
  },
  {
    id: "c1-familia-descricao",
    chapterId: 1,
    section: "2 — Sua família",
    type: "long_text",
    prompt: "Como você descreveria a sua família em poucas palavras?",
  },
  {
    id: "c1-familia-profissao",
    chapterId: 1,
    section: "2 — Sua família",
    type: "long_text",
    prompt:
      "O que seus pais ou responsáveis fazem profissionalmente? Eles gostam do que fazem?",
  },
  {
    id: "c1-familia-repete",
    chapterId: 1,
    section: "2 — Sua família",
    type: "long_text",
    prompt:
      "Existe alguma profissão que se repete na sua família (avós, tios, primos)? Qual?",
  },
  {
    id: "c1-notas-intro",
    chapterId: 1,
    section: "3 — Suas notas",
    type: "instruction",
    prompt:
      "Preencha com as notas do último ano ou bimestre. Na última coluna, conte por que acha que vai bem ou mal naquela matéria.",
  },
  {
    id: "c1-nota-portugues-gosto",
    chapterId: 1,
    section: "3 — Suas notas · Português",
    type: "single_choice",
    prompt: "Gosto do assunto? (sim / mais ou menos / não)",
    options: [
      { value: "sim", label: "sim" },
      { value: "mais_ou_menos", label: "mais ou menos" },
      { value: "nao", label: "não" },
    ],
  },
  {
    id: "c1-nota-portugues-porque",
    chapterId: 1,
    section: "3 — Suas notas · Português",
    type: "long_text",
    prompt: "Por que vou bem ou mal nessa matéria?",
  },
  {
    id: "c1-nota-matematica-gosto",
    chapterId: 1,
    section: "3 — Suas notas · Matemática",
    type: "single_choice",
    prompt: "Gosto do assunto? (sim / mais ou menos / não)",
    options: [
      { value: "sim", label: "sim" },
      { value: "mais_ou_menos", label: "mais ou menos" },
      { value: "nao", label: "não" },
    ],
  },
  {
    id: "c1-nota-matematica-porque",
    chapterId: 1,
    section: "3 — Suas notas · Matemática",
    type: "long_text",
    prompt: "Por que vou bem ou mal nessa matéria?",
  },
  {
    id: "c1-tempo-livre",
    chapterId: 1,
    section: "5 — O que você faz e do que gosta",
    type: "long_text",
    prompt: "O que você gosta de fazer no tempo livre?",
  },
  {
    id: "c1-perde-tempo",
    chapterId: 1,
    section: "5 — O que você faz e do que gosta",
    type: "long_text",
    prompt:
      "Em que tipo de atividade você perde a noção do tempo de tanto que se envolve?",
  },
  {
    id: "c1-eu-gosto",
    chapterId: 1,
    section: "5 — Eu gosto / Eu não gosto",
    type: "long_text",
    prompt: "Eu gosto de…",
  },
  {
    id: "c1-eu-gosto-porque",
    chapterId: 1,
    section: "5 — Eu gosto / Eu não gosto",
    type: "long_text",
    prompt: "Porque…",
  },
  {
    id: "c1-eu-nao-gosto",
    chapterId: 1,
    section: "5 — Eu gosto / Eu não gosto",
    type: "long_text",
    prompt: "Eu não gosto de…",
  },
  {
    id: "c1-eu-nao-gosto-porque",
    chapterId: 1,
    section: "5 — Eu gosto / Eu não gosto",
    type: "long_text",
    prompt: "Porque…",
  },
  {
    id: "c1-fechar-percebeu",
    chapterId: 1,
    section: "Para fechar",
    type: "long_text",
    prompt: "Depois de responder tudo, o que você percebeu sobre si mesmo(a)?",
  },
  {
    id: "c1-fechar-nova",
    chapterId: 1,
    section: "Para fechar",
    type: "long_text",
    prompt: "Teve alguma pergunta que te fez pensar em algo novo? Qual?",
  },
  {
    id: "c1-fechar-mais",
    chapterId: 1,
    section: "Para fechar",
    type: "long_text",
    prompt:
      "Existe mais alguma coisa sobre você que seria importante saber para ajudar na sua escolha?",
  },
];

const CHAPTER_2_QUESTIONS: Question[] = [
  {
    id: "c2-intro",
    chapterId: 2,
    section: "Como responder",
    type: "instruction",
    prompt:
      "Responda como você é (não como gostaria de ser). Não há resultado bom ou ruim. No fim de cada aptidão, some as notas.",
    helpText: SCALE_HELP,
  },
  ...aptitudeItems("verbal", 2, "1 Aptidão Verbal", [
    "Tenho facilidade para escrever textos e redações.",
    "Consigo explicar bem minhas ideias quando falo.",
    "Entendo rápido o que leio, mesmo textos mais difíceis.",
    "Gosto de aprender palavras novas e uso um vocabulário variado.",
    "Me saio bem em debates, apresentações ou discussões.",
  ]),
  ...aptitudeItems("numerical", 2, "2 Aptidão Numérica", [
    "Faço contas de cabeça com facilidade.",
    "Entendo rápido gráficos, tabelas e porcentagens.",
    "Aprendo matemática sem precisar repetir muitas vezes.",
    "Gosto de organizar gastos, comparar preços ou calcular valores.",
    "Percebo quando um número ou resultado parece errado.",
  ]),
  ...aptitudeItems("logical", 2, "3 Raciocínio Lógico", [
    "Gosto de desafios, enigmas e quebra-cabeças.",
    "Percebo padrões e sequências com facilidade.",
    "Quando tenho um problema, penso em etapas para resolvê-lo.",
    "Consigo entender como uma coisa leva a outra (causa e consequência).",
    "Me saio bem em jogos de estratégia.",
  ]),
  ...aptitudeItems("spatial", 2, "4 Aptidão Espacial", [
    "Consigo imaginar objetos girando ou vistos de outro ângulo.",
    "Me localizo bem em lugares novos e leio mapas com facilidade.",
    "Tenho facilidade com geometria e desenho de formas.",
    "Consigo montar coisas seguindo imagens ou esquemas.",
    "Percebo bem tamanhos, distâncias e proporções.",
  ]),
  ...aptitudeItems("mechanical", 2, "5 Aptidão Mecânica", [
    "Tenho curiosidade sobre como as coisas funcionam por dentro.",
    "Consigo consertar objetos ou aparelhos simples.",
    "Uso ferramentas com facilidade.",
    "Entendo rápido o funcionamento de máquinas e equipamentos.",
    "Gosto de desmontar e montar coisas.",
  ]),
  ...aptitudeItems("artistic", 2, "6 Aptidão Artística e Criativa", [
    "Tenho facilidade para desenhar, pintar, fotografar ou criar imagens.",
    "Percebo detalhes de cores, formas e combinações que outros não notam.",
    "Costumo ter ideias originais e diferentes.",
    "Gosto de deixar as coisas bonitas e com o meu estilo.",
    "As pessoas elogiam o que eu crio.",
  ]),
  ...aptitudeItems("musical", 2, "7 Aptidão Musical", [
    "Percebo quando uma nota está desafinada ou fora do ritmo.",
    "Aprendo músicas rápido, só de ouvir.",
    "Toco, canto ou já aprendi um instrumento com facilidade.",
    "Consigo reconhecer instrumentos diferentes numa música.",
    "Crio ritmos ou melodias, mesmo que de brincadeira.",
  ]),
  ...aptitudeItems("bodily", 2, "8 Aptidão Corporal", [
    "Aprendo esportes, danças ou movimentos novos com rapidez.",
    "Tenho boa coordenação e equilíbrio.",
    "Tenho habilidade com as mãos para trabalhos delicados.",
    "Aprendo melhor fazendo do que só ouvindo ou lendo.",
    "Tenho energia e gosto de atividades físicas.",
  ]),
  ...aptitudeItems("interpersonal", 2, "9 Aptidão Interpessoal (Social)", [
    "Percebo como as pessoas estão se sentindo.",
    "Faço amizades com facilidade.",
    "Os amigos me procuram para pedir conselhos.",
    "Consigo ajudar a resolver conflitos entre pessoas.",
    "Sei convencer e motivar os outros.",
  ]),
  ...aptitudeItems("organizational", 2, "10 Aptidão Organizacional", [
    "Gosto de planejar antes de começar algo.",
    "Mantenho meus materiais, arquivos e coisas organizados.",
    "Cumpro prazos e lembro dos compromissos.",
    "Presto atenção nos detalhes e percebo erros pequenos.",
    "Nos trabalhos em grupo, costumo dividir as tarefas e organizar todo mundo.",
  ]),
];

function stubQuestions(chapterId: ChapterId, title: string): Question[] {
  return [
    {
      id: `c${chapterId}-stub`,
      chapterId,
      section: title,
      type: "instruction",
      prompt:
        "Este capítulo estará disponível nas próximas fases. Por enquanto você pode navegar pelos Capítulos 1 e 2.",
    },
  ];
}

const CHAPTERS: ChapterDefinition[] = [
  { meta: CHAPTER_META[0], questions: CHAPTER_1_QUESTIONS },
  { meta: CHAPTER_META[1], questions: CHAPTER_2_QUESTIONS },
  {
    meta: CHAPTER_META[2],
    questions: stubQuestions(3, "Questionário de Frases Incompletas"),
  },
  {
    meta: CHAPTER_META[3],
    questions: stubQuestions(4, "Árvore Genealógica das Profissões"),
  },
  { meta: CHAPTER_META[4], questions: stubQuestions(5, "Capítulo 5") },
  { meta: CHAPTER_META[5], questions: stubQuestions(6, "Capítulo 6") },
  { meta: CHAPTER_META[6], questions: stubQuestions(7, "Mapa Final") },
];

export function getAllChapters(): ChapterDefinition[] {
  return CHAPTERS;
}

export function getChapterMetaList(): ChapterMeta[] {
  return CHAPTER_META;
}

export function getChapter(id: ChapterId): ChapterDefinition | undefined {
  return CHAPTERS.find((chapter) => chapter.meta.id === id);
}

export function getQuestion(
  chapterId: ChapterId,
  questionId: string,
): Question | undefined {
  return getChapter(chapterId)?.questions.find((q) => q.id === questionId);
}

/** Question ids per aptitude for Cap. 2 scoring. */
export function aptitudeQuestionIds(key: AptitudeKey): string[] {
  return CHAPTER_2_QUESTIONS.filter(
    (q) => q.type === "aptitude_scale" && q.aptitudeKey === key,
  ).map((q) => q.id);
}

export function isChapterId(value: number): value is ChapterId {
  return Number.isInteger(value) && value >= 1 && value <= 7;
}
