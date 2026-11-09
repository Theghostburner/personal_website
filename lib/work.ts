export type WorkPlay =
  | "doors"
  | "waves"
  | "fan"
  | "orbit"
  | "flow"
  | "angle"
  | "tiles"
  | "plane";

export type WorkItem = {
  slug: string;
  title: string;
  year: string;
  kind: string;
  place: string;
  note: string;
  span: "wide" | "tall" | "square";
  tone: "ink" | "paper" | "signal" | "hatch";
  play: WorkPlay;
  href?: string;
  lead: string;
  points: string[];
};

export const work: WorkItem[] = [
  {
    slug: "ablecredit",
    title: "AbleCredit",
    year: "Now",
    kind: "Technical product manager",
    place: "Bengaluru",
    note: "GenAI products for onboarding, claims, credit, and collections.",
    span: "wide",
    tone: "ink",
    play: "fan",
    lead: "I am the technical product manager. The job is to sit with clients and ship AI they will actually run — lending, and a read on the risk of the borrower.",
    points: [
      "Work with clients to deliver AI for lending and borrower risk assessment.",
      "The product is GenAI for onboarding, claims, credit, and collections.",
      "The cut is what a bank will run, not what a demo can show.",
    ],
  },
  {
    slug: "clarion",
    title: "Clarion",
    year: "Live",
    kind: "Product",
    place: "tryclarion.ai",
    note: "Signal in. Approved work out. Engineering teams stop chasing status.",
    span: "wide",
    tone: "signal",
    play: "waves",
    href: "https://www.tryclarion.ai",
    lead: "Clarion takes the noise an engineering team already lives in and turns it into the next piece of work — after a person says yes.",
    points: [
      "Gather one stream from the tools a team already uses.",
      "Detect what matters, diagnose it, and propose a concrete next step.",
      "Nothing is written to the board until someone approves it.",
    ],
  },
  {
    slug: "resolv",
    title: "Resolv AI",
    year: "2023–25",
    kind: "Co-founder & CEO",
    place: "Bengaluru",
    note: "Agentic RAG over developer docs, plus personalised tech micro-courses. 10k users.",
    span: "square",
    tone: "paper",
    play: "orbit",
    lead: "I co-founded Resolv and led AI and backend. The product answered developer questions from real docs, and built a course around the problem you actually had.",
    points: [
      "Raised USD 100k pre-seed from a global VC after iterating the product against real usage.",
      "Built the backend for a platform where developers make courses around a specific tech problem.",
      "Shipped an agentic RAG system on the GPT-4 API so a tech question came back with the explanation, not a shrug.",
      "Ran 100+ developer interviews and feedback sessions with CTOs and engineering managers.",
      "Scaled to 1,000+ daily active users, 10k total users, and 3 B2B clients for the Q&A.",
      "Ran the backend on Docker, EC2, and NGINX, with CI/CD through GitHub Actions.",
    ],
  },
  {
    slug: "leena",
    title: "Leena AI",
    year: "2025–26",
    kind: "Machine learning",
    place: "Gurugram",
    note: "Policy conflicts, RAG search, and the move onto Kubernetes.",
    span: "square",
    tone: "hatch",
    play: "doors",
    lead: "A year inside Leena’s enterprise AI. The work was policies: find where they fight each other, answer questions across them, and get the system onto Kubernetes.",
    points: [
      "Built a health dashboard that flags conflicts inside an enterprise’s policies.",
      "Processed every policy-section pair — nC2 — with Jaccard similarity, a trained cross-encoder, and a prompt tuned for that job.",
      "Moved that product onto Kubernetes, globally.",
      "Worked on Leena’s RAG search, which answers a person’s question from across the company’s policies, and scaled it globally.",
      "Migrated older repos onto Kubernetes and added monitoring so they could scale.",
    ],
  },
  {
    slug: "healthplix",
    title: "HealthPlix",
    year: "2022–23",
    kind: "Full stack",
    place: "Bengaluru",
    note: "AWS data pipelines, ELK at scale, PySpark quality reporting, prescription NLP.",
    span: "tall",
    tone: "paper",
    play: "flow",
    lead: "Full stack on the data side of a clinic. Daily data in, logs you can search, and a prescription field that becomes a real medicine.",
    points: [
      "Built a pipeline that pulls daily data from several sources into S3, then Athena.",
      "Set up ELK for log retrieval and search, and load-tested it against high-volume servers.",
      "Built and improved a big-data quality pipeline in PySpark, deployed on an ECS cluster.",
      "Replaced scattered cron jobs with Airflow and Celery DAGs so the schedule could scale.",
      "Wrote an algorithm that reads a doctor’s free-text prescription into medicine, brand, and dosage — or the closest match in the database.",
    ],
  },
  {
    slug: "orthoassistant",
    title: "OrthoAssistant",
    year: "2020",
    kind: "Unity",
    place: "Dental research",
    note: "Dental analyses in one scene — Huckaba, Tweed, Bolton, and the rest.",
    span: "square",
    tone: "ink",
    play: "angle",
    lead: "A single-scene Unity app for the measurements an orthodontist actually runs. The math stays in one place, so the case does too.",
    points: [
      "Huckaba, Tweed, Bolton, Moyers, and total space analysis, each in its own panel.",
      "Written in C# on the Unity engine, one scene, the calculations in a script.",
      "Built so the treatment math is the same every time a case is opened.",
    ],
  },
  {
    slug: "kgp-resource",
    title: "KGP Resource Tool",
    year: "2019",
    kind: "Android",
    place: "IIT Kharagpur",
    note: "Campus links, one app. 1,500+ downloads in a week.",
    span: "square",
    tone: "signal",
    play: "tiles",
    lead: "The links a Kharagpur student opens every day, collected into one Android app. It moved the week it shipped.",
    points: [
      "One scene, panels for the pages, UI drawn in Illustrator, logic in C#.",
      "1,500+ downloads in the first week on the Play Store.",
      "Banner ads in the build, because campus distribution still has to pay for itself.",
    ],
  },
  {
    slug: "edin-ar",
    title: "EDinAR",
    year: "2019",
    kind: "AR",
    place: "Engineering drawing",
    note: "Engineering drawing in augmented space — projections, sections, orthographic views.",
    span: "wide",
    tone: "hatch",
    play: "plane",
    lead: "Engineering drawing is hard to see on paper. EDinAR put the solid in the room, so a section and a projection are things you can turn.",
    points: [
      "Built in Unity with Vuforia, for Android.",
      "Projections of points and lines, objects on planes, sections, and orthographic views.",
      "Custom shaders so a cross-section and a plane projection read as different things.",
    ],
  },
];

export function getWork(slug: string) {
  return work.find((item) => item.slug === slug);
}
