import { ig4 } from "../../data/content";
import { useInView } from "../../hooks/useInView";
import { useCountUp } from "../../hooks/useCountUp";
import "./infographics.css";

/** IG-4 (01_design_direction.md §5): market growth area chart + two donuts.
 * Animation #9: scroll-in count-up, 1200ms ease-out. */
export function IG4MarketGrowth() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const fromValue = useCountUp(ig4.from.value, inView);
  const toValue = useCountUp(ig4.to.value, inView);
  const age = useCountUp(ig4.ageShare.value, inView);
  const region = useCountUp(ig4.regionShare.value, inView);

  const donut = (pct: number) => {
    const c = 2 * Math.PI * 42;
    return { strokeDasharray: `${(pct / 100) * c} ${c}` };
  };
  const ageDonut = donut(age);
  const regionDonut = donut(region);

  return (
    <div ref={ref} className="ig ig4">
      <div className="ig__head">
        <span className="tag-chip">IG-4</span>
        <h3 className="ig__title">{ig4.title}</h3>
      </div>

      <div className="ig4__chart">
        <svg viewBox="0 0 320 140" className="ig4__area-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ig4fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--roast-medium)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--roast-medium)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path
            className={`ig4__area${inView ? " is-visible" : ""}`}
            d="M0,120 C90,118 110,60 200,40 C260,26 300,18 320,10 L320,140 L0,140 Z"
            fill="url(#ig4fill)"
          />
          <path
            className={`ig4__line${inView ? " is-visible" : ""}`}
            d="M0,120 C90,118 110,60 200,40 C260,26 300,18 320,10"
            fill="none"
            stroke="var(--accent)"
            strokeWidth={3}
          />
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
        <span className="tag-chip ig4__cagr">{ig4.cagr}</span>
      </div>

      <div className="ig4__donuts">
        <div className="ig4__donut">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" className="ig4__donut-track" />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="var(--accent)"
              className="ig4__donut-value"
              style={{ strokeDasharray: ageDonut.strokeDasharray }}
            />
          </svg>
          <div className="ig4__donut-label">
            <strong>{age.toFixed(1)}%</strong>
            <span className="caption">{ig4.ageShare.label}</span>
          </div>
        </div>
        <div className="ig4__donut">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" className="ig4__donut-track" />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="var(--roast-medium)"
              className="ig4__donut-value"
              style={{ strokeDasharray: regionDonut.strokeDasharray }}
            />
          </svg>
          <div className="ig4__donut-label">
            <strong>{region.toFixed(1)}%</strong>
            <span className="caption">{ig4.regionShare.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
