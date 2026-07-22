import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Real-time brew timer (01_design_direction.md §6 animation #4): 0:00 -> total,
 * driven by rAF for a smooth dial, actual wall-clock seconds (a real kitchen
 * timer, not a sped-up demo). Start / pause / reset.
 */
export function useBrewTimer(totalSeconds: number) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [running, setRunning] = useState(false);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  const tick = useCallback(
    (now: number) => {
      const elapsed = now - startRef.current;
      if (elapsed >= totalSeconds * 1000) {
        setElapsedMs(totalSeconds * 1000);
        setRunning(false);
        return;
      }
      setElapsedMs(elapsed);
      rafRef.current = requestAnimationFrame(tick);
    },
    [totalSeconds],
  );

  const start = useCallback(() => {
    startRef.current = performance.now() - elapsedMs;
    setRunning(true);
  }, [elapsedMs]);

  const pause = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setRunning(false);
    setElapsedMs(0);
  }, []);

  useEffect(() => {
    if (!running) return;
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, tick]);

  return { elapsedMs, running, start, pause, reset };
}
