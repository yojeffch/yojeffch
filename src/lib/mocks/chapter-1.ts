import type { Question } from "@/types/assessment";

/** Exact Cap. 1 prompts from ebook inventory. Keep existing IDs stable. */

const GOSTO_OPTIONS = [
  { value: "sim", label: "sim" },
  { value: "mais_ou_menos", label: "mais ou menos" },
  { value: "nao", label: "não" },
];

/** Preserve legacy IDs for Português / Matemática from Fase 1. */
function gradeSubject(slug: string, label: string): Question[] {
  const gostoId =
    slug === "portugues"
      ? "c1-nota-portugues-gosto"
      : slug === "matematica"
        ? "c1-nota-matematica-gosto"
        : `c1-nota-${slug}-gosto`;
  const porqueId =
    slug === "portugues"
      ? "c1-nota-portugues-porque"
      : slug === "matematica"
        ? "c1-nota-matematica-porque"
        : `c1-nota-${slug}-porque`;

  return [
    {
      id: `c1-nota-${slug}-valor`,
      chapterId: 1,
      section: `3 — Suas notas · ${label}`,
      type: "short_text",
      prompt: `Nota — ${label}`,
      inputMode: "decimal",
    },
    {
      id: gostoId,
      chapterId: 1,
      section: `3 — Suas notas · ${label}`,
      type: "single_choice",
      prompt: "Gosto do assunto? (sim / mais ou menos / não)",
      options: GOSTO_OPTIONS,
    },
    {
      id: porqueId,
      chapterId: 1,
      section: `3 — Suas notas · ${label}`,
      type: "long_text",
      prompt: "Por que vou bem ou mal nessa matéria?",
    },
  ];
}

export const CHAPTER_1_QUESTIONS: Question[] = [
  {
    id: "c1-intro",
    chapterId: 1,
    section: "Antes de começar",
    type: "instruction",
    prompt:
      "Responda com sinceridade. Não há respostas certas ou erradas. Você pode fazer em mais de uma vez.",
  },
  // --- Biodata (clustered in journey) ---
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
    inputMode: "numeric",
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
  // --- Família ---
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
  // --- Vida escolar: trajetória ---
  {
    id: "c1-escola-traj-1",
    chapterId: 1,
    section: "3 — Sua trajetória",
    type: "long_text",
    prompt: "Por quais escolas você passou? Mudou de escola alguma vez? Por quê?",
  },
  {
    id: "c1-escola-traj-2",
    chapterId: 1,
    section: "3 — Sua trajetória",
    type: "long_text",
    prompt: "Como você se sentia na escola quando era criança? E hoje?",
  },
  {
    id: "c1-escola-traj-3",
    chapterId: 1,
    section: "3 — Sua trajetória",
    type: "long_text",
    prompt:
      "Teve alguma fase da vida escolar muito boa ou muito difícil? Conte um pouco.",
  },
  {
    id: "c1-escola-traj-4",
    chapterId: 1,
    section: "3 — Sua trajetória",
    type: "long_text",
    prompt: "Você já ficou de recuperação ou repetiu algum ano? Como foi?",
  },
  {
    id: "c1-escola-traj-5",
    chapterId: 1,
    section: "3 — Sua trajetória",
    type: "long_text",
    prompt: "Como é a sua rotina de estudos fora da sala de aula?",
  },
  // --- Matérias ---
  {
    id: "c1-materias-1",
    chapterId: 1,
    section: "3 — Matérias de que você gosta",
    type: "long_text",
    prompt:
      "De quais assuntos você gosta, mesmo que não goste da aula ou do professor atual? Por quê?",
  },
  {
    id: "c1-materias-2",
    chapterId: 1,
    section: "3 — Matérias de que você gosta",
    type: "long_text",
    prompt:
      "De quais aulas ou professores você gosta, mesmo que o assunto não seja o seu favorito? O que eles fazem de diferente?",
  },
  {
    id: "c1-materias-3",
    chapterId: 1,
    section: "3 — Matérias de que você gosta",
    type: "long_text",
    prompt:
      "Quais matérias você menos gosta? É pelo assunto, pela aula ou pelos dois?",
  },
  {
    id: "c1-materias-4",
    chapterId: 1,
    section: "3 — Matérias de que você gosta",
    type: "long_text",
    prompt: "Teve algum professor que marcou você? O que ele tinha de especial?",
  },
  // --- Notas (mini-ferramenta: matéria a matéria) ---
  {
    id: "c1-notas-intro",
    chapterId: 1,
    section: "3 — Suas notas",
    type: "instruction",
    prompt:
      "Preencha com as notas do último ano ou bimestre. Na última coluna, conte por que acha que vai bem ou mal naquela matéria.",
  },
  ...gradeSubject("portugues", "Português"),
  ...gradeSubject("matematica", "Matemática"),
  ...gradeSubject("historia", "História"),
  ...gradeSubject("biologia", "Biologia"),
  ...gradeSubject("artes", "Artes"),
  ...gradeSubject("ed-fisica", "Educação Física"),
  // --- História ---
  {
    id: "c1-historia-1",
    chapterId: 1,
    section: "4 — Sua história",
    type: "long_text",
    prompt: "Como você era quando criança? Do que gostava de brincar?",
  },
  {
    id: "c1-historia-2",
    chapterId: 1,
    section: "4 — Sua história",
    type: "long_text",
    prompt:
      "Quando era pequeno(a), o que dizia que queria ser quando crescesse? Isso mudou? Por quê?",
  },
  {
    id: "c1-historia-3",
    chapterId: 1,
    section: "4 — Sua história",
    type: "long_text",
    prompt:
      "Quais foram os acontecimentos mais marcantes da sua vida até agora? (bons ou difíceis)",
  },
  {
    id: "c1-historia-4",
    chapterId: 1,
    section: "4 — Sua história",
    type: "long_text",
    prompt: "O que você aprendeu com esses acontecimentos?",
  },
  {
    id: "c1-historia-5",
    chapterId: 1,
    section: "4 — Sua história",
    type: "long_text",
    prompt: "Do que você mais se orgulha até hoje?",
  },
  {
    id: "c1-historia-6",
    chapterId: 1,
    section: "4 — Sua história",
    type: "long_text",
    prompt: "Qual foi o maior desafio que você já enfrentou? Como lidou com ele?",
  },
  {
    id: "c1-historia-7",
    chapterId: 1,
    section: "4 — Sua história",
    type: "long_text",
    prompt:
      "Existe alguém (da família ou não) que você admira muito? O que admira nessa pessoa?",
  },
  // --- O que você faz ---
  {
    id: "c1-faz-1",
    chapterId: 1,
    section: "5 — O que você faz e do que gosta",
    type: "long_text",
    prompt:
      "Você faz ou já fez atividades fora da escola? (esporte, música, idiomas, cursos, voluntariado, trabalho) Quais e por quanto tempo?",
  },
  {
    id: "c1-faz-2",
    chapterId: 1,
    section: "5 — O que você faz e do que gosta",
    type: "long_text",
    prompt:
      "Dessas atividades, quais você continuaria fazendo? E quais largou? Por quê?",
  },
  {
    id: "c1-tempo-livre",
    chapterId: 1,
    section: "5 — O que você faz e do que gosta",
    type: "long_text",
    prompt: "O que você gosta de fazer no tempo livre?",
  },
  {
    id: "c1-faz-4",
    chapterId: 1,
    section: "5 — O que você faz e do que gosta",
    type: "long_text",
    prompt:
      "Que tipo de conteúdo você mais consome? (vídeos, séries, livros, jogos, podcasts, redes sociais) Sobre quais assuntos?",
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
    id: "c1-faz-6",
    chapterId: 1,
    section: "5 — O que você faz e do que gosta",
    type: "long_text",
    prompt: "O que você não gosta de fazer de jeito nenhum? Por quê?",
  },
  {
    id: "c1-faz-7",
    chapterId: 1,
    section: "5 — O que você faz e do que gosta",
    type: "long_text",
    prompt:
      "Você prefere trabalhar sozinho(a) ou em grupo? Prefere atividades mais práticas ou mais teóricas?",
  },
  {
    id: "c1-faz-8",
    chapterId: 1,
    section: "5 — O que você faz e do que gosta",
    type: "long_text",
    prompt: "Em que as pessoas costumam pedir a sua ajuda?",
  },
  {
    id: "c1-faz-9",
    chapterId: 1,
    section: "5 — O que você faz e do que gosta",
    type: "long_text",
    prompt:
      "Quais você acha que são as suas maiores habilidades? E o que gostaria de melhorar?",
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
  // --- Crescer ---
  {
    id: "c1-crescer-1",
    chapterId: 1,
    section: "6 — Crescer: da adolescência à vida adulta",
    type: "long_text",
    prompt:
      "Que mudanças você percebeu em si mesmo(a) nos últimos anos? (no jeito de pensar, nos gostos, nas amizades)",
  },
  {
    id: "c1-crescer-2",
    chapterId: 1,
    section: "6 — Crescer: da adolescência à vida adulta",
    type: "long_text",
    prompt: "O que você acha mais legal em ser adolescente? E o mais difícil?",
  },
  {
    id: "c1-crescer-3",
    chapterId: 1,
    section: "6 — Crescer: da adolescência à vida adulta",
    type: "long_text",
    prompt: "Para você, o que significa ser adulto?",
  },
  {
    id: "c1-crescer-4",
    chapterId: 1,
    section: "6 — Crescer: da adolescência à vida adulta",
    type: "long_text",
    prompt: "O que te anima em relação à vida adulta? E o que te preocupa?",
  },
  {
    id: "c1-crescer-5",
    chapterId: 1,
    section: "6 — Crescer: da adolescência à vida adulta",
    type: "long_text",
    prompt:
      "Você já se sente responsável por decisões importantes da sua vida? Quais?",
  },
  {
    id: "c1-crescer-6",
    chapterId: 1,
    section: "6 — Crescer: da adolescência à vida adulta",
    type: "long_text",
    prompt:
      "Como você se sente diante da escolha de um curso ou profissão? (animado, ansioso, perdido, pressionado, tranquilo…) Por quê?",
  },
  // --- Sonhos ---
  {
    id: "c1-sonhos-1",
    chapterId: 1,
    section: "7 — Seus sonhos e o seu futuro",
    type: "long_text",
    prompt:
      "Quais são os seus maiores sonhos? Por que eles são importantes para você?",
  },
  {
    id: "c1-sonhos-2",
    chapterId: 1,
    section: "7 — Seus sonhos e o seu futuro",
    type: "long_text",
    prompt:
      "Quais objetivos você quer alcançar nos próximos 2 anos? E nos próximos 10?",
  },
  {
    id: "c1-sonhos-3",
    chapterId: 1,
    section: "7 — Seus sonhos e o seu futuro",
    type: "long_text",
    prompt:
      "Quais cursos ou profissões já passaram pela sua cabeça? O que te atrai em cada um?",
  },
  {
    id: "c1-sonhos-4",
    chapterId: 1,
    section: "7 — Seus sonhos e o seu futuro",
    type: "long_text",
    prompt: "Há alguma profissão que você jamais escolheria? Por quê?",
  },
  {
    id: "c1-sonhos-5",
    chapterId: 1,
    section: "7 — Seus sonhos e o seu futuro",
    type: "long_text",
    prompt:
      "Imagine você com 30 anos. Onde mora, com quem vive, como é um dia comum seu?",
  },
  {
    id: "c1-sonhos-6",
    chapterId: 1,
    section: "7 — Seus sonhos e o seu futuro",
    type: "long_text",
    prompt:
      "Como seria o seu trabalho ideal? (ambiente, rotina, com quem trabalha, o que produz)",
  },
  {
    id: "c1-sonhos-7",
    chapterId: 1,
    section: "7 — Seus sonhos e o seu futuro",
    type: "long_text",
    prompt:
      "O que é mais importante para você numa profissão? (ganhar bem, ter estabilidade, ajudar pessoas, ser criativo, ter liberdade, ser reconhecido, viajar, outro)",
  },
  {
    id: "c1-sonhos-8",
    chapterId: 1,
    section: "7 — Seus sonhos e o seu futuro",
    type: "long_text",
    prompt:
      "Se dinheiro e opinião dos outros não importassem, o que você escolheria fazer?",
  },
  {
    id: "c1-sonhos-9",
    chapterId: 1,
    section: "7 — Seus sonhos e o seu futuro",
    type: "long_text",
    prompt:
      "Você pensa em fazer faculdade, curso técnico, outro caminho ou ainda não sabe? Por quê?",
  },
  // --- Expectativas da família ---
  {
    id: "c1-expect-1",
    chapterId: 1,
    section: "8 — Você e as expectativas da sua família",
    type: "long_text",
    prompt: "O que seus pais ou responsáveis esperam do seu futuro profissional?",
  },
  {
    id: "c1-expect-2",
    chapterId: 1,
    section: "8 — Você e as expectativas da sua família",
    type: "long_text",
    prompt:
      "Eles já sugeriram algum curso ou profissão para você? Qual? O que você acha disso?",
  },
  {
    id: "c1-expect-3",
    chapterId: 1,
    section: "8 — Você e as expectativas da sua família",
    type: "long_text",
    prompt:
      "As expectativas deles combinam com o que você deseja? Em que se parecem e em que são diferentes?",
  },
  {
    id: "c1-expect-4",
    chapterId: 1,
    section: "8 — Você e as expectativas da sua família",
    type: "long_text",
    prompt: "De que forma seus pais ajudam você a buscar seus sonhos?",
  },
  {
    id: "c1-expect-5",
    chapterId: 1,
    section: "8 — Você e as expectativas da sua família",
    type: "long_text",
    prompt:
      "Existe algo na sua família que dificulta ou limita suas escolhas? (financeiro, opiniões, distância, outros)",
  },
  {
    id: "c1-expect-6",
    chapterId: 1,
    section: "8 — Você e as expectativas da sua família",
    type: "long_text",
    prompt: "Você se sente à vontade para conversar com eles sobre o seu futuro?",
  },
  {
    id: "c1-expect-7",
    chapterId: 1,
    section: "8 — Você e as expectativas da sua família",
    type: "long_text",
    prompt:
      "Se você escolhesse algo diferente do que eles esperam, como acha que eles reagiriam? E como você se sentiria?",
  },
  // --- Para fechar ---
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
