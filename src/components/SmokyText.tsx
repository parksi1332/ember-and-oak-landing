// Adapted from originkit "smokytext" (MIT, dependency-free) — D1 handoff:
// Hero H1, appearTrigger="default", intensity=8, position="bottomLeft", duration=2.
// 01_design_direction.md §6 animation #1: "연기 확산 리빌", 2s / cubic-bezier(0,0,0.58,1).
import {
  useMemo,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from "react";

type Position = "bottomLeft" | "topLeft";
type Phase = "hidden" | "appearing" | "visible";

interface CharEntry {
  char: string;
  globalIdx: number;
}

interface Group {
  type: "word" | "space";
  chars: CharEntry[];
  gi: number;
}

function buildGroups(text: string) {
  const groups: Group[] = [];
  let globalIdx = 0;
  let gi = 0;
  (text.match(/\S+|\s+/g) ?? []).forEach((seg) => {
    groups.push({
      type: /^\s/.test(seg) ? "space" : "word",
      chars: seg.split("").map((c) => ({ char: c, globalIdx: globalIdx++ })),
      gi: gi++,
    });
  });
  return { groups, totalVisible: globalIdx };
}

function scaledTiming(rawD: number, maxRaw: number, duration: number) {
  if (maxRaw <= 0) return { delay: 0, charDur: duration };
  return { charDur: duration * 0.5, delay: (rawD * (duration * 0.5)) / maxRaw };
}

function getAppear(c: CharEntry, position: Position): string {
  const e = c.globalIdx % 2 === 0;
  if (position === "topLeft") return e ? "smt-ap-tl-a" : "smt-ap-tl-b";
  return e ? "smt-ap-bl-a" : "smt-ap-bl-b";
}

// intensity 1 = crisp quick puff, intensity 20 = heavy diffuse smoke
function buildKF(color: string, intensity: number) {
  const n = (Math.max(1, Math.min(20, intensity)) - 1) / 19;
  const r = (v: number) => +v.toFixed(2);
  const peakB = Math.round(6 + n * 200);
  const initB = Math.round(2 + n * 70);
  const layers = 1 + Math.round(n * 3);
  const stack = (blur: number) =>
    Array.from({ length: layers }, (_, i) => `0 0 ${Math.round((blur * (i + 1)) / layers)}px ${color}`).join(",");
  const peak = stack(peakB);
  const init = stack(initB);
  const d = 0.7 + n * 0.8;

  return `
@keyframes smt-ap-bl-a{from{opacity:0;text-shadow:${init};transform:translate3d(${r(-15 * d)}rem,${r(8 * d)}rem,0) rotate(40deg) skewX(-70deg) scale(0.7)}40%{text-shadow:${peak}}to{opacity:1;text-shadow:0 0 0 ${color};transform:none}}
@keyframes smt-ap-bl-b{from{opacity:0;text-shadow:${init};transform:translate3d(${r(-18 * d)}rem,${r(8 * d)}rem,0) rotate(40deg) skewX(70deg) scale(0.5)}40%{text-shadow:${peak}}to{opacity:1;text-shadow:0 0 0 ${color};transform:none}}
@keyframes smt-ap-tl-a{from{opacity:0;text-shadow:${init};transform:translate3d(${r(-15 * d)}rem,${r(-8 * d)}rem,0) rotate(-40deg) skewX(70deg) scale(0.7)}40%{text-shadow:${peak}}to{opacity:1;text-shadow:0 0 0 ${color};transform:none}}
@keyframes smt-ap-tl-b{from{opacity:0;text-shadow:${init};transform:translate3d(${r(-18 * d)}rem,${r(-8 * d)}rem,0) rotate(-40deg) skewX(-70deg) scale(0.5)}40%{text-shadow:${peak}}to{opacity:1;text-shadow:0 0 0 ${color};transform:none}}
`;
}

export function SmokyText({
  text,
  as: Tag = "div",
  color = "var(--heading)",
  intensity = 8,
  position = "bottomLeft" as Position,
  duration = 2,
  className = "",
  style,
}: {
  text: string;
  as?: ElementType;
  color?: string;
  intensity?: number;
  position?: Position;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const kfEl = useRef<HTMLStyleElement | null>(null);
  useEffect(() => {
    kfEl.current = document.createElement("style");
    document.head.appendChild(kfEl.current);
    return () => {
      kfEl.current?.remove();
      kfEl.current = null;
    };
  }, []);
  useEffect(() => {
    if (kfEl.current) kfEl.current.textContent = buildKF(color, intensity);
  }, [color, intensity]);

  const { groups, totalVisible } = useMemo(() => buildGroups(text), [text]);
  const maxRaw = totalVisible * 0.1;

  const [phase, setPhase] = useState<Phase>("hidden");
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setPhase("visible");
      return;
    }
    const t1 = setTimeout(() => setPhase("appearing"), 80);
    const t2 = setTimeout(() => setPhase("visible"), duration * 1000 * 0.7 + 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag
      className={className}
      style={{
        ...style,
        color: "transparent",
        userSelect: "none",
      }}
    >
      {groups.map((group) =>
        group.type === "space" ? (
          <span key={group.gi} style={{ whiteSpace: "pre" }}>
            {" "}
          </span>
        ) : (
          <span key={group.gi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {group.chars.map((c) => {
              const base: CSSProperties = { display: "inline-block", textShadow: `0 0 0 ${color}` };
              if (phase === "hidden") return <span key={c.globalIdx} style={{ ...base, opacity: 0 }}>{c.char}</span>;
              if (phase === "visible") return <span key={c.globalIdx} style={{ ...base, opacity: 1 }}>{c.char}</span>;
              const rd = c.globalIdx * 0.1;
              const { delay, charDur } = scaledTiming(rd, maxRaw, duration);
              const anim = getAppear(c, position);
              return (
                <span
                  key={c.globalIdx}
                  style={{ ...base, animation: `${anim} ${charDur}s ${delay}s cubic-bezier(0,0,0.58,1) both` }}
                >
                  {c.char}
                </span>
              );
            })}
          </span>
        ),
      )}
    </Tag>
  );
}
