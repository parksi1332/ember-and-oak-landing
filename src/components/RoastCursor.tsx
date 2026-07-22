import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Animation #8 (01_design_direction.md §6): custom temperature-readout cursor
 * inside the Roast section, spring-tracked (stiffness 60 / damping 28).
 */
export function RoastCursor({
  containerRef,
  label,
}: {
  containerRef: RefObject<HTMLElement | null>;
  label: string;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const isCoarse = window.matchMedia?.("(pointer: coarse)").matches;
    if (isCoarse) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onEnter = () => setActive(true);
    const onLeave = () => setActive(false);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    const stiffness = 60;
    const damping = 28;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      vel.current.x += dx * stiffness * dt - vel.current.x * damping * dt;
      vel.current.y += dy * stiffness * dt - vel.current.y * damping * dt;
      pos.current.x += vel.current.x * dt;
      pos.current.y += vel.current.y * dt;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [containerRef]);

  return (
    <div ref={dotRef} className={`roast-cursor${active ? " is-active" : ""}`} aria-hidden="true">
      {label}
    </div>
  );
}
