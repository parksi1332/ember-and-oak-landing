import { story } from "../data/content";
import { RevealText } from "./RevealText";
import { useInView } from "../hooks/useInView";
import "./Story.css";

export function Story() {
  const left = useInView<HTMLDivElement>(0.3);
  const right = useInView<HTMLDivElement>(0.3);

  const [beforeItalic, italic, afterItalic] = splitOnce(story.title, "not a product");
  const [bodyBefore, bodyItalic, bodyAfter] = splitOnce(story.body, "never the same twice");

  return (
    <section id="our-story" className="section section--dark story">
      <div className="container story__grid">
        <div className="story__media">
          <div ref={left.ref} className={`story__img story__img--fade blend-frame${left.inView ? " is-visible" : ""}`}>
            <img src="/assets/images/green-beans-burlap.jpg" alt="Roasted coffee beans spilling across a burlap sack" width={640} height={800} />
          </div>
          <div
            ref={right.ref}
            className={`story__img story__img--slide blend-frame${right.inView ? " is-visible" : ""}`}
            style={{ transitionDelay: "120ms" }}
          >
            <img src="/assets/images/roaster-processing.jpg" alt="Coffee cherries being washed through a wooden paddle in a processing channel" width={640} height={800} />
          </div>
        </div>

        <div className="story__copy">
          <RevealText as="p" className="eyebrow" lines={[story.label]} />
          <RevealText
            as="h2"
            className="display"
            lines={[
              <>
                {beforeItalic}
                <em className="accent-italic">{italic}</em>
                {afterItalic}
              </>,
            ]}
          />
          <p className="lede">
            {bodyBefore}
            <em className="accent-italic">{bodyItalic}</em>
            {bodyAfter}
          </p>
        </div>
      </div>
    </section>
  );
}

function splitOnce(text: string, needle: string): [string, string, string] {
  const idx = text.indexOf(needle);
  if (idx === -1) return [text, "", ""];
  return [text.slice(0, idx), needle, text.slice(idx + needle.length)];
}
