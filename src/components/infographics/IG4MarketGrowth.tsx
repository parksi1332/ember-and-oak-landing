import { ig4 } from "../../data/content";
import { useInView } from "../../hooks/useInView";
import { useCountUp } from "../../hooks/useCountUp";
import { Icon } from "../Icon";
import "./infographics.css";

/** IG-4 (01_design_direction.md §R3-A): market growth ledger — area+line chart
 * with mono endpoint labels, a leader-lined CAGR callout (not a floating
 * badge), and two stat tiles replacing the retired near-value donuts
 * (dataviz anti-pattern: two-slice donuts reading nearly identical values). */

export function IG4MarketGrowth({ icon }: { icon?: "droplet" | "flame" | "scale" | "mountain" } = {}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const fromValue = useCountUp(ig4.from.value, inView);
  const toValue = useCountUp(ig4.to.value, inView);
  const age = useCountUp(ig4.ageShare.value, inView);
  const region = useCountUp(ig4.regionShare.value, inView);

  return (
    <div ref={ref} className="ig ig4">
      <div className="ig__head">
        <Icon name={icon ?? "droplet"} className="ig__head-icon" />
        <div className="ig__head-text">
          <span className="tag-chip">IG-4</span>
          <h3 className="ig__title">{ig4.title}</h3>
        </div>
      </div>

      <div className="ig4__chart">
        <svg viewBox="0 0 320 150" className="ig4__area-svg" preserveAspectRatio="none" role="img" aria-label={`${ig4.title}, ${ig4.from.year}년 $${ig4.from.value}B에서 ${ig4.to.year}년 $${ig4.to.value}B로, ${ig4.cagr}`}>
          <defs>
            <linearGradient id="ig4fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--roast-medium)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--roast-medium)" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {[0, 50, 100, 150].map((y, i) => (
            <g key={y}>
              <line x1={0} x2={320} y1={y} y2={y} className="ig4__gridline" />
              <text x={2} y={y - 3} className="ig4__grid-label ig__mono">
                ${(300 - i * 100)}B
              </text>
            </g>
          ))}

          <path
            className={`ig4__area${inView ? " is-visible" : ""}`}
            d="M0,120 C90,118 110,60 200,40 C260,26 300,18 320,10 L320,150 L0,150 Z"
            fill="url(#ig4fill)"
          />
          <path
            className={`ig4__line${inView ? " is-visible" : ""}`}
            d="M0,120 C90,118 110,60 200,40 C260,26 300,18 320,10"
            fill="none"
            stroke="var(--roast-medium)"
            strokeWidth={2.5}
          />
          <circle cx={0} cy={120} r={5} fill="var(--roast-medium)" stroke="var(--ig-surface)" strokeWidth={2} className={`ig4__endpoint${inView ? " is-visible" : ""}`} />
          <circle cx={320} cy={10} r={5} fill="var(--roast-medium)" stroke="var(--ig-surface)" strokeWidth={2} className={`ig4__endpoint${inView ? " is-visible" : ""}`} />

          <line x1={150} y1={53} x2={150} y2={30} className="ig4__leader-line" />
          <line x1={150} y1={30} x2={196} y2={30} className="ig4__leader-line" />
          <text x={200} y={33} className="ig4__cagr-label">{ig4.cagr}</text>
        </svg>
        <div className="ig4__chart-labels">
          <div className="ig4__point ig4__point--from">
            <span className="ig4__point-year">{ig4.from.year}</span>
            <span className="ig4__point-value">${fromValue.toFixed(1)}B</span>
          </div>
          <div className="ig4__point ig4__point--to">
            <span className="ig4__point-year">{ig4.to.year}</span>
            <span className="ig4__point-value">${toValue.toFixed(2)}B</span>
          </div>
        </div>
      </div>

      <div className="ig4__stats">
        <div className="ig4__stat">
          <span className="ig4__stat-value">{age.toFixed(1)}%</span>
          <span className="ig4__stat-label">{ig4.ageShare.label}</span>
        </div>
        <div className="ig4__stat">
          <span className="ig4__stat-value">{region.toFixed(1)}%</span>
          <span className="ig4__stat-label">{ig4.regionShare.label}</span>
        </div>
      </div>
    </div>
  );
}
