import { useState } from "react";
import { Menu, X } from "lucide-react";

const items = [
  ["Home", "#home"], ["Research", "#research"], ["Projects", "#projects"], ["Interests", "#interests"],
  ["About", "#about"], ["Technical Stack", "#stack"], ["Publications", "#publications"], ["Contact", "#contact"],
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-background/75 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold" aria-label="Saif Mansuri, home">
          <span className="grid size-7 place-items-center rounded-full bg-primary text-[11px] text-primary-foreground">SM</span>
          <span className="hidden sm:inline">Saif Mansuri</span>
        </a>
        <ul className="hidden gap-5 text-sm text-muted-foreground lg:flex">
          {items.map(([l, h]) => (
            <li key={h}><a href={h} className="hover:text-foreground">{l}</a></li>
          ))}
        </ul>
        <button className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>
      {open && (
        <ul className="border-t bg-background px-5 py-3 lg:hidden">
          {items.map(([l, h]) => (
            <li key={h}><a href={h} onClick={() => setOpen(false)} className="block py-2">{l}</a></li>
          ))}
        </ul>
      )}
    </header>
  );
}
