import { ig3 } from "../../data/content";
import { useInView } from "../../hooks/useInView";
import "./infographics.css";

/** IG-3 (01_design_direction.md §5): golden-ratio brewing dial. Center 1:16,
 * arc = water temp zones (under/optimal/over), TDS chip. */
export function IG3BrewDial() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const span = ig3.gaugeMax - ig3.gaugeMin;
  const deg = (v: number) => ((v - ig3.gaugeMin) / span) * 360;
  const underEnd = deg(ig3.tempMin);
  const optimalEnd = deg(ig3.tempMax);

  return (
    <div ref={ref} className="ig ig3">
      <div className="ig__head">
        <span className="tag-chip">IG-3</span>
        <h3 className="ig__title">The golden ratio</h3>
      </div>
      <div
        className={`ig3__dial${inView ? " is-visible" : ""}`}
        style={{
          ["--under-end" as string]: `${underEnd}deg`,
          ["--optimal-end" as string]: `${optimalEnd}deg`,
        }}
      >
        <div className="ig3__center">
          <span className="ig3__ratio">{ig3.ratio}</span>
          <span className="caption">coffee : water</span>
        </div>
        <span className="ig3__deg-label ig3__deg-label--start">{ig3.gaugeMin}°C</span>
        <span className="ig3__deg-label ig3__deg-label--end">{ig3.gaugeMax}°C</span>
      </div>
      <div className="ig3__legend">
        <span><i className="ig3__swatch" style={{ background: "var(--brew-under)" }} /> 과소추출 &lt;{ig3.tempMin}°C</span>
        <span><i className="ig3__swatch" style={{ background: "var(--brew-optimal)" }} /> 최적 추출대 {ig3.tempMin}~{ig3.tempMax}°C</span>
        <span><i className="ig3__swatch" style={{ background: "var(--brew-over)" }} /> 과다추출 &gt;{ig3.tempMax}°C</span>
      </div>
      <span className="tag-chip ig3__tds">{ig3.tds}</span>
    </div>
  );
}
