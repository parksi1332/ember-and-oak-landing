import { useState } from "react";
import { hero } from "../data/content";
import { SmokyText } from "./SmokyText";
import { WatchRoastModal } from "./WatchRoastModal";
import heroPoster from "../assets/video/hero-poster.jpg";
import heroVideo from "../assets/video/spare-coffee-a.mp4";
import "./Hero.css";

export function Hero() {
  const [watchOpen, setWatchOpen] = useState(false);

  return (
    <section id="top" className="hero">
      <div className="hero__media" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="metadata" poster={heroPoster}>
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero__scrim" />
      </div>

      <div className="container hero__content">
        <p className="eyebrow hero__eyebrow">{hero.eyebrow}</p>
        <SmokyText
          as="h1"
          text={hero.headline}
          className="hero__headline display"
          color="var(--heading)"
          intensity={8}
          position="bottomLeft"
          duration={2}
        />
        <p className="lede hero__sub">{hero.sub}</p>
        <div className="hero__ctas">
          <a href="#shop" className="btn btn--primary">
            {hero.cta1}
          </a>
          <button className="btn btn--ghost" onClick={() => setWatchOpen(true)}>
            {hero.cta2}
          </button>
        </div>
      </div>

      <WatchRoastModal open={watchOpen} onClose={() => setWatchOpen(false)} />
    </section>
  );
}
