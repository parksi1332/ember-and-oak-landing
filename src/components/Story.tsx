import { story } from "../data/content";
import { RevealText } from "./RevealText";
import { useInView } from "../hooks/useInView";
import greenBeansBurlap from "../assets/images/green-beans-burlap.jpg";
import roasterProcessing from "../assets/images/roaster-processing.jpg";
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
            <img src={greenBeansBurlap} alt="삼베 자루 위로 쏟아지는 로스팅된 커피 원두" width={640} height={800} />
          </div>
          <div
            ref={right.ref}
            className={`story__img story__img--slide blend-frame${right.inView ? " is-visible" : ""}`}
            style={{ transitionDelay: "120ms" }}
          >
            <img src={roasterProcessing} alt="프로세싱 수로에서 나무 패들로 씻기는 커피 체리" width={640} height={800} />
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
