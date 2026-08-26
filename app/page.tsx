const LINKS = {
  clarion: "https://www.tryclarion.ai",
  linkedin: "https://www.linkedin.com/in/sudeep-sharma-466a41174/",
  github: "https://github.com/Theghostburner",
  email: "mailto:sudeep@tryclarion.ai",
};

export default function Home() {
  return (
    <>
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to story
      </a>

      <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="serif text-xl tracking-tight">Sudeep Sharma</span>
            <span className="hidden text-xs tracking-[0.18em] text-muted uppercase sm:inline">
              IIT Kharagpur
            </span>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-ink-soft md:flex">
            <a className="hover:text-accent" href="#story">
              Story
            </a>
            <a className="hover:text-accent" href="#society">
              Society
            </a>
            <a className="hover:text-accent" href="#work">
              Work
            </a>
            <a className="hover:text-accent" href="#projects">
              Projects
            </a>
            <a className="hover:text-accent" href="#contact">
              Contact
            </a>
          </nav>
          <a
            href={LINKS.clarion}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium tracking-wide text-paper sm:text-sm"
          >
            Clarion
          </a>
        </div>
      </header>

      <nav
        aria-label="Mobile sections"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-2 py-2 backdrop-blur-md md:hidden"
      >
        <ul className="grid grid-cols-4 text-center text-[11px] font-medium tracking-wide text-muted">
          <li>
            <a className="block py-2" href="#story">
              Story
            </a>
          </li>
          <li>
            <a className="block py-2" href="#society">
              Society
            </a>
          </li>
          <li>
            <a className="block py-2" href="#projects">
              Projects
            </a>
          </li>
          <li>
            <a className="block py-2" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <main id="top" className="pb-24 md:pb-0">
        <section className="relative overflow-hidden border-b border-line">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(178,58,20,0.09),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(28,67,61,0.08),transparent_38%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:pb-24 lg:pt-36">
            <div>
              <p className="text-xs font-medium tracking-[0.28em] text-accent uppercase">
                Engineer · Founder · IIT Kharagpur
              </p>
              <h1 className="serif mt-5 text-[3.15rem] leading-[0.92] tracking-tight text-ink sm:text-7xl lg:text-8xl">
                Sudeep Sharma
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                I went to{" "}
                <strong className="font-medium text-ink">IIT Kharagpur</strong> for a five-year dual
                degree in Mechanical Engineering, founded a student society that still runs on campus,
                and now I build products that take the chase out of engineering work.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper"
                >
                  See my projects
                </a>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/40"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <aside className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="border border-line bg-paper-2/60 p-5">
                <p className="text-xs tracking-[0.2em] text-muted uppercase">Campus</p>
                <p className="serif mt-2 text-2xl">IIT Kharagpur</p>
                <p className="mt-1 text-sm text-ink-soft">B.Tech + M.Tech · Mechanical · 2017–2022</p>
              </div>
              <div className="border border-line bg-paper-2/60 p-5">
                <p className="text-xs tracking-[0.2em] text-muted uppercase">JEE Advanced 2017</p>
                <p className="serif mt-2 text-2xl">AIR 1726</p>
                <p className="mt-1 text-sm text-ink-soft">The rank that opened the KGP gate</p>
              </div>
              <div className="border border-line bg-paper-2/60 p-5 sm:col-span-2 lg:col-span-1">
                <p className="text-xs tracking-[0.2em] text-muted uppercase">Building now</p>
                <p className="serif mt-2 text-2xl">Clarion</p>
                <p className="mt-1 text-sm text-ink-soft">
                  Eliminate process overhead for engineering teams
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section id="story" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.4fr_1fr]">
            <div>
              <p className="text-xs tracking-[0.28em] text-accent uppercase">01 — Story</p>
              <h2 className="serif mt-3 text-4xl tracking-tight sm:text-5xl">How I got to IIT Kharagpur</h2>
            </div>
            <div className="max-w-2xl space-y-6 text-lg leading-8 text-ink-soft">
              <p>
                In 2017 I sat{" "}
                <strong className="font-medium text-ink">JEE Advanced</strong> with a few hundred
                thousand other students. I scored 249/360 and landed All India Rank{" "}
                <strong className="font-medium text-ink">1726</strong>. That number is how{" "}
                <strong className="font-medium text-ink">Sudeep Sharma</strong> arrived at{" "}
                <strong className="font-medium text-ink">IIT Kharagpur</strong> — the oldest IIT, a
                campus that still feels like a small city with a very loud tempo shout.
              </p>
              <p>
                I enrolled in the five-year integrated B.Tech + M.Tech in Mechanical Engineering
                (2017–2022). The degree was machines, materials, and analysis. The life around it
                was something else: robots that play soccer, Unity workshops at 2 a.m., and a
                stubborn feeling that if a tool did not exist on campus, we should just make it.
              </p>
              <p>
                KGP taught me two habits I still use. First, ship something people can hold —
                a game, an AR module, a society, a product. Second, gather a room of people who
                care and give them a place to get better together. That second habit became the
                Computer Graphics Society.
              </p>
            </div>
          </div>
        </section>

        <section id="society" className="border-y border-line bg-pine text-paper">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs tracking-[0.28em] text-[#e8c4b4] uppercase">02 — Society</p>
              <h2 className="serif mt-3 text-4xl tracking-tight sm:text-5xl">
                Founding the Computer Graphics Society
              </h2>
              <p className="mt-6 text-lg leading-8 text-paper/80">
                At IIT Kharagpur I co-founded the{" "}
                <strong className="font-medium text-paper">Computer Graphics Society</strong>{" "}
                (CGL) — also known on campus as Computer Graphics Lab — and later stayed on as
                founder and advisor.
              </p>
            </div>
            <div className="space-y-6 text-base leading-8 text-paper/80">
              <p>
                We started by getting students curious about game development. Then the room got
                bigger: AI, animation, game art, event management, gameplay research. CGL grew into
                a full technology group — a place to learn by making, not by watching slides.
              </p>
              <p>
                I ran it as Founder and Managing Head from 2019 to 2021, then as Founder and Advisor
                through 2022. We built games and graphics work with Unity, wrote OpenGL and C++,
                designed algorithms, and ran a game-development workshop at the institute tech fest.
                For two years I was also a Unity Student Ambassador, hosting workshops so more KGPians
                could pick up real-time 3D.
              </p>
              <p>
                Before CGL I spent time on the mechanical team of the{" "}
                <strong className="font-medium text-paper">
                  Kharagpur Robosoccer Students Group
                </strong>
                , designing humanoid assemblies and a ball dribbler for SSL robots. Different craft,
                same instinct: assemble a team, iterate until it moves.
              </p>
              <p className="border-l-2 border-[#e8c4b4] pl-5 text-paper">
                Inter IIT Tech Meet 2019: gold in Ashoka Tech for Change, for an AR learning product,
                and overall runner-up for IIT Kharagpur.
              </p>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="text-xs tracking-[0.28em] text-accent uppercase">03 — Work</p>
          <h2 className="serif mt-3 max-w-xl text-4xl tracking-tight sm:text-5xl">
            From campus builds to AI products
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            After IIT Kharagpur I kept oscillating between building and leading — startups, enterprise
            AI, and now Clarion.
          </p>

          <ol className="mt-14 divide-y divide-line border-y border-line">
            {[
              {
                years: "Now",
                title: "Clarion — Founder",
                place: "tryclarion.ai",
                body: "Clarion gathers signal from the tools engineering teams already use, then detects, diagnoses, and proposes. Managers approve. Work stays current without the status chase.",
              },
              {
                years: "2026",
                title: "AbleCredit — Lead Forward Deployed Engineer",
                place: "Bengaluru · GenAI infra for BFSI",
                body: "Building the next generation of AI-based fintech: customisable GenAI workflows for onboarding, claims, credit, and collections.",
              },
              {
                years: "2025–2026",
                title: "Leena AI — Machine Learning Engineer",
                place: "Gurugram",
                body: "GenAI and machine-learning systems that cut enterprise ticket load across IT, HR, finance, and procurement.",
              },
              {
                years: "2023–2024",
                title: "Resolv AI — Co-founder & CEO",
                place: "Bengaluru",
                body: "Raised $100k. Built an agentic RAG system over developer documentation (10k+ MAU) and an AI micro-course engine shaped to each learner’s goals.",
              },
              {
                years: "2022–2023",
                title: "HealthPlix — Full Stack Developer",
                place: "Bengaluru",
                body: "Data pipelines on AWS (S3, Athena, ECS, Airflow), ELK at scale, PySpark quality reporting, and NLP that turned free-text prescriptions into structured medicine data.",
              },
              {
                years: "2020–2022",
                title: "Flam & Inspirit — AR / VR engineering",
                place: "Unity · mixed reality",
                body: "Recording and UI in a mixed-reality app at Flam; educational VR modules and analytics at Inspirit while still at IIT Kharagpur.",
              },
            ].map((job) => (
              <li
                key={job.title}
                className="grid gap-3 py-8 sm:grid-cols-[7.5rem_1fr] sm:gap-10"
              >
                <p className="text-xs tracking-[0.16em] text-muted uppercase">{job.years}</p>
                <div>
                  <h3 className="text-lg font-medium text-ink">{job.title}</h3>
                  <p className="mt-1 text-sm text-muted">{job.place}</p>
                  <p className="mt-3 max-w-2xl leading-7 text-ink-soft">{job.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="projects" className="border-t border-line bg-paper-2/50">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <p className="text-xs tracking-[0.28em] text-accent uppercase">04 — Projects</p>
            <h2 className="serif mt-3 text-4xl tracking-tight sm:text-5xl">What I am making</h2>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft">
              One product in the foreground. A few earlier builds so you can see the through-line.
            </p>

            <article className="mt-14 overflow-hidden border border-line bg-paper">
              <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
                <div className="p-8 sm:p-12">
                  <p className="text-xs tracking-[0.22em] text-accent uppercase">Featured</p>
                  <h3 className="serif mt-3 text-4xl tracking-tight sm:text-5xl">Clarion</h3>
                  <p className="mt-2 text-sm text-muted">www.tryclarion.ai</p>
                  <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">
                    Engineering managers drown in Slack, standups, and boards that never quite match
                    reality. Clarion turns that noise into a loop you can actually run: gather,
                    detect, diagnose, propose — then you approve before anything is written.
                  </p>
                  <ol className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      ["01 Gather", "One stream from the connectors you plug in."],
                      ["02 Detect", "Rank what matters. Drop the rest."],
                      ["03 Diagnose", "Root cause, plus a concrete fix."],
                      ["04 Propose", "Clear next steps. Nothing ships without your OK."],
                    ].map(([step, copy]) => (
                      <li key={step} className="border border-line p-4">
                        <p className="text-sm font-medium text-ink">{step}</p>
                        <p className="mt-1 text-sm text-muted">{copy}</p>
                      </li>
                    ))}
                  </ol>
                  <a
                    href={LINKS.clarion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper"
                  >
                    Visit Clarion
                  </a>
                </div>
                <div className="flex flex-col justify-between bg-ink p-8 text-paper sm:p-12">
                  <p className="serif text-3xl leading-snug">
                    “Eliminate process overhead for engineering teams.”
                  </p>
                  <ul className="mt-10 space-y-3 text-sm text-paper/75">
                    <li>Human in the loop — you approve first</li>
                    <li>Standups from real work, not status theater</li>
                    <li>Slack, trackers, and code in one read</li>
                    <li>Private by default. No model training on your content</li>
                  </ul>
                </div>
              </div>
            </article>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {[
                {
                  name: "Resolv AI",
                  meta: "Agentic RAG · 10k+ MAU",
                  body: "Developer questions answered from real docs, plus personalised tech micro-courses. My first company after KGP.",
                },
                {
                  name: "OrthoAssistant",
                  meta: "Unity · dental research",
                  body: "Clinical analyses (Huckaba, Tweed, Bolton, and more) in a single-scene app — built to make treatment math less error-prone.",
                },
                {
                  name: "KGP Resource Tool",
                  meta: "Campus · 1,500+ downloads in a week",
                  body: "The links every IIT Kharagpur student needed, in one Android app. Proof that distribution on campus can be overnight.",
                },
              ].map((project) => (
                <article key={project.name} className="border border-line bg-paper p-7">
                  <h3 className="serif text-2xl">{project.name}</h3>
                  <p className="mt-1 text-xs tracking-[0.14em] text-muted uppercase">{project.meta}</p>
                  <p className="mt-4 leading-7 text-ink-soft">{project.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto min-h-[70vh] max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="text-xs tracking-[0.28em] text-accent uppercase">05 — Contact</p>
          <h2 className="serif mt-3 text-4xl tracking-tight sm:text-5xl">Say hello</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
            If you want to talk about Clarion, IIT Kharagpur, CGL, or just a well-aimed product
            question — this is the shortest path.
          </p>
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            <li>
              <a
                href={LINKS.email}
                className="block border border-line p-6 hover:border-accent"
              >
                <p className="text-xs tracking-[0.18em] text-muted uppercase">Email</p>
                <p className="mt-2 font-medium">sudeep@tryclarion.ai</p>
              </a>
            </li>
            <li>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-line p-6 hover:border-accent"
              >
                <p className="text-xs tracking-[0.18em] text-muted uppercase">LinkedIn</p>
                <p className="mt-2 font-medium">Sudeep Sharma</p>
              </a>
            </li>
            <li>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-line p-6 hover:border-accent"
              >
                <p className="text-xs tracking-[0.18em] text-muted uppercase">GitHub</p>
                <p className="mt-2 font-medium">Theghostburner</p>
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-line px-5 py-8 text-sm text-muted sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sudeep Sharma · IIT Kharagpur</p>
          <p>Built with Next.js and Tailwind CSS</p>
        </div>
      </footer>
    </>
  );
}
