import { useEffect, useRef } from "react";
import humanHand from "@/assets/hand-human.png";
import robotHand from "@/assets/hand-robot.png";
import { GITHUB, socials } from "@/lib/portfolio-data";
import { SocialIcon } from "./SocialIcon";

export function Hero() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrap} id="home" className="relative h-[165svh] [--hw:74vw] md:[--hw:52vw]" style={{ ["--p" as string]: 0 }}>
      <section className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        {/* glow */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[46%] size-[min(78vw,560px)] -translate-x-1/2 -translate-y-1/2">
          <div className="glow-haze absolute inset-0 opacity-60" />
          <div className="glow-ring spin-slow absolute inset-0" />
        </div>

        {/* hands — fingertip sits at 80% (human) / 13% (robot) of image width */}
        <img
          src={humanHand}
          alt="Human hand reaching toward the centre"
          width={1536}
          height={768}
          className="pointer-events-none absolute top-[46%] z-10 w-[var(--hw)] max-w-none select-none"
          style={{
            left: "calc(42vw - 0.8 * var(--hw, 52vw))",
            transform: "translate(calc(var(--p) * -48vw), -50%)",
            opacity: "calc(1 - var(--p) * 0.6)",
          }}
        />
        <img
          src={robotHand}
          alt="Robotic hand reaching toward the centre"
          width={1536}
          height={768}
          className="pointer-events-none absolute top-[46%] z-10 w-[var(--hw)] max-w-none select-none"
          style={{
            left: "calc(58vw - 0.13 * var(--hw, 52vw))",
            transform: "translate(calc(var(--p) * 48vw), -50%)",
            opacity: "calc(1 - var(--p) * 0.6)",
          }}
        />

        <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center px-5 text-center">
          <p className="eyebrow mb-5">AI & Data Science · ML Research</p>
          <h1 className="text-[clamp(3rem,10vw,8.5rem)] font-bold leading-[0.9] [text-shadow:0_0_40px_var(--background)]">
            Saif Mansuri
          </h1>
          <p className="mt-4 text-[clamp(1.1rem,2.6vw,1.9rem)] font-medium tracking-tight [text-shadow:0_0_24px_var(--background)]">
            <span className="text-muted-foreground">Building machines that</span> learn, adapt & evolve.
          </p>

          <div className="mt-[22vh] flex flex-wrap justify-center gap-3 md:mt-[24vh]">
            <a href="#research" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-85">
              Explore Research
            </a>
            <a href="#projects" className="rounded-full border border-foreground/20 bg-background/70 px-5 py-2.5 text-sm font-medium backdrop-blur transition hover:border-foreground/50">
              View Projects
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/70 px-5 py-2.5 text-sm font-medium backdrop-blur transition hover:border-foreground/50">
              <SocialIcon id="github" /> GitHub Profile
            </a>
          </div>

          <ul className="mt-6 flex max-w-full flex-wrap justify-center gap-1.5">
            {socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target={s.id === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <SocialIcon id={s.id} className="size-3.5" />
                  <span className="hidden lg:inline">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
