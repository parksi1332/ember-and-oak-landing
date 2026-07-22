import { useEffect, useRef, useState } from "react";
import { roast } from "../data/content";
import { RevealText } from "./RevealText";
import { RoastCursor } from "./RoastCursor";
import { IG1RoastChart } from "./infographics/IG1RoastChart";
import "./Roast.css";

/**
 * Animation #2 (C1-specified) + #8 (01_design_direction.md §R3-B rev3): roast-level
 * slider crossfades bean imagery, swaps temp/time/notes labels, and steps the
 * roast name (rendered in Chusa Love) through its 2 discrete weights — Regular
 * 400 for Light/Medium, Bold 700 for Dark — with a 130ms ink-bleed crossfade
 * (opacity dip + soft blur) at the swap, approximating brush ink bleeding as
 * the weight snaps (Chusa isn't a variable font, so weight can't interpolate
 * continuously) — and drives a spring-tracked temperature-readout cursor.
 */
export function Roast() {
  const [step, setStep] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const level = roast.levels[step];

  useEffect(() => {
    setSwapping(true);
    const t = setTimeout(() => setSwapping(false), 130);
    return () => clearTimeout(t);
  }, [step]);

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
                alt={`${l.name} 로스트 원두, ${l.temp}`}
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
              className={`roast__name${swapping ? " is-swapping" : ""}`}
              style={{ color: level.color, fontWeight: level.weight }}
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
              aria-label="로스트 레벨"
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
