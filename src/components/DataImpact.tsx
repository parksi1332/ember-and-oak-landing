import { data } from "../data/content";
import { RevealText } from "./RevealText";
import { Icon } from "./Icon";
import { IG1RoastChart } from "./infographics/IG1RoastChart";
import { IG2AltitudeScale } from "./infographics/IG2AltitudeScale";
import { IG3BrewDial } from "./infographics/IG3BrewDial";
import { IG4MarketGrowth } from "./infographics/IG4MarketGrowth";
import "./DataImpact.css";

export function DataImpact() {
  return (
    <section id="data" className="section section--dark data-impact">
      <div className="container">
        <RevealText as="p" className="eyebrow" lines={[data.label]} />
        <RevealText as="h2" className="display" lines={[data.title]} />
        <p className="lede">{data.body}</p>

        <div className="data-impact__grid">
          <div className="data-impact__cell">
            <span className="data-impact__icon"><Icon name="flame" className="icon--lg" /></span>
            <IG1RoastChart />
          </div>
          <div className="data-impact__cell">
            <span className="data-impact__icon"><Icon name="mountain" className="icon--lg" /></span>
            <IG2AltitudeScale />
          </div>
          <div className="data-impact__cell">
            <span className="data-impact__icon"><Icon name="scale" className="icon--lg" /></span>
            <IG3BrewDial />
          </div>
          <div className="data-impact__cell">
            <span className="data-impact__icon"><Icon name="droplet" className="icon--lg" /></span>
            <IG4MarketGrowth />
          </div>
        </div>
      </div>
    </section>
  );
}
