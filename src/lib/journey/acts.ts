import {
  APTITUDE_BLURBS,
  INTEREST_BLURBS,
} from "@/lib/mocks/chapter-2";
import type {
  ActDefinition,
  ActId,
  AptitudeKey,
  Beat,
  ChapterId,
  InterestKey,
  QuestionBeat,
} from "@/types/assessment";

const APTITUDE_ORDER: AptitudeKey[] = [
  "verbal",
  "numerical",
  "logical",
  "spatial",
  "mechanical",
  "artistic",
  "musical",
  "bodily",
  "interpersonal",
  "organizational",
];

const INTEREST_ORDER: InterestKey[] = [
  "realistic",
  "investigative",
  "artistic",
  "social",
  "enterprising",
  "conventional",
];

function q(
  actId: ActId,
  chapterId: ChapterId,
  questionId: string,
  burst?: { label: string; index: number; total: number },
): QuestionBeat {
  return {
    id: `beat-${questionId}`,
    actId,
    chapterId,
    kind: "question",
    questionId,
    burstLabel: burst?.label,
    burstIndex: burst?.index,
    burstTotal: burst?.total,
  };
}

function aptitudeBurst(actId: ActId, key: AptitudeKey): Beat[] {
  const blurb = APTITUDE_BLURBS[key];
  const items = [1, 2, 3, 4, 5].map((n) =>
    q(actId, 2, `c2-${key}-${n}`, {
      label: blurb.title,
      index: n,
      total: 5,
    }),
  );
  return [
    {
      id: `int-${key}`,
      actId,
      chapterId: 2,
      kind: "interstitial",
      title: blurb.title,
      body: `${blurb.definition}\n\n${blurb.practice}`,
    },
    ...items,
  ];
}

function interestBurst(actId: ActId, key: InterestKey): Beat[] {
  const blurb = INTEREST_BLURBS[key];
  const items = [1, 2, 3, 4, 5, 6].map((n) =>
    q(actId, 2, `c2-int-${key}-${n}`, {
      label: `${blurb.letter} · ${blurb.title}`,
      index: n,
      total: 6,
    }),
  );
  return [
    {
      id: `int-interest-${key}`,
      actId,
      chapterId: 2,
      kind: "interstitial",
      title: `${blurb.letter} — ${blurb.title}`,
    },
    ...items,
  ];
}

function gradeCluster(
  actId: ActId,
  slug: string,
  label: string,
  gostoId: string,
  porqueId: string,
): Beat {
  return {
    id: `cluster-nota-${slug}`,
    actId,
    chapterId: 1,
    kind: "cluster",
    label: `Suas notas · ${label}`,
    questionIds: [`c1-nota-${slug}-valor`, gostoId, porqueId],
  };
}

const ACT_A1: ActDefinition = {
  id: "a1",
  chapterId: 1,
  title: "Quem é você",
  subtitle: "Dados · Família · Vida escolar",
  beats: [
    {
      id: "a1-start",
      actId: "a1",
      chapterId: 1,
      kind: "act_start",
      title: "Questionário de Autoconhecimento",
      body: "Responda com sinceridade. Não há respostas certas ou erradas. Você pode fazer em mais de uma vez.",
    },
    {
      id: "cluster-identidade",
      actId: "a1",
      chapterId: 1,
      kind: "cluster",
      label: "1 — Quem é você",
      questionIds: ["c1-nome", "c1-chamado", "c1-idade", "c1-nascimento"],
    },
    {
      id: "cluster-lugar",
      actId: "a1",
      chapterId: 1,
      kind: "cluster",
      label: "1 — Quem é você",
      questionIds: ["c1-cidade", "c1-escola", "c1-serie"],
    },
    {
      id: "cluster-agora",
      actId: "a1",
      chapterId: 1,
      kind: "cluster",
      label: "1 — Quem é você",
      questionIds: ["c1-estuda-trabalha", "c1-tres-palavras"],
    },
    {
      id: "int-familia",
      actId: "a1",
      chapterId: 1,
      kind: "interstitial",
      title: "2 — Sua família",
    },
    q("a1", 1, "c1-familia-mora"),
    q("a1", 1, "c1-familia-descricao"),
    q("a1", 1, "c1-familia-profissao"),
    q("a1", 1, "c1-familia-repete"),
    {
      id: "int-trajetoria",
      actId: "a1",
      chapterId: 1,
      kind: "interstitial",
      title: "3 — Sua vida escolar",
      body: "Sua trajetória",
    },
    q("a1", 1, "c1-escola-traj-1"),
    q("a1", 1, "c1-escola-traj-2"),
    q("a1", 1, "c1-escola-traj-3"),
    q("a1", 1, "c1-escola-traj-4"),
    q("a1", 1, "c1-escola-traj-5"),
    {
      id: "int-materias",
      actId: "a1",
      chapterId: 1,
      kind: "interstitial",
      title: "Matérias de que você gosta",
    },
    q("a1", 1, "c1-materias-1"),
    q("a1", 1, "c1-materias-2"),
    q("a1", 1, "c1-materias-3"),
    q("a1", 1, "c1-materias-4"),
    {
      id: "int-notas",
      actId: "a1",
      chapterId: 1,
      kind: "interstitial",
      title: "Suas notas",
      body: "Preencha com as notas do último ano ou bimestre. Na última coluna, conte por que acha que vai bem ou mal naquela matéria.",
    },
    gradeCluster(
      "a1",
      "portugues",
      "Português",
      "c1-nota-portugues-gosto",
      "c1-nota-portugues-porque",
    ),
    gradeCluster(
      "a1",
      "matematica",
      "Matemática",
      "c1-nota-matematica-gosto",
      "c1-nota-matematica-porque",
    ),
    gradeCluster(
      "a1",
      "historia",
      "História",
      "c1-nota-historia-gosto",
      "c1-nota-historia-porque",
    ),
    gradeCluster(
      "a1",
      "biologia",
      "Biologia",
      "c1-nota-biologia-gosto",
      "c1-nota-biologia-porque",
    ),
    gradeCluster(
      "a1",
      "artes",
      "Artes",
      "c1-nota-artes-gosto",
      "c1-nota-artes-porque",
    ),
    gradeCluster(
      "a1",
      "ed-fisica",
      "Educação Física",
      "c1-nota-ed-fisica-gosto",
      "c1-nota-ed-fisica-porque",
    ),
    {
      id: "a1-end",
      actId: "a1",
      chapterId: 1,
      kind: "act_end",
      title: "Quem é você",
      body: "Você pode continuar agora ou voltar depois — o rascunho fica neste aparelho.",
    },
  ],
};

const ACT_A2: ActDefinition = {
  id: "a2",
  chapterId: 1,
  title: "Sua história",
  subtitle: "História · Gostos · Crescer",
  beats: [
    {
      id: "a2-start",
      actId: "a2",
      chapterId: 1,
      kind: "act_start",
      title: "4 — Sua história",
    },
    q("a2", 1, "c1-historia-1"),
    q("a2", 1, "c1-historia-2"),
    q("a2", 1, "c1-historia-3"),
    q("a2", 1, "c1-historia-4"),
    q("a2", 1, "c1-historia-5"),
    q("a2", 1, "c1-historia-6"),
    q("a2", 1, "c1-historia-7"),
    {
      id: "int-faz",
      actId: "a2",
      chapterId: 1,
      kind: "interstitial",
      title: "5 — O que você faz e do que gosta",
    },
    q("a2", 1, "c1-faz-1"),
    q("a2", 1, "c1-faz-2"),
    q("a2", 1, "c1-tempo-livre"),
    q("a2", 1, "c1-faz-4"),
    q("a2", 1, "c1-perde-tempo"),
    q("a2", 1, "c1-faz-6"),
    q("a2", 1, "c1-faz-7"),
    q("a2", 1, "c1-faz-8"),
    q("a2", 1, "c1-faz-9"),
    {
      id: "int-gosto-quadro",
      actId: "a2",
      chapterId: 1,
      kind: "interstitial",
      title: "Eu gosto / Eu não gosto",
    },
    {
      id: "cluster-gosto",
      actId: "a2",
      chapterId: 1,
      kind: "cluster",
      label: "Eu gosto de…",
      questionIds: ["c1-eu-gosto", "c1-eu-gosto-porque"],
    },
    {
      id: "cluster-nao-gosto",
      actId: "a2",
      chapterId: 1,
      kind: "cluster",
      label: "Eu não gosto de…",
      questionIds: ["c1-eu-nao-gosto", "c1-eu-nao-gosto-porque"],
    },
    {
      id: "int-crescer",
      actId: "a2",
      chapterId: 1,
      kind: "interstitial",
      title: "6 — Crescer: da adolescência à vida adulta",
    },
    q("a2", 1, "c1-crescer-1"),
    q("a2", 1, "c1-crescer-2"),
    q("a2", 1, "c1-crescer-3"),
    q("a2", 1, "c1-crescer-4"),
    q("a2", 1, "c1-crescer-5"),
    q("a2", 1, "c1-crescer-6"),
    {
      id: "a2-end",
      actId: "a2",
      chapterId: 1,
      kind: "act_end",
      title: "Sua história",
      body: "Você pode continuar agora ou voltar depois — o rascunho fica neste aparelho.",
    },
  ],
};

const ACT_A3: ActDefinition = {
  id: "a3",
  chapterId: 1,
  title: "Futuro próximo",
  subtitle: "Sonhos · Expectativas · Para fechar",
  beats: [
    {
      id: "a3-start",
      actId: "a3",
      chapterId: 1,
      kind: "act_start",
      title: "7 — Seus sonhos e o seu futuro",
    },
    q("a3", 1, "c1-sonhos-1"),
    q("a3", 1, "c1-sonhos-2"),
    q("a3", 1, "c1-sonhos-3"),
    q("a3", 1, "c1-sonhos-4"),
    q("a3", 1, "c1-sonhos-5"),
    q("a3", 1, "c1-sonhos-6"),
    q("a3", 1, "c1-sonhos-7"),
    q("a3", 1, "c1-sonhos-8"),
    q("a3", 1, "c1-sonhos-9"),
    {
      id: "int-expect",
      actId: "a3",
      chapterId: 1,
      kind: "interstitial",
      title: "8 — Você e as expectativas da sua família",
    },
    q("a3", 1, "c1-expect-1"),
    q("a3", 1, "c1-expect-2"),
    q("a3", 1, "c1-expect-3"),
    q("a3", 1, "c1-expect-4"),
    q("a3", 1, "c1-expect-5"),
    q("a3", 1, "c1-expect-6"),
    q("a3", 1, "c1-expect-7"),
    {
      id: "int-fechar",
      actId: "a3",
      chapterId: 1,
      kind: "interstitial",
      title: "Para fechar",
    },
    q("a3", 1, "c1-fechar-percebeu"),
    q("a3", 1, "c1-fechar-nova"),
    q("a3", 1, "c1-fechar-mais"),
    {
      id: "a3-end",
      actId: "a3",
      chapterId: 1,
      kind: "act_end",
      title: "Para fechar",
      body: "Obrigada por dedicar esse tempo a você. Suas respostas são o ponto de partida para descobrir caminhos que façam sentido para a sua vida.",
    },
  ],
};

const ACT_B1: ActDefinition = {
  id: "b1",
  chapterId: 2,
  title: "Aptidões I",
  subtitle: "Parte 1 · Aptidões 1–5",
  beats: [
    {
      id: "b1-start",
      actId: "b1",
      chapterId: 2,
      kind: "act_start",
      title: "Parte 1 — Aptidões",
      body: "A seguir estão dez aptidões. Leia a explicação e os exemplos de cada uma e depois dê sua nota de 1 a 5 para cada frase. No fim de cada aptidão, some as notas.",
    },
    {
      id: "b1-como",
      actId: "b1",
      chapterId: 2,
      kind: "interstitial",
      title: "Como responder",
      body: "Responda pensando em como você é, e não em como gostaria de ser ou no que os outros esperam. Não existe resultado bom ou ruim: cada perfil tem seus caminhos.\n\n1 — Não tem nada a ver comigo\n2 — Tem pouco a ver comigo\n3 — Às vezes sou assim\n4 — Tem bastante a ver comigo\n5 — Sou exatamente assim",
    },
    ...aptitudeBurst("b1", "verbal"),
    ...aptitudeBurst("b1", "numerical"),
    ...aptitudeBurst("b1", "logical"),
    ...aptitudeBurst("b1", "spatial"),
    ...aptitudeBurst("b1", "mechanical"),
    {
      id: "b1-end",
      actId: "b1",
      chapterId: 2,
      kind: "act_end",
      title: "Aptidões I",
      body: "Você pode continuar agora ou voltar depois — o rascunho fica neste aparelho.",
    },
  ],
};

const ACT_B2: ActDefinition = {
  id: "b2",
  chapterId: 2,
  title: "Aptidões II",
  subtitle: "Aptidões 6–10 · Seu resultado",
  beats: [
    {
      id: "b2-start",
      actId: "b2",
      chapterId: 2,
      kind: "act_start",
      title: "Aptidões II",
    },
    ...aptitudeBurst("b2", "artistic"),
    ...aptitudeBurst("b2", "musical"),
    ...aptitudeBurst("b2", "bodily"),
    ...aptitudeBurst("b2", "interpersonal"),
    ...aptitudeBurst("b2", "organizational"),
    {
      id: "peak-aptitudes",
      actId: "b2",
      chapterId: 2,
      kind: "peak",
      peak: "aptitudes",
      title: "Seu resultado de aptidões",
      body: "Como ler: de 20 a 25 pontos é um ponto forte seu; de 13 a 19, uma aptidão que pode crescer com treino; até 12, algo que hoje não é sua maior facilidade.",
    },
    {
      id: "b2-end",
      actId: "b2",
      chapterId: 2,
      kind: "act_end",
      title: "Aptidões II",
      body: "Você pode continuar agora ou voltar depois — o rascunho fica neste aparelho.",
    },
  ],
};

const ACT_C1: ActDefinition = {
  id: "c1",
  chapterId: 2,
  title: "Interesses",
  subtitle: "Parte 2 · Juntando as duas partes",
  beats: [
    {
      id: "c1-start",
      actId: "c1",
      chapterId: 2,
      kind: "act_start",
      title: "Parte 2 — Interesses",
      body: "Agora a pergunta não é “em que eu sou bom?”, e sim “o que eu gosto de fazer?”. Responda pensando no quanto você teria vontade de fazer cada atividade, mesmo que nunca tenha experimentado ou ainda não saiba fazer.\n\nOs interesses estão divididos em seis áreas, baseadas no modelo do psicólogo John Holland, muito usado em orientação profissional. A maioria das pessoas se identifica com duas ou três delas.",
    },
    ...interestBurst("c1", "realistic"),
    ...interestBurst("c1", "investigative"),
    ...interestBurst("c1", "artistic"),
    ...interestBurst("c1", "social"),
    ...interestBurst("c1", "enterprising"),
    ...interestBurst("c1", "conventional"),
    {
      id: "peak-interests",
      actId: "c1",
      chapterId: 2,
      kind: "peak",
      peak: "interests",
      title: "Seu resultado de interesses",
      body: "Suas duas ou três áreas de maior pontuação formam o seu perfil de interesses.",
    },
    {
      id: "int-juntando",
      actId: "c1",
      chapterId: 2,
      kind: "interstitial",
      title: "Juntando as duas partes",
    },
    q("c1", 2, "c2-juntando-1"),
    q("c1", 2, "c2-juntando-2"),
    q("c1", 2, "c2-juntando-3"),
    q("c1", 2, "c2-juntando-4"),
    {
      id: "c1-end",
      actId: "c1",
      chapterId: 2,
      kind: "act_end",
      title: "Interesses",
      body: "Você pode continuar agora ou voltar depois — o rascunho fica neste aparelho.",
    },
  ],
};

export const ACTS: ActDefinition[] = [
  ACT_A1,
  ACT_A2,
  ACT_A3,
  ACT_B1,
  ACT_B2,
  ACT_C1,
];

export function getActsForChapter(chapterId: ChapterId): ActDefinition[] {
  return ACTS.filter((act) => act.chapterId === chapterId);
}

export function getAct(actId: ActId): ActDefinition | undefined {
  return ACTS.find((act) => act.id === actId);
}

export function flattenBeats(chapterId: ChapterId): Beat[] {
  return getActsForChapter(chapterId).flatMap((act) => act.beats);
}

export function findBeatIndex(chapterId: ChapterId, beatId: string): number {
  return flattenBeats(chapterId).findIndex((beat) => beat.id === beatId);
}

export function countAnswerBeats(act: ActDefinition): number {
  return act.beats.filter(
    (b) => b.kind === "question" || b.kind === "cluster",
  ).length;
}

export { APTITUDE_ORDER, INTEREST_ORDER };
