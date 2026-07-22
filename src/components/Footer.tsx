import { useState } from "react";
import { footer, nav } from "../data/content";
import { Icon } from "./Icon";
import { CurvedMarquee } from "./CurvedMarquee";
import "./Footer.css";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="section section--dark site-footer">
      <div className="site-footer__marquee">
        <CurvedMarquee text={footer.marquee} />
      </div>

      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <span className="site-footer__logo">
              <Icon name="coffee" className="icon--lg" />
              {nav.logo}
            </span>
            <p className="caption">{footer.tagline}</p>
          </div>

          <div className="site-footer__columns">
            {footer.columns.map((col) => (
              <div key={col.title} className="site-footer__col">
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="site-footer__newsletter">
            <h4>{footer.newsletterTitle}</h4>
            <p className="caption">{footer.newsletterSub}</p>
            {submitted ? (
              <p className="site-footer__thanks">{footer.newsletterThanks}</p>
            ) : (
              <form
                className="site-footer__form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  {footer.newsletterEmailLabel}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn btn--primary">
                  {footer.newsletterSubmit}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="site-footer__bottom">
          <span className="caption">{footer.copyright}</span>
          <span className="caption site-footer__font-credit">{footer.fontCredit}</span>
          <a href="#" aria-label="Instagram" className="site-footer__social">
            <Icon name="instagram" />
          </a>
          <details className="site-footer__sources">
            <summary className="caption">{footer.sourcesLabel}</summary>
            <ol>
              {footer.sources.map((s) => (
                <li key={s} className="caption">
                  {s}
                </li>
              ))}
            </ol>
          </details>
        </div>
      </div>
    </footer>
  );
}
