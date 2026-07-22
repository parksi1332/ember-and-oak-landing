import { brew } from "../data/content";
import { RevealText } from "./RevealText";
import { Icon } from "./Icon";
import { useBrewTimer } from "../hooks/useBrewTimer";
import { useInView } from "../hooks/useInView";
import "./Brew.css";

const R = 54;
const CIRC = 2 * Math.PI * R;

function formatTime(ms: number) {
  const total = Math.round(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function Brew() {
  const { elapsedMs, running, start, pause, reset } = useBrewTimer(brew.totalSeconds);
  const media = useInView<HTMLDivElement>(0.3);

  const elapsedSec = elapsedMs / 1000;
  const activeIdx = [...brew.steps].reverse().findIndex((s) => elapsedSec >= s.atSeconds);
  const activeStep = activeIdx === -1 ? 0 : brew.steps.length - 1 - activeIdx;
  const progress = Math.min(1, elapsedSec / brew.totalSeconds);
  const done = elapsedSec >= brew.totalSeconds;

  return (
    <section id="brew" className="section brew">
      <div className="container brew__grid">
        <div className="brew__copy">
          <RevealText as="p" className="eyebrow" lines={[brew.label]} />
          <RevealText as="h2" className="display" lines={[brew.title]} />
          <p className="lede">{brew.body}</p>

          <ol className="brew__steps">
            {brew.steps.map((s, i) => (
              <li key={s.num} className={`brew__step${i === activeStep && running ? " is-active" : ""}${elapsedSec >= s.atSeconds && i < activeStep ? " is-done" : ""}`}>
                <span className="brew__step-num">{s.num}</span>
                <span className="brew__step-body">
                  <strong>{s.name}</strong>
                  <span className="caption">{s.detail}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="brew__timer">
            <svg viewBox="0 0 128 128" className="brew__dial">
              <circle cx="64" cy="64" r={R} className="brew__dial-track" />
              <circle
                cx="64"
                cy="64"
                r={R}
                className="brew__dial-progress"
                style={{ strokeDasharray: CIRC, strokeDashoffset: CIRC * (1 - progress) }}
              />
            </svg>
            <div className="brew__timer-readout">
              <Icon name="timer" />
              <span>{formatTime(elapsedMs)}</span>
            </div>
            <div className="brew__timer-controls">
              {!running && !done && (
                <button className="btn btn--primary" onClick={start}>
                  {elapsedMs > 0 ? "Resume" : "Start brewing"}
                </button>
              )}
              {running && (
                <button className="btn btn--ghost" onClick={pause}>
                  Pause
                </button>
              )}
              {(elapsedMs > 0 || done) && (
                <button className="btn btn--ghost" onClick={reset}>
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        <div ref={media.ref} className={`brew__media blend-frame reveal-fade${media.inView ? " is-visible" : ""}`}>
          <video autoPlay muted loop playsInline preload="metadata" poster="/assets/video/brew-poster.jpg">
            <source src="/assets/video/brew-pour.mp4" type="video/mp4" />
          </video>
          <span className="brew__media-tag tag-chip">
            <Icon name="droplet" /> Drip bloom
          </span>
        </div>
      </div>
    </section>
  );
}
