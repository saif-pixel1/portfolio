import { useState } from "react";

const nodes = [
  { id: "stream", label: "Streaming ML", x: 50, y: 18, text: "Learning from data that arrives continuously, one sample or mini-batch at a time — the setting all of my main research sits in." },
  { id: "drift", label: "Concept drift", x: 80, y: 32, text: "When the distribution behind a stream changes. Links streaming ML to continual learning: a model must notice the shift and adapt." },
  { id: "frac", label: "Fractional calculus", x: 18, y: 34, text: "Fractional derivatives weight a function's history. In my optimization work this motivates gradient updates that remember past gradients." },
  { id: "opt", label: "Optimization", x: 30, y: 62, text: "How parameters move. Connects to fractional calculus through gradient-history updates, and to neural networks through backprop." },
  { id: "cont", label: "Continual learning", x: 72, y: 64, text: "Adapting to new data without forgetting the old — the core question behind HELIX / NEUROGENISIS and replay-based retention." },
  { id: "ens", label: "Ensemble learning", x: 88, y: 84, text: "Combining several learners through a meta-model; another route to robustness when single models fail under change." },
  { id: "nn", label: "Neural networks", x: 48, y: 84, text: "The models being optimized. My MicroGrad build implements their gradient machinery from scratch." },
  { id: "bio", label: "Biological development", x: 88, y: 50, text: "A loose source of inspiration for HELIX's design — used as metaphor and motivation, not a claim of biological fidelity." },
  { id: "mine", label: "Data mining", x: 12, y: 84, text: "Extracting structure from raw data, as in the Twitter text-mining project; the practical ground under the theory." },
];
const edges: [string, string][] = [
  ["stream", "drift"], ["stream", "frac"], ["frac", "opt"], ["opt", "nn"], ["drift", "cont"], ["cont", "bio"],
  ["cont", "ens"], ["drift", "ens"], ["stream", "opt"], ["mine", "nn"], ["mine", "opt"], ["cont", "nn"],
];

export function ResearchMap() {
  const [sel, setSel] = useState("stream");
  const active = nodes.find((n) => n.id === sel)!;
  const linked = new Set(edges.filter((e) => e.includes(sel)).flat());
  const pos = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-card">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
          {edges.map(([a, b]) => {
            const on = a === sel || b === sel;
            return (
              <line key={a + b} x1={pos(a).x} y1={pos(a).y} x2={pos(b).x} y2={pos(b).y}
                stroke={on ? "var(--accent)" : "var(--border)"} strokeWidth={on ? 0.6 : 0.35} vectorEffect="non-scaling-stroke"
                style={{ strokeWidth: on ? 1.6 : 1, transition: "stroke .3s" }} />
            );
          })}
        </svg>
        {nodes.map((n) => (
          <button
            key={n.id}
            onClick={() => setSel(n.id)}
            aria-pressed={sel === n.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] transition sm:text-xs ${
              sel === n.id
                ? "border-accent bg-accent text-accent-foreground"
                : linked.has(n.id)
                  ? "border-accent/60 bg-card text-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
            }`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            {n.label}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        <p className="eyebrow">Selected topic</p>
        <h3 className="mt-2 text-3xl font-semibold">{active.label}</h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">{active.text}</p>
        <p className="mt-6 eyebrow">Connected to</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {[...linked].filter((i) => i !== sel).map((i) => (
            <li key={i}>
              <button onClick={() => setSel(i)} className="rounded-full bg-secondary px-3 py-1 text-sm hover:bg-border">
                {pos(i).label}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs text-muted-foreground">
          An interactive sketch of how my interests relate — not a measured map of the field.
        </p>
      </div>
    </div>
  );
}
