import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Hero } from "@/components/portfolio/Hero";
import { Nav } from "@/components/portfolio/Nav";
import { ResearchMap } from "@/components/portfolio/ResearchMap";
import { SocialIcon } from "@/components/portfolio/SocialIcon";
import { EMAIL, GITHUB, interests, research, secondary, socials, stack, type Link } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saif Mansuri — Machine Learning Research Portfolio" },
      { name: "description", content: "Saif Mansuri, AI & Data Science undergraduate researching streaming ML, concept drift, fractional optimization and continual learning." },
      { property: "og:title", content: "Saif Mansuri — Machine Learning Research" },
      { property: "og:description", content: "Research on adaptive learning, concept drift, fractional-calculus optimization and ensembles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl text-4xl font-semibold md:text-5xl">{title}</h2>
      <div className="mt-12">{children}</div>
    </section>
  );
}

function LinkRow({ links }: { links: Link[] }) {
  if (!links.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a key={l.href} href={l.href} {...ext} className="inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-sm transition hover:border-foreground">
          {l.label} <ArrowUpRight className="size-3.5" />
        </a>
      ))}
    </div>
  );
}

function DriftVisual() {
  // two shifting distributions — a sketch of concept drift
  const curve = (mu: number) =>
    Array.from({ length: 41 }, (_, i) => {
      const x = i * 5;
      const y = 70 - 55 * Math.exp(-((x - mu) ** 2) / 500);
      return `${i ? "L" : "M"}${x},${y.toFixed(1)}`;
    }).join(" ");
  return (
    <svg viewBox="0 0 200 75" className="h-24 w-full" aria-hidden>
      <path d={curve(70)} fill="none" stroke="var(--glow-violet)" strokeWidth="1.5" />
      <path d={curve(125)} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="0" y1="70" x2="200" y2="70" stroke="var(--border)" />
    </svg>
  );
}

function FracVisual() {
  const ws = Array.from({ length: 14 }, (_, k) => Math.pow(k + 1, -0.6));
  return (
    <svg viewBox="0 0 200 75" className="h-24 w-full" aria-hidden>
      {ws.map((w, k) => (
        <rect key={k} x={190 - k * 14} y={70 - w * 60} width="9" height={w * 60} rx="1.5" fill="var(--glow-peach)" opacity={0.4 + w * 0.6} />
      ))}
      <line x1="0" y1="70" x2="200" y2="70" stroke="var(--border)" />
    </svg>
  );
}

function EnsembleVisual() {
  return (
    <svg viewBox="0 0 200 75" className="h-24 w-full" aria-hidden>
      {[15, 37, 59].map((y) => (
        <g key={y}>
          <circle cx="30" cy={y} r="6" fill="none" stroke="var(--foreground)" />
          <line x1="36" y1={y} x2="144" y2="37" stroke="var(--border)" />
        </g>
      ))}
      <rect x="144" y="27" width="30" height="20" rx="4" fill="var(--accent)" />
    </svg>
  );
}

function Index() {
  const [openProj, setOpenProj] = useState<string | null>(null);
  const visuals = [FracVisual, DriftVisual, EnsembleVisual];

  return (
    <>
      <Nav />
      <main>
        <Hero />

        <Section id="research" eyebrow="01 — Research & publications" title="Technical investigations into learning under change.">
          <ol className="divide-y border-y">
            {research.map((r) => (
              <li key={r.no} className="grid gap-6 py-10 md:grid-cols-[5rem_1fr]">
                <span className="font-mono text-sm text-muted-foreground">{r.no}</span>
                <article>
                  <p className="eyebrow">{r.status}</p>
                  <h3 className="mt-2 text-2xl font-semibold md:text-3xl">
                    {r.links[0] ? <a href={r.links[0].href} {...ext} className="hover:underline">{r.title}</a> : r.title}
                  </h3>
                  <div className="mt-6 grid gap-6 text-[15px] leading-relaxed md:grid-cols-3">
                    <div><p className="eyebrow mb-2">Problem</p><p>{r.question}</p></div>
                    <div><p className="eyebrow mb-2">Summary</p><p className="text-muted-foreground">{r.summary}</p></div>
                    <div><p className="eyebrow mb-2">Method</p><p className="text-muted-foreground">{r.method}</p></div>
                  </div>
                  <div className="mt-6"><LinkRow links={r.links} /></div>
                </article>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" eyebrow="02 — Projects" title="Featured research projects.">
          <div className="grid gap-5 md:grid-cols-3">
            {[research[1]!, research[0]!, research[2]!].map((r) => {
              const V = visuals[research.indexOf(r!)]!;
              return (
                <article key={r.no} className="flex flex-col rounded-xl border bg-card p-6">
                  <V />
                  <p className="eyebrow mt-4">{r.status}</p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug">{r.title.split(" for ")[0]}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{r.question}</p>
                  <div className="mt-5"><LinkRow links={r.links.slice(0, 2)} /></div>
                </article>
              );
            })}
          </div>

          <h3 className="mt-20 text-2xl font-semibold">Other technical projects</h3>
          <ul className="mt-6 divide-y border-y">
            {secondary.map((p) => {
              const open = openProj === p.name;
              return (
                <li key={p.name}>
                  <button
                    onClick={() => setOpenProj(open ? null : p.name)}
                    aria-expanded={open}
                    className="grid w-full grid-cols-[1fr_auto] items-center gap-4 py-5 text-left md:grid-cols-[2fr_1fr_8rem_auto]"
                  >
                    <span>
                      <span className="block font-medium">{p.name}</span>
                      <span className="text-sm text-muted-foreground">{p.desc}</span>
                    </span>
                    <span className="eyebrow hidden md:block">{p.category}</span>
                    <span className="hidden font-mono text-xs md:block">{p.status}</span>
                    <ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <div className="grid gap-4 pb-6 md:grid-cols-[2fr_1fr]">
                      <p className="text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
                      <div className="space-y-3">
                        <p className="font-mono text-xs">{p.tech.join(" · ")} — {p.status}</p>
                        <LinkRow links={p.links} />
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Section>

        <Section id="interests" eyebrow="03 — Research interests" title="Questions I keep returning to.">
          <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {interests.map((i) => (
              <div key={i.t} className="bg-background p-6">
                <p className={`font-mono text-[10px] uppercase tracking-widest ${i.state === "Active work" ? "text-accent" : "text-muted-foreground"}`}>{i.state}</p>
                <h3 className="mt-3 text-lg font-semibold">{i.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{i.q}</p>
              </div>
            ))}
          </div>
          <div className="mt-16"><ResearchMap /></div>
        </Section>

        <Section id="about" eyebrow="04 — About" title="Understanding models beyond the API.">
          <div className="grid gap-8 text-lg leading-relaxed md:grid-cols-2">
            <p>
              I'm an AI and Data Science undergraduate. What interests me is how machine-learning systems actually learn — how
              they respond when the data underneath them changes, and what it takes for them to keep what they already know.
            </p>
            <p className="text-muted-foreground">
              I like working from the mathematics to the implementation: deriving an update rule, writing it myself, and running
              experiments that someone else could reproduce. I'm building toward AI engineering and research, one carefully
              tested idea at a time.
            </p>
          </div>
        </Section>

        <Section id="stack" eyebrow="05 — Technical stack" title="Tools I work with.">
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((s) => (
              <div key={s.group}>
                <dt className="eyebrow border-b pb-2">{s.group}</dt>
                <dd className="mt-3 flex flex-wrap gap-1.5">
                  {s.items.map((t) => <span key={t} className="rounded bg-secondary px-2 py-1 text-sm">{t}</span>)}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="publications" eyebrow="06 — Publications & developer presence" title="Where the work lives.">
          <ul className="space-y-3">
            {research.filter((r) => r.links.length).map((r) => (
              <li key={r.no}>
                <a href={r.links[0]!.href} {...ext} className="group flex items-start justify-between gap-4 border-b pb-3">
                  <span className="font-medium group-hover:underline">{r.title}</span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">{r.status.split(" · ")[1]}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {socials.filter((s) => ["github", "leetcode", "codeforces", "linkedin"].includes(s.id)).map((s) => (
              <a key={s.id} href={s.href} {...ext} className="flex items-center justify-between rounded-xl border bg-card p-5 transition hover:border-foreground">
                <span className="flex items-center gap-3"><SocialIcon id={s.id} className="size-5" />{s.label}</span>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </Section>
      </main>

      <footer id="contact" className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <p className="font-mono text-xs uppercase tracking-widest opacity-60">07 — Contact</p>
          <h2 className="mt-4 text-4xl font-semibold md:text-6xl">Let's talk about learning systems.</h2>
          <a href={`mailto:${EMAIL}`} className="mt-6 inline-block text-xl underline decoration-1 underline-offset-4 md:text-2xl">{EMAIL}</a>
          <ul className="mt-12 flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.id}>
                <a href={s.href} target={s.id === "email" ? undefined : "_blank"} rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-ink-foreground/20 px-4 py-2 text-sm hover:border-ink-foreground">
                  <SocialIcon id={s.id} className="size-4" /> {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-16 text-xs opacity-50">© {new Date().getFullYear()} Saif Mansuri · Source on <a href={GITHUB} {...ext} className="underline">GitHub</a></p>
        </div>
      </footer>
    </>
  );
}
