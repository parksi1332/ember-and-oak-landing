import { useEffect, useRef } from "react";
import watchRoastVideo from "../assets/video/watch-roast.mp4";
import "./WatchRoastModal.css";

export function WatchRoastModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="watch-modal" role="dialog" aria-modal="true" aria-label="로스팅 지켜보기" onClick={onClose}>
      <div className="watch-modal__panel" onClick={(e) => e.stopPropagation()}>
        <button ref={closeBtnRef} className="watch-modal__close btn btn--icon btn--ghost" onClick={onClose} aria-label="영상 닫기">
          ×
        </button>
        <video
          src={watchRoastVideo}
          controls
          autoPlay
          playsInline
          className="watch-modal__video"
        />
      </div>
    </div>
  );
}
