import type { ElementType, ReactNode } from "react";
import { useInView } from "../hooks/useInView";

/**
 * Animation #5 (01_design_direction.md §6): section label/title line-mask
 * reveal on scroll-in. 600ms cubic-bezier(0.22,1,0.36,1), staggered per line.
 */
export function RevealText({
  lines,
  as: Tag = "div",
  className = "",
  staggerMs = 90,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  staggerMs?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span className="reveal-line-wrap" key={i}>
          <span
            className={`reveal-line${inView ? " is-visible" : ""}`}
            style={{ transitionDelay: `${i * staggerMs}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
