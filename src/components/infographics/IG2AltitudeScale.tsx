import { ig2 } from "../../data/content";
import { useInView } from "../../hooks/useInView";
import { Icon } from "../Icon";
import "./infographics.css";

/** IG-2 (01_design_direction.md §R3-A): "core sample" altitude gauge — slim
 * SVG column 1,000→2,000m, 200m hairline ticks, optimal band as a translucent
 * inset wash (not a saturated block), 3 origin pins with categorical dots +
 * leader lines. All marks are real SVG (no div/CSS-primitive gauge). */

const W = 300;
const H = 320;
const TOP = 20;
const BOTTOM = 300;
const COL_X = 70;
const COL_W = 16;
const TICK_STEP = 200;

export function IG2AltitudeScale({ icon }: { icon?: "mountain" | "thermometer" | "scale" | "droplet" } = {}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const mapY = (v: number) => TOP + ((ig2.axisMax - v) / (ig2.axisMax - ig2.axisMin)) * (BOTTOM - TOP);

  const ticks: number[] = [];
  for (let v = ig2.axisMin; v <= ig2.axisMax; v += TICK_STEP) ticks.push(v);

  return (
    <div ref={ref} className="ig ig2">
      <div className="ig__head">
        <Icon name={icon ?? "mountain"} className="ig__head-icon" />
        <div className="ig__head-text">
          <span className="tag-chip">IG-2</span>
          <h3 className="ig__title">{ig2.title}</h3>
        </div>
      </div>

      <svg className="ig__svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${ig2.title}, 최적 재배 고도 ${ig2.bandMin}~${ig2.bandMax}m, ${ig2.pins.map((p) => `${p.name} ${p.altitude}m`).join(", ")}`}>
        {ticks.map((v) => (
          <g key={v}>
            <line x1={COL_X - 12} x2={COL_X} y1={mapY(v)} y2={mapY(v)} className="ig__axis-tick" />
            <text x={COL_X - 16} y={mapY(v) + 3.5} textAnchor="end" className="ig2__tick-label ig__mono">
              {v.toLocaleString()}m
            </text>
          </g>
        ))}

        <rect x={COL_X} y={TOP} width={COL_W} height={BOTTOM - TOP} rx={7} className="ig2__column" />
        <rect
          x={COL_X}
          y={mapY(ig2.bandMax)}
          width={COL_W}
          height={mapY(ig2.bandMin) - mapY(ig2.bandMax)}
          rx={5}
          className={`ig2__band${inView ? " is-visible" : ""}`}
        />
        {/* anchored below the band's bottom edge, clear of the pin leader
            lane above (all 3 origin pins sit within the band's upper half) */}
        <line x1={COL_X + COL_W} x2={COL_X + COL_W + 10} y1={mapY(ig2.bandMin)} y2={mapY(ig2.bandMin)} className="ig2__pin-leader" />
        <text x={COL_X + COL_W + 10} y={mapY(ig2.bandMin) + 16} className="ig2__band-label ig__mono">
          최적 {ig2.bandMin.toLocaleString()}~{ig2.bandMax.toLocaleString()}m
        </text>

        {ig2.pins.map((pin, i) => {
          const y = mapY(pin.altitude);
          return (
            <g key={pin.name} style={{ transitionDelay: `${i * 90}ms` }}>
              <line x1={COL_X + COL_W} x2={COL_X + COL_W + 26} y1={y} y2={y} className="ig2__pin-leader" />
              <circle
                cx={COL_X + COL_W / 2}
                cy={y}
                r={5}
                fill={pin.color}
                stroke="var(--ig-surface)"
                strokeWidth={2}
                className={`ig2__pin-dot${inView ? " is-visible" : ""}`}
                style={{ transitionDelay: `${i * 90}ms` }}
              />
              <text x={COL_X + COL_W + 30} y={y + 4} className="ig2__pin-name">
                {pin.name}
                <tspan className="ig2__pin-value"> · {pin.altitude.toLocaleString()}m</tspan>
              </text>
            </g>
          );
        })}
      </svg>

      <p className="ig2__caption caption">
        <Icon name="mountain" />
        {ig2.label}
      </p>
    </div>
  );
}
