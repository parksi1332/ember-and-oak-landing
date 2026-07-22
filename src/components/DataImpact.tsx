import { data } from "../data/content";
import { RevealText } from "./RevealText";
import { IG1RoastChart } from "./infographics/IG1RoastChart";
import { IG2AltitudeScale } from "./infographics/IG2AltitudeScale";
import { IG3BrewDial } from "./infographics/IG3BrewDial";
import { IG4MarketGrowth } from "./infographics/IG4MarketGrowth";
import "./DataImpact.css";

/** rev3: each IG now renders its own head icon (top-left, caption color) —
 * see 01_design_direction.md §R3-A/R3-C icon manifest (thermometer=IG-1,
 * mountain=IG-2, scale=IG-3). The old absolute-positioned dark-tile icon
 * overlay is retired along with the dark dashboard-card look. */
export function DataImpact() {
  return (
    <section id="data" className="section section--dark data-impact">
      <div className="container">
        <RevealText as="p" className="eyebrow" lines={[data.label]} />
        <RevealText as="h2" className="display" lines={[data.title]} />
        <p className="lede">{data.body}</p>

        <div className="data-impact__grid">
          <div className="data-impact__cell">
            <IG1RoastChart icon="thermometer" />
          </div>
          <div className="data-impact__cell">
            <IG2AltitudeScale icon="mountain" />
          </div>
          <div className="data-impact__cell">
            <IG3BrewDial icon="scale" />
          </div>
          <div className="data-impact__cell">
            <IG4MarketGrowth icon="droplet" />
          </div>
        </div>
      </div>
    </section>
  );
}
