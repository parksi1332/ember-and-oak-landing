import { useRef, useState } from "react";
import { roast } from "../data/content";
import { RevealText } from "./RevealText";
import { RoastCursor } from "./RoastCursor";
import { IG1RoastChart } from "./infographics/IG1RoastChart";
import "./Roast.css";

/**
 * Animation #2 (C1-specified) + #8 (01_design_direction.md §6): roast-level
 * slider crossfades bean imagery, swaps temp/time/notes labels, morphs the
 * roast name's Fraunces variable weight 340 -> 720, and drives a spring-tracked
 * temperature-readout cursor.
 */
export function Roast() {
  const [step, setStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const level = roast.levels[step];

  return (
    <section id="roast" className="section roast">
      <div className="container">
        <RevealText as="p" className="eyebrow" lines={[roast.label]} />
        <RevealText as="h2" className="display roast__title" lines={[roast.title]} />
        <p className="lede">{roast.body}</p>

        <div className="roast__panel" ref={sectionRef}>
          <RoastCursor containerRef={sectionRef} label={level.temp} />

          <div className="roast__visual blend-frame">
            {roast.levels.map((l, i) => (
              <img
                key={l.key}
                src={l.image}
                alt={`${l.name} roast beans, ${l.temp}`}
                className={`roast__visual-img${i === step ? " is-active" : ""}`}
                width={1200}
                height={900}
              />
            ))}
            <div className="roast__readout">
              <span className="roast__readout-temp">{level.temp}</span>
              <span className="roast__readout-time caption">{level.time}</span>
            </div>
          </div>

          <div className="roast__controls">
            <h3
              className="roast__name"
              style={{ color: level.color, fontVariationSettings: `"wght" ${level.weight}` }}
            >
              {level.name}
            </h3>
            <p className="roast__notes caption">{level.notes}</p>

            <input
              type="range"
              min={0}
              max={2}
              step={1}
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              className="roast__slider"
              style={{ ["--roast-color" as string]: level.color }}
              aria-label="Roast level"
            />
            <div className="roast__slider-ticks">
              {roast.levels.map((l) => (
                <span key={l.key}>{l.name}</span>
              ))}
            </div>

            <IG1RoastChart compact highlightKey={level.key} />
          </div>
        </div>
      </div>
    </section>
  );
}
