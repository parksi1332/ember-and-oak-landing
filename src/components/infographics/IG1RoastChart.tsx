import { ig1 } from "../../data/content";
import { useInView } from "../../hooks/useInView";
import "./infographics.css";

/** IG-1 (01_design_direction.md §5): roast-level 3-way comparison, horizontal
 * temperature track 190~250°C with a First Crack ~200°C marker. Value labels
 * always shown; ranges use `~` (C1 convention). */
export function IG1RoastChart({ compact = false, highlightKey }: { compact?: boolean; highlightKey?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const pct = (v: number) => ((v - ig1.axisMin) / (ig1.axisMax - ig1.axisMin)) * 100;

  return (
    <div ref={ref} className={`ig ig1${compact ? " ig--compact" : ""}`}>
      {!compact && (
        <div className="ig__head">
          <span className="tag-chip">IG-1</span>
          <h3 className="ig__title">Roast level, three ways</h3>
        </div>
      )}
      <div className="ig1__marker-label" style={{ left: `${pct(ig1.firstCrack)}%` }}>
        First Crack ~{ig1.firstCrack}°C
      </div>
      <div className="ig1__rows">
        {ig1.rows.map((row, i) => {
          const dim = highlightKey && highlightKey !== row.name.toLowerCase();
          return (
            <div className={`ig1__row${dim ? " is-dim" : ""}`} key={row.name}>
              <span className="ig1__row-label">{row.name}</span>
              <span className="ig1__track">
                <span
                  className={`ig1__marker-line${inView ? " is-visible" : ""}`}
                  style={{ left: `${pct(ig1.firstCrack)}%` }}
                />
                <span
                  className={`ig1__bar${inView ? " is-visible" : ""}`}
                  style={{
                    left: `${pct(row.tempMin)}%`,
                    width: `${pct(row.tempMax) - pct(row.tempMin)}%`,
                    background: row.color,
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <span className="ig1__bar-label">
                    {row.tempMin}~{row.tempMax}°C
                  </span>
                </span>
              </span>
              <span className="ig1__meta">
                <span className="tag-chip">{row.time}</span>
                <span className="caption">{row.tag}</span>
              </span>
            </div>
          );
        })}
      </div>
      <div className="ig1__axis">
        <span>{ig1.axisMin}°C</span>
        <span>{ig1.axisMax}°C</span>
      </div>
    </div>
  );
}
