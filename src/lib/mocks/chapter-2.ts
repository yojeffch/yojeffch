import type {
  AptitudeKey,
  InterestKey,
  Question,
} from "@/types/assessment";

export const SCALE_HELP =
  "1 — Não tem nada a ver comigo · 2 — Tem pouco a ver comigo · 3 — Às vezes sou assim · 4 — Tem bastante a ver comigo · 5 — Sou exatamente assim";

/** Exact aptitude definitions from ebook extract (págs. 24+). */
export const APTITUDE_BLURBS: Record<
  AptitudeKey,
  { title: string; definition: string; practice: string }
> = {
  verbal: {
    title: "Aptidão Verbal",
    definition:
      "É a facilidade com as palavras: ler, escrever, falar e entender o que os outros querem dizer.",
    practice:
      "Na prática: escrever uma boa redação sem muito esforço, explicar uma ideia de um jeito que todo mundo entende, perceber quando um texto tem duplo sentido.",
  },
  numerical: {
    title: "Aptidão Numérica",
    definition:
      "É a facilidade para lidar com números, fazer contas e entender quantidades.",
    practice:
      "Na prática: calcular o troco de cabeça, entender porcentagens e descontos, ler gráficos e tabelas sem dificuldade.",
  },
  logical: {
    title: "Raciocínio Lógico",
    definition:
      "É a capacidade de pensar passo a passo, encontrar padrões e resolver problemas novos, mesmo sem uma fórmula pronta.",
    practice:
      "Na prática: resolver charadas e quebra-cabeças, descobrir a regra de uma sequência, entender por que algo deu errado e como consertar.",
  },
  spatial: {
    title: "Aptidão Espacial",
    definition:
      "É a facilidade para imaginar formas, objetos e espaços na mente, e para se localizar.",
    practice:
      "Na prática: montar um móvel olhando o manual, imaginar como um quarto ficaria com os móveis trocados de lugar, se orientar bem num lugar novo.",
  },
  mechanical: {
    title: "Aptidão Mecânica",
    definition:
      "É a facilidade para entender como máquinas, aparelhos e mecanismos funcionam, e para mexer neles.",
    practice:
      "Na prática: descobrir por que a bicicleta está fazendo barulho, trocar uma peça, entender como funciona um motor ou um circuito.",
  },
  artistic: {
    title: "Aptidão Artística e Criativa",
    definition:
      "É a facilidade para criar coisas novas e se expressar por imagens, cores, formas ou ideias originais.",
    practice:
      "Na prática: desenhar, editar vídeos, montar looks, decorar um ambiente, inventar uma solução diferente que ninguém tinha pensado.",
  },
  musical: {
    title: "Aptidão Musical",
    definition:
      "É a facilidade para perceber e trabalhar com sons, ritmos e melodias.",
    practice:
      "Na prática: aprender uma música de ouvido, perceber quando alguém desafina, acompanhar o ritmo com facilidade.",
  },
  bodily: {
    title: "Aptidão Corporal",
    definition:
      "É a facilidade para usar o corpo com coordenação, equilíbrio e precisão, tanto em movimentos grandes quanto em trabalhos delicados com as mãos.",
    practice:
      "Na prática: aprender rápido um esporte ou uma dança, ter boa coordenação, fazer trabalhos manuais caprichados.",
  },
  interpersonal: {
    title: "Aptidão Interpessoal (Social)",
    definition:
      "É a facilidade para se relacionar, entender o que os outros sentem e trabalhar com pessoas.",
    practice:
      "Na prática: perceber quando um amigo está mal mesmo sem ele falar, ajudar a resolver brigas, convencer o grupo de uma ideia, ser procurado para conselhos.",
  },
  organizational: {
    title: "Aptidão Organizacional",
    definition:
      "É a facilidade para planejar, organizar e cuidar de detalhes, prazos e tarefas.",
    practice:
      "Na prática: montar um cronograma de estudos e seguir, organizar um evento ou viagem, ser a pessoa que lembra os prazos do trabalho em grupo.",
  },
};

/** Interest area titles from ebook (Holland A–F). */
export const INTEREST_BLURBS: Record<
  InterestKey,
  { title: string; letter: string }
> = {
  realistic: { letter: "A", title: "Fazer com as mãos (Realista)" },
  investigative: { letter: "B", title: "Pesquisar e descobrir (Investigativo)" },
  artistic: { letter: "C", title: "Criar e se expressar (Artístico)" },
  social: { letter: "D", title: "Ajudar e cuidar (Social)" },
  enterprising: { letter: "E", title: "Liderar e empreender (Empreendedor)" },
  conventional: { letter: "F", title: "Organizar e planejar (Convencional)" },
};

function aptitudeItems(
  key: AptitudeKey,
  section: string,
  statements: string[],
): Question[] {
  return statements.map((prompt, index) => ({
    id: `c2-${key}-${index + 1}`,
    chapterId: 2 as const,
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

function interestItems(
  key: InterestKey,
  section: string,
  statements: string[],
): Question[] {
  return statements.map((prompt, index) => ({
    id: `c2-int-${key}-${index + 1}`,
    chapterId: 2 as const,
    section,
    type: "interest_scale" as const,
    prompt,
    helpText: SCALE_HELP,
    interestKey: key,
    scaleMin: 1 as const,
    scaleMax: 5 as const,
    required: true,
  }));
}

export const CHAPTER_2_QUESTIONS: Question[] = [
  {
    id: "c2-intro",
    chapterId: 2,
    section: "Como responder",
    type: "instruction",
    prompt:
      "Responda como você é (não como gostaria de ser). Não há resultado bom ou ruim. No fim de cada aptidão, some as notas.",
    helpText: SCALE_HELP,
  },
  ...aptitudeItems("verbal", "1 Aptidão Verbal", [
    "Tenho facilidade para escrever textos e redações.",
    "Consigo explicar bem minhas ideias quando falo.",
    "Entendo rápido o que leio, mesmo textos mais difíceis.",
    "Gosto de aprender palavras novas e uso um vocabulário variado.",
    "Me saio bem em debates, apresentações ou discussões.",
  ]),
  ...aptitudeItems("numerical", "2 Aptidão Numérica", [
    "Faço contas de cabeça com facilidade.",
    "Entendo rápido gráficos, tabelas e porcentagens.",
    "Aprendo matemática sem precisar repetir muitas vezes.",
    "Gosto de organizar gastos, comparar preços ou calcular valores.",
    "Percebo quando um número ou resultado parece errado.",
  ]),
  ...aptitudeItems("logical", "3 Raciocínio Lógico", [
    "Gosto de desafios, enigmas e quebra-cabeças.",
    "Percebo padrões e sequências com facilidade.",
    "Quando tenho um problema, penso em etapas para resolvê-lo.",
    "Consigo entender como uma coisa leva a outra (causa e consequência).",
    "Me saio bem em jogos de estratégia.",
  ]),
  ...aptitudeItems("spatial", "4 Aptidão Espacial", [
    "Consigo imaginar objetos girando ou vistos de outro ângulo.",
    "Me localizo bem em lugares novos e leio mapas com facilidade.",
    "Tenho facilidade com geometria e desenho de formas.",
    "Consigo montar coisas seguindo imagens ou esquemas.",
    "Percebo bem tamanhos, distâncias e proporções.",
  ]),
  ...aptitudeItems("mechanical", "5 Aptidão Mecânica", [
    "Tenho curiosidade sobre como as coisas funcionam por dentro.",
    "Consigo consertar objetos ou aparelhos simples.",
    "Uso ferramentas com facilidade.",
    "Entendo rápido o funcionamento de máquinas e equipamentos.",
    "Gosto de desmontar e montar coisas.",
  ]),
  ...aptitudeItems("artistic", "6 Aptidão Artística e Criativa", [
    "Tenho facilidade para desenhar, pintar, fotografar ou criar imagens.",
    "Percebo detalhes de cores, formas e combinações que outros não notam.",
    "Costumo ter ideias originais e diferentes.",
    "Gosto de deixar as coisas bonitas e com o meu estilo.",
    "As pessoas elogiam o que eu crio.",
  ]),
  ...aptitudeItems("musical", "7 Aptidão Musical", [
    "Percebo quando uma nota está desafinada ou fora do ritmo.",
    "Aprendo músicas rápido, só de ouvir.",
    "Toco, canto ou já aprendi um instrumento com facilidade.",
    "Consigo reconhecer instrumentos diferentes numa música.",
    "Crio ritmos ou melodias, mesmo que de brincadeira.",
  ]),
  ...aptitudeItems("bodily", "8 Aptidão Corporal", [
    "Aprendo esportes, danças ou movimentos novos com rapidez.",
    "Tenho boa coordenação e equilíbrio.",
    "Tenho habilidade com as mãos para trabalhos delicados.",
    "Aprendo melhor fazendo do que só ouvindo ou lendo.",
    "Tenho energia e gosto de atividades físicas.",
  ]),
  ...aptitudeItems("interpersonal", "9 Aptidão Interpessoal (Social)", [
    "Percebo como as pessoas estão se sentindo.",
    "Faço amizades com facilidade.",
    "Os amigos me procuram para pedir conselhos.",
    "Consigo ajudar a resolver conflitos entre pessoas.",
    "Sei convencer e motivar os outros.",
  ]),
  ...aptitudeItems("organizational", "10 Aptidão Organizacional", [
    "Gosto de planejar antes de começar algo.",
    "Mantenho meus materiais, arquivos e coisas organizados.",
    "Cumpro prazos e lembro dos compromissos.",
    "Presto atenção nos detalhes e percebo erros pequenos.",
    "Nos trabalhos em grupo, costumo dividir as tarefas e organizar todo mundo.",
  ]),
  // --- Parte 2 — Interesses (exact prompts) ---
  ...interestItems("realistic", "A — Fazer com as mãos (Realista)", [
    "Consertar ou construir coisas.",
    "Trabalhar ao ar livre, com plantas ou animais.",
    "Operar máquinas, equipamentos ou veículos.",
    "Fazer um trabalho em que me movimento e não fico parado.",
    "Cozinhar, montar ou produzir algo que dê para tocar.",
    "Aprender uma profissão bem prática, com resultado visível.",
  ]),
  ...interestItems("investigative", "B — Pesquisar e descobrir (Investigativo)", [
    "Fazer experiências em laboratório.",
    "Investigar as causas de uma doença ou de um fenômeno.",
    "Ler e assistir conteúdos sobre ciência e descobertas.",
    "Resolver problemas difíceis que exigem muito raciocínio.",
    "Analisar dados para chegar a uma conclusão.",
    "Descobrir algo que ninguém sabia antes.",
  ]),
  ...interestItems("artistic", "C — Criar e se expressar (Artístico)", [
    "Desenhar, pintar, fotografar ou criar vídeos.",
    "Escrever histórias, textos ou roteiros.",
    "Tocar, cantar, dançar ou atuar.",
    "Criar a identidade visual de uma marca ou o projeto de um espaço.",
    "Ter um trabalho com liberdade para inventar e sem muita rotina.",
    "Visitar exposições, shows, peças ou festivais.",
  ]),
  ...interestItems("social", "D — Ajudar e cuidar (Social)", [
    "Ensinar ou explicar coisas para outras pessoas.",
    "Cuidar de quem está doente ou precisando de apoio.",
    "Ouvir e aconselhar pessoas com problemas.",
    "Participar de projetos sociais ou voluntariado.",
    "Trabalhar com crianças, idosos ou comunidades.",
    "Ter um trabalho em que converso e convivo com muita gente.",
  ]),
  ...interestItems("enterprising", "E — Liderar e empreender (Empreendedor)", [
    "Liderar um grupo ou uma equipe.",
    "Vender uma ideia ou um produto.",
    "Abrir meu próprio negócio.",
    "Negociar e defender um ponto de vista.",
    "Tomar decisões importantes e assumir riscos.",
    "Organizar um evento, uma campanha ou um projeto do zero.",
  ]),
  ...interestItems("conventional", "F — Organizar e planejar (Convencional)", [
    "Organizar documentos, arquivos ou informações.",
    "Controlar contas, orçamentos ou estoques.",
    "Montar planilhas, listas e cronogramas.",
    "Seguir regras e procedimentos bem definidos.",
    "Conferir trabalhos para encontrar erros.",
    "Ter uma rotina de trabalho previsível e estável.",
  ]),
  {
    id: "c2-juntando-1",
    chapterId: 2,
    section: "Juntando as duas partes",
    type: "long_text",
    prompt: "Em que pontos suas aptidões e seus interesses combinam?",
  },
  {
    id: "c2-juntando-2",
    chapterId: 2,
    section: "Juntando as duas partes",
    type: "long_text",
    prompt:
      "Existe algo de que você gosta muito, mas em que ainda não tem tanta facilidade? Vale a pena desenvolver?",
  },
  {
    id: "c2-juntando-3",
    chapterId: 2,
    section: "Juntando as duas partes",
    type: "long_text",
    prompt:
      "Existe algo em que você tem facilidade, mas de que não gosta? Como você se sente em relação a isso?",
  },
  {
    id: "c2-juntando-4",
    chapterId: 2,
    section: "Juntando as duas partes",
    type: "long_text",
    prompt:
      "A partir desses resultados, que cursos ou profissões você gostaria de conhecer melhor?",
  },
];

export function aptitudeQuestionIds(key: AptitudeKey): string[] {
  return CHAPTER_2_QUESTIONS.filter(
    (q) => q.type === "aptitude_scale" && q.aptitudeKey === key,
  ).map((q) => q.id);
}

export function interestQuestionIds(key: InterestKey): string[] {
  return CHAPTER_2_QUESTIONS.filter(
    (q) => q.type === "interest_scale" && q.interestKey === key,
  ).map((q) => q.id);
}
