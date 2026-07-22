import { ig1 } from "../../data/content";
import { useInView } from "../../hooks/useInView";
import { Icon } from "../Icon";
import "./infographics.css";

/** IG-1 (01_design_direction.md §R3-A): roast ledger — one SVG viewBox, shared
 * temperature axis (190~250°C), 3 rows as small multiples. Rebuilt from the
 * ground up to kill the pill-overflow bug: no HTML `left:%` pills anywhere.
 * The x-scale reserves padL (name gutter, rendered as SVG text) and padR
 * (air for the value label past the bar) so nothing can clip the tile edge —
 * x = padL + (t-axisMin)/(axisMax-axisMin)*(W-padL-padR). Value labels are
 * anchored `text-anchor:start` at the bar's own start x, so they only ever
 * grow rightward into already-reserved space. */

const W = 760;
const PAD_L = 132;
const PAD_R = 90;
const ROW_H = 84;
const TOP_PAD = 30;
const AXIS_PAD = 34;
const PLOT_L = PAD_L;
const PLOT_R = W - PAD_R;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export function IG1RoastChart({
  compact = false,
  highlightKey,
  icon,
}: {
  compact?: boolean;
  highlightKey?: string;
  icon?: "thermometer" | "flame" | "mountain" | "scale" | "droplet";
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const x = (t: number) => PLOT_L + ((t - ig1.axisMin) / (ig1.axisMax - ig1.axisMin)) * (PLOT_R - PLOT_L);
  const rows = ig1.rows.length;
  const H = TOP_PAD + rows * ROW_H + AXIS_PAD;
  const markerX = clamp(x(ig1.firstCrack), PLOT_L + 44, PLOT_R - 44);
  const axisY = TOP_PAD + rows * ROW_H + 18;

  return (
    <div ref={ref} className={`ig ig1${compact ? " ig--compact" : ""}`}>
      {!compact && (
        <div className="ig__head">
          <Icon name={icon ?? "thermometer"} className="ig__head-icon" />
          <div className="ig__head-text">
            <span className="tag-chip">IG-1</span>
            <h3 className="ig__title">{ig1.title}</h3>
          </div>
        </div>
      )}
      <svg className="ig__svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${ig1.title}, ${ig1.rows.map((r) => `${r.name} ${r.tempMin}~${r.tempMax}도`).join(", ")}`}>
        {/* first-crack marker: spans all rows, clamped so its label can never overflow the tile */}
        <line
          x1={x(ig1.firstCrack)}
          x2={x(ig1.firstCrack)}
          y1={TOP_PAD - 4}
          y2={TOP_PAD + rows * ROW_H - 4}
          className={`ig1__marker-line${inView ? " is-visible" : ""}`}
          stroke="var(--accent)"
          strokeWidth={1.5}
        />
        <text x={markerX} y={16} textAnchor="middle" className="ig1__marker-label ig__mono">
          첫 크랙 ~{ig1.firstCrack}°C
        </text>

        {ig1.rows.map((row, i) => {
          const rowTop = TOP_PAD + i * ROW_H;
          const barY = rowTop + 40;
          const barH = 12;
          const dim = highlightKey && highlightKey !== row.key;
          return (
            <g key={row.key} className={`ig1__row${dim ? " ig1__row--dim" : ""}`}>
              <circle cx={16} cy={rowTop + 8} r={5} fill={row.color} />
              <text x={28} y={rowTop + 13} className="ig1__name-label ig__name-text">
                {row.name}
              </text>
              <text x={28} y={rowTop + 29} className="ig1__meta-label ig__caption-text">
                {row.time} · {row.tag}
              </text>
              <rect
                x={x(row.tempMin)}
                y={barY}
                width={Math.max(2, x(row.tempMax) - x(row.tempMin))}
                height={barH}
                rx={4}
                fill={row.color}
                className={`ig1__bar${inView ? " is-visible" : ""}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              />
              <text x={x(row.tempMin)} y={barY - 6} textAnchor="start" className="ig1__value-label ig__mono">
                {row.tempMin}~{row.tempMax}°C
              </text>
            </g>
          );
        })}

        <line x1={PLOT_L} x2={PLOT_R} y1={axisY - 12} y2={axisY - 12} className="ig__axis-line" />
        <text x={PLOT_L} y={axisY} textAnchor="start" className="ig1__axis-label ig__mono">
          {ig1.axisMin}°C
        </text>
        <text x={PLOT_R} y={axisY} textAnchor="end" className="ig1__axis-label ig__mono">
          {ig1.axisMax}°C
        </text>
      </svg>
    </div>
  );
}
