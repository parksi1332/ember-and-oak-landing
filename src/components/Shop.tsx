import { shop } from "../data/content";
import { RevealText } from "./RevealText";
import { Icon } from "./Icon";
import "./Shop.css";

export function Shop() {
  return (
    <section id="shop" className="section shop">
      <div className="shop__texture" aria-hidden="true">
        <img src="/assets/images/beans-rustic-table.jpg" alt="" />
      </div>
      <div className="container shop__content">
        <RevealText as="h2" className="display" lines={[shop.title]} />
        <p className="lede shop__body">{shop.body}</p>
        <div className="shop__ctas">
          <a href="#" className="btn btn--primary shop__btn-light">
            {shop.cta1}
          </a>
          <a href="#" className="btn btn--ghost btn--on-dark">
            {shop.cta2}
          </a>
        </div>
        <ul className="shop__trust">
          {shop.trust.map((t) => (
            <li key={t.label}>
              <Icon name={t.icon} />
              {t.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
