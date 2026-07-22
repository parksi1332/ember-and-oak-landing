// Adapted from originkit "curvedmarquee" (MIT, dependency-free), trimmed to
// the drift-only behaviour D1 specified — animation #10 (01_design_direction.md
// §6): section-boundary curved ribbon, 40s linear infinite, fade at edges.
import { useEffect, useMemo, useRef, useState } from "react";

export function CurvedMarquee({
  text,
  color = "var(--roast-light)",
  curveAmount = 26,
  speed = 26, // px/sec
  gap = 20,
  fontSize = 15,
  className = "",
}: {
  text: string;
  color?: string;
  curveAmount?: number;
  speed?: number;
  gap?: number;
  fontSize?: number;
  className?: string;
}) {
  const measureRef = useRef<SVGTextElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tspansRef = useRef<(SVGTSpanElement | null)[]>([]);
  const [pathLength, setPathLength] = useState(0);
  const [textWidth, setTextWidth] = useState(0);

  const staticId = useMemo(() => Math.abs(hashCode(text)).toString(36), [text]);
  const pathId = `curve-${staticId}`;
  const maskId = `curve-mask-${staticId}`;
  const gradId = `curve-grad-${staticId}`;
  const pathD = `M-100,60 Q720,${60 + curveAmount} 1540,60`;

  useEffect(() => {
    if (measureRef.current) setTextWidth(measureRef.current.getComputedTextLength());
  }, [text, fontSize]);
  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, [curveAmount]);

  const spacing = textWidth + gap;
  const repeats = spacing > 0 ? Math.ceil(pathLength / spacing) + 2 : 0;
  const ready = pathLength > 0 && spacing > 0;
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!ready || reduceMotion) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(now - last, 100);
      last = now;
      const spans = tspansRef.current;
      const count = spans.length;
      if (count > 0) {
        const period = count * spacing;
        const wrap = (x: number) => ((((x - speed * (delta / 1e3)) % period) + period) % period);
        for (const tspan of spans) {
          if (!tspan) continue;
          const x = parseFloat(tspan.getAttribute("x") || "0");
          tspan.setAttribute("x", wrap(x).toString());
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, spacing, speed, reduceMotion]);

  return (
    <div className={className} style={{ width: "100%", lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 120"
        style={{ width: "100%", height: "auto", display: "block", fill: color, fontFamily: "var(--font-mono)" }}
        aria-hidden="true"
      >
        <text ref={measureRef} style={{ visibility: "hidden" }} fontSize={fontSize}>
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="12%" stopColor="white" stopOpacity="1" />
            <stop offset="88%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill={`url(#${gradId})`} />
          </mask>
        </defs>
        {ready && (
          <text mask={`url(#${maskId})`} fontSize={fontSize} letterSpacing="0.08em">
            <textPath href={`#${pathId}`}>
              {Array.from({ length: repeats }).map((_, i) => (
                <tspan
                  key={i}
                  x={i * spacing}
                  ref={(el) => {
                    tspansRef.current[i] = el;
                  }}
                >
                  {text}
                </tspan>
              ))}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
}

function hashCode(s: string) {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
