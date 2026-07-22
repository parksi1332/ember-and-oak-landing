import { useState } from "react";
import { nav } from "../data/content";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { Icon } from "./Icon";
import "./Nav.css";

export function Nav() {
  const { progress, scrolled } = useScrollProgress();
  const [open, setOpen] = useState(false);

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}${open ? " nav--menu-open" : ""}`}>
      <div className="nav__progress" style={{ transform: `scaleX(${progress})` }} />
      <div className="container nav__row">
        <a href="#top" className="nav__logo">
          <Icon name="coffee" className="icon--lg" />
          <span>{nav.logo}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {nav.links.map((label) => (
            <a key={label} href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}>
              {label}
            </a>
          ))}
        </nav>

        <a href="#shop" className="btn btn--primary nav__cta">
          {nav.cta}
        </a>

        <button
          className="nav__burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="nav__mobile" aria-label="Primary mobile">
          {nav.links.map((label) => (
            <a key={label} href={`#${label.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#shop" className="btn btn--primary" onClick={() => setOpen(false)}>
            {nav.cta}
          </a>
        </nav>
      )}
    </header>
  );
}
