import { ig2 } from "../../data/content";
import { useInView } from "../../hooks/useInView";
import "./infographics.css";

/** IG-2 (01_design_direction.md §5): vertical altitude gauge, 1,000 -> 2,000m,
 * optimal band 1,200~1,800m highlighted, 3 origin pins. */
export function IG2AltitudeScale() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  // 0% = axisMax (top), 100% = axisMin (bottom) — altitude rises upward.
  const pctFromTop = (v: number) => ((ig2.axisMax - v) / (ig2.axisMax - ig2.axisMin)) * 100;

  return (
    <div ref={ref} className="ig ig2">
      <div className="ig__head">
        <span className="tag-chip">IG-2</span>
        <h3 className="ig__title">Grown thin on the air</h3>
      </div>
      <div className="ig2__body">
        <div className="ig2__gauge">
          <span
            className={`ig2__band${inView ? " is-visible" : ""}`}
            style={{
              top: `${pctFromTop(ig2.bandMax)}%`,
              height: `${pctFromTop(ig2.bandMin) - pctFromTop(ig2.bandMax)}%`,
            }}
          />
          <span className="ig2__band-label" style={{ top: `${pctFromTop(ig2.bandMax)}%` }}>
            {ig2.bandMin.toLocaleString()}~{ig2.bandMax.toLocaleString()}m
          </span>
          {ig2.pins.map((pin, i) => (
            <span
              key={pin.name}
              className={`ig2__pin${inView ? " is-visible" : ""}`}
              style={{ top: `${pctFromTop(pin.altitude)}%`, transitionDelay: `${i * 90}ms` }}
            >
              <span className="ig2__pin-dot" style={{ background: pin.color }} />
              <span className="ig2__pin-label">
                {pin.name} · {pin.altitude.toLocaleString()}m
              </span>
            </span>
          ))}
          <span className="ig2__axis-top">{ig2.axisMax.toLocaleString()}m</span>
          <span className="ig2__axis-bottom">{ig2.axisMin.toLocaleString()}m</span>
        </div>
        <p className="ig2__caption caption">{ig2.label}</p>
      </div>
    </div>
  );
}
