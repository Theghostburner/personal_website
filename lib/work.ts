export type WorkItem = {
  slug: string;
  title: string;
  year: string;
  kind: string;
  href?: string;
  note: string;
  span: "wide" | "tall" | "square";
  tone: "ink" | "paper" | "signal" | "hatch";
};

/**
 * Add new pieces here. The Work gallery renders this list in order.
 */
export const work: WorkItem[] = [
  {
    slug: "ablecredit",
    title: "AbleCredit",
    year: "Now",
    kind: "Technical product manager",
    note: "Full-time, since Oct 2026. GenAI products for onboarding, claims, credit, and collections.",
    span: "wide",
    tone: "ink",
  },
  {
    slug: "clarion",
    title: "Clarion",
    year: "Side project",
    kind: "Product",
    href: "https://www.tryclarion.ai",
    note: "Not full-time. Signal in. Approved work out. Engineering teams stop chasing status.",
    span: "wide",
    tone: "signal",
  },
  {
    slug: "resolv",
    title: "Resolv AI",
    year: "2023–24",
    kind: "Company",
    note: "Agentic RAG over developer docs, plus personalised tech micro-courses. 10k+ MAU.",
    span: "square",
    tone: "paper",
  },
  {
    slug: "leena",
    title: "Leena AI",
    year: "2025–26",
    kind: "Machine Learning",
    note: "GenAI systems that cut enterprise ticket load across IT, HR, finance, procurement.",
    span: "square",
    tone: "hatch",
  },
  {
    slug: "healthplix",
    title: "HealthPlix",
    year: "2022–23",
    kind: "Full stack",
    note: "AWS data pipelines, ELK at scale, PySpark quality reporting, prescription NLP.",
    span: "tall",
    tone: "paper",
  },
  {
    slug: "orthoassistant",
    title: "OrthoAssistant",
    year: "2020",
    kind: "Unity",
    note: "Dental analyses in one scene — Huckaba, Tweed, Bolton, and the rest.",
    span: "square",
    tone: "ink",
  },
  {
    slug: "kgp-resource",
    title: "KGP Resource Tool",
    year: "2019",
    kind: "Android",
    note: "Campus links, one app. 1,500+ downloads in a week.",
    span: "square",
    tone: "signal",
  },
  {
    slug: "edin-ar",
    title: "EDinAR",
    year: "2019",
    kind: "AR",
    note: "Engineering drawing in augmented space — projections, sections, orthographic views.",
    span: "wide",
    tone: "hatch",
  },
];
