import { Hero } from "@/components/Hero";
import { work } from "@/lib/work";

const LINKS = {
  clarion: "https://www.tryclarion.ai",
  linkedin: "https://www.linkedin.com/in/sudeep-sharma-466a41174/",
  github: "https://github.com/Theghostburner",
  email: "mailto:sudeep@tryclarion.ai",
};

const toneClass = {
  ink: "bg-ink text-paper",
  paper: "bg-paper text-ink",
  signal: "bg-signal text-paper",
  hatch: "bg-signal text-paper hatch",
} as const;

const spanClass = {
  wide: "sm:col-span-2",
  tall: "sm:row-span-2 min-h-[22rem] sm:min-h-[32rem]",
  square: "",
} as const;

export default function Home() {
  const total = String(work.length).padStart(2, "0");

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-paper"
      >
        Skip to about
      </a>

      <header className="sticky top-0 z-40 border-b border-ink bg-paper">
        <div className="grid grid-cols-2 border-ink md:grid-cols-[1fr_auto_1fr]">
          <a href="#top" className="flex items-center gap-4 px-4 py-3 md:px-5">
            <span className="display text-2xl leading-none">SS</span>
            <span className="mono hidden text-[10px] leading-tight tracking-[0.18em] uppercase sm:block">
              Tech + Product
              <br />
              AbleCredit
            </span>
          </a>
          <nav
            aria-label="Primary"
            className="mono hidden items-center justify-center gap-8 border-x border-ink px-8 text-[11px] tracking-[0.22em] uppercase md:flex"
          >
            <a href="#about" className="hover:text-signal">
              About
            </a>
            <a href="#work" className="hover:text-signal">
              Work
            </a>
            <a href="#contact" className="hover:text-signal">
              Contact
            </a>
          </nav>
          <div className="flex items-center justify-end gap-0 text-[11px]">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mono hidden border-l border-ink px-4 py-3 tracking-[0.18em] uppercase sm:block"
            >
              GitHub
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mono hidden border-l border-ink px-4 py-3 tracking-[0.18em] uppercase sm:block"
            >
              in
            </a>
            <a
              href={LINKS.email}
              className="mono bg-ink px-4 py-3 tracking-[0.16em] text-paper uppercase"
            >
              Email →
            </a>
          </div>
        </div>
      </header>

      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-ink bg-paper md:hidden"
      >
        <a className="mono py-3 text-center text-[10px] tracking-[0.2em] uppercase" href="#about">
          About
        </a>
        <a
          className="mono border-x border-ink py-3 text-center text-[10px] tracking-[0.2em] uppercase"
          href="#work"
        >
          Work
        </a>
        <a className="mono py-3 text-center text-[10px] tracking-[0.2em] uppercase" href="#contact">
          Contact
        </a>
      </nav>

      <main id="top" className="pb-16 md:pb-0">
        <section className="border-b border-ink">
          <Hero />
        </section>

        <section id="about" className="grid-page border-b border-ink">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:py-28">
            <p className="mono text-center text-[11px] tracking-[0.35em] uppercase">About</p>
            <div className="mt-10 space-y-8 text-[1.65rem] leading-snug sm:text-[2rem] sm:leading-[1.25]">
              <p>
                I make products. The interesting part is the cut — what stays, what goes, and what
                a team can actually ship.
              </p>
              <p>
                Mechanical engineer from IIT Kharagpur. I still start things when the room does not
                exist yet.
              </p>
            </div>
          </div>
        </section>

        <section id="education" className="border-b border-ink">
          <div className="grid md:grid-cols-[10rem_1fr_auto]">
            <p className="mono border-b border-ink px-5 py-4 text-[11px] tracking-[0.28em] uppercase md:border-r md:border-b-0">
              Education
            </p>
            <p className="px-5 py-4 text-xl sm:text-2xl">
              Indian Institute of Technology Kharagpur
            </p>
            <p className="mono border-t border-ink px-5 py-4 text-[11px] tracking-[0.12em] uppercase md:border-t-0 md:border-l">
              B.Tech + M.Tech · Mechanical · 2017–2022
            </p>
          </div>
        </section>

        <section id="work" className="border-b border-ink">
          <div className="flex items-end justify-between border-b border-ink px-5 py-6">
            <h2 className="display text-6xl leading-none sm:text-8xl">Work</h2>
            <p className="mono text-[11px] tracking-[0.2em] uppercase">
              {String(work.length).padStart(2, "0")} pieces
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
            {work.map((item, i) => {
              const index = `${String(i).padStart(4, "0")}/${total}`;
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <p className="mono text-[10px] tracking-[0.18em] uppercase opacity-70">
                      {item.kind} · {item.year}
                    </p>
                    <p className="mono text-[10px] tracking-[0.16em] uppercase opacity-70">
                      #{index}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <h3 className="display text-4xl leading-[0.9] sm:text-5xl">{item.title}</h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed opacity-80">
                      {item.note}
                    </p>
                  </div>
                </>
              );

              const className = `flex min-h-[22rem] flex-col border-b border-ink p-6 sm:min-h-[26rem] sm:border-r ${toneClass[item.tone]} ${spanClass[item.span]}`;

              return (
                <li key={item.slug} className="contents">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${className} transition-[filter] hover:brightness-95`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={className}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section id="contact" className="min-h-[60vh] bg-ink text-paper">
          <div className="px-5 py-20 sm:py-28">
            <p className="mono text-[11px] tracking-[0.35em] uppercase opacity-60">Contact</p>
            <a
              href={LINKS.email}
              className="display mt-8 block text-[12vw] leading-[0.85] hover:text-signal sm:text-8xl"
            >
              sudeep@
              <br />
              tryclarion.ai
            </a>
            <div className="mt-16 flex flex-wrap gap-8">
              <a
                href={LINKS.linkedin}
                className="mono text-xs tracking-[0.2em] uppercase underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href={LINKS.github}
                className="mono text-xs tracking-[0.2em] uppercase underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href={LINKS.clarion}
                className="mono text-xs tracking-[0.2em] uppercase underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Clarion
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
