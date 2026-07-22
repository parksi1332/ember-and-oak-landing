import { useState } from "react";
import { origins } from "../data/content";
import { RevealText } from "./RevealText";
import { Icon } from "./Icon";
import "./Origins.css";

/**
 * Animation #3 (C1-specified, 01_design_direction.md §6): origin card hover
 * drops a map pin + reveals flavor notes; card image scales 1 -> 1.04.
 * Pin: 350ms cubic-bezier(0.34,1.56,0.64,1) overshoot. Notes: 200ms.
 */
export function Origins() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="origins" className="section origins">
      <div className="container">
        <RevealText as="p" className="eyebrow" lines={[origins.label]} />
        <RevealText as="h2" className="display origins__title" lines={[origins.title]} />
        <p className="lede">{origins.body}</p>

        <div className="origins__grid">
          <ul className="origins__list">
            {origins.cards.map((card, i) => (
              <li key={card.country}>
                <button
                  className={`origins__card${active === i ? " is-active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onMouseLeave={() => setActive((v) => (v === i ? null : v))}
                  onBlur={() => setActive((v) => (v === i ? null : v))}
                  style={{ ["--card-accent" as string]: card.accent }}
                >
                  <span className="origins__card-media blend-frame">
                    <img src={card.image} alt={card.imageAlt} width={480} height={320} />
                  </span>
                  <span className="origins__card-body">
                    <span className="origins__card-heading">
                      <Icon name="mountain" />
                      <strong>
                        {card.country} — {card.region}
                      </strong>
                      <span className="tag-chip">{card.altitude}</span>
                    </span>
                    <span className="origins__card-notes">
                      <Icon name="leaf" />
                      노트: {card.notes}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="origins__map" aria-hidden="true">
            <svg viewBox="0 0 400 240" className="origins__map-svg">
              <defs>
                <linearGradient id="belt" x1="0%" y1="30%" x2="100%" y2="70%">
                  <stop offset="0%" stopColor="var(--roast-light)" stopOpacity="0.28" />
                  <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="var(--roast-medium)" stopOpacity="0.28" />
                </linearGradient>
              </defs>
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={`h${i}`} x1={0} x2={400} y1={i * 20} y2={i * 20} className="origins__graticule" />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 20} x2={i * 20} y1={0} y2={240} className="origins__graticule" />
              ))}
              <path d="M0,150 Q200,90 400,140 L400,180 Q200,130 0,190 Z" fill="url(#belt)" />
              <text x="200" y="215" textAnchor="middle" className="origins__map-caption">
                {origins.mapCaption}
              </text>
            </svg>

            {origins.cards.map((card, i) => (
              <div
                key={card.country}
                className={`origins__pin${active === i ? " is-dropped" : ""}`}
                style={{ top: card.pin.top, left: card.pin.left, ["--card-accent" as string]: card.accent }}
              >
                <span className="origins__pin-dot">
                  <Icon name="map-pin" />
                </span>
                <span className="origins__pin-note">
                  <strong>{card.region}</strong>
                  <span>{card.notes}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
