import { ig3 } from "../../data/content";
import { useInView } from "../../hooks/useInView";
import { Icon } from "../Icon";
import "./infographics.css";

/** IG-3 (01_design_direction.md §R3-A): "paper brass gauge" — 270° open dial
 * (90° gap at the bottom), reserved status colors for under/optimal/over,
 * center ratio in IBM Plex Mono (not a display serif — dataviz: no
 * serif/display on hero figures). 0deg = 3 o'clock, clockwise positive. */

const CX = 120;
const CY = 120;
const R = 92;
const START_ANGLE = 135; // bottom-left, gap starts here going backwards
const SWEEP = 270; // total arc sweep, leaves a 90deg gap centered at the bottom

function angleFor(t: number) {
  return START_ANGLE + ((t - ig3.gaugeMin) / (ig3.gaugeMax - ig3.gaugeMin)) * SWEEP;
}
function point(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}
function arcPath(startDeg: number, endDeg: number, r: number) {
  const s = point(startDeg, r);
  const e = point(endDeg, r);
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

const TICKS = [88, ig3.tempMin, ig3.tempMax, ig3.gaugeMax];

export function IG3BrewDial({ icon }: { icon?: "scale" | "thermometer" | "droplet" | "mountain" } = {}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const needleAngle = angleFor((ig3.tempMin + ig3.tempMax) / 2);
  // Indicator sits on the arc ring itself (not a center-pivot needle) so it
  // never crosses behind the "1:16" mono ratio in the middle of the dial.
  const needleInner = point(needleAngle, R - 22);
  const needleTip = point(needleAngle, R + 16);

  return (
    <div ref={ref} className="ig ig3">
      <div className="ig__head">
        <Icon name={icon ?? "scale"} className="ig__head-icon" />
        <div className="ig__head-text">
          <span className="tag-chip">IG-3</span>
          <h3 className="ig__title">{ig3.title}</h3>
        </div>
      </div>

      <div className="ig3__body">
        <div className="ig3__dial-wrap">
          <svg className={`ig3__dial-svg${inView ? " is-visible" : ""}`} viewBox="0 0 240 240" role="img" aria-label={`${ig3.title}, 비율 ${ig3.ratio}, 최적 추출 온도 ${ig3.tempMin}~${ig3.tempMax}도`}>
            <path d={arcPath(START_ANGLE, START_ANGLE + SWEEP, R)} className="ig3__track" strokeWidth={10} />
            <path d={arcPath(START_ANGLE, angleFor(ig3.tempMin), R)} className="ig3__arc ig3__arc--under" strokeWidth={10} />
            <path d={arcPath(angleFor(ig3.tempMin), angleFor(ig3.tempMax), R)} className="ig3__arc ig3__arc--optimal" strokeWidth={16} />
            <path d={arcPath(angleFor(ig3.tempMax), START_ANGLE + SWEEP, R)} className="ig3__arc ig3__arc--over" strokeWidth={10} />

            {TICKS.map((v) => {
              const a = angleFor(v);
              const inner = point(a, R + 6);
              const outer = point(a, R + 14);
              const lbl = point(a, R + 26);
              return (
                <g key={v}>
                  <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} className="ig3__tick-line" />
                  <text x={lbl.x} y={lbl.y + 3} textAnchor="middle" className="ig3__tick-label ig__mono">
                    {v}°
                  </text>
                </g>
              );
            })}

            <line x1={needleInner.x} y1={needleInner.y} x2={needleTip.x} y2={needleTip.y} className="ig3__needle" />
            <circle cx={needleTip.x} cy={needleTip.y} r={3.5} className="ig3__needle-cap" />
          </svg>

          <div className="ig3__center">
            <span className="ig3__ratio">{ig3.ratio}</span>
            <span className="caption">{ig3.unit}</span>
          </div>
        </div>

        <div className="ig3__legend">
          <span>
            <i className="ig3__swatch" style={{ background: "var(--brew-under)" }} /> {ig3.under}
            <span className="ig__mono">&lt;{ig3.tempMin}°C</span>
          </span>
          <span>
            <i className="ig3__swatch" style={{ background: "var(--brew-optimal)" }} /> {ig3.optimal}
            <span className="ig__mono">{ig3.tempMin}~{ig3.tempMax}°C</span>
          </span>
          <span>
            <i className="ig3__swatch" style={{ background: "var(--brew-over)" }} /> {ig3.over}
            <span className="ig__mono">&gt;{ig3.tempMax}°C</span>
          </span>
        </div>
        <span className="tag-chip ig3__tds">{ig3.tds}</span>
      </div>
    </div>
  );
}
