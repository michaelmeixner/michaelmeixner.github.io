import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { EyeCard } from "./EyeCard";

interface Sketch {
  id: string;
  title: string;
  note: string;
  Component: React.ComponentType;
}

// Add new sketch entries here as you make more things
const SKETCHES: Sketch[] = [
  {
    id: "das-auge",
    title: "das_auge.exe",
    note: "Cookie Monster couch · CSS",
    Component: EyeCard,
  },
];

const THUMB_W = 320;
const THUMB_H = 260;
const CONTENT_W = 800;
const SCALE = THUMB_W / CONTENT_W;

function SketchOverlay({ sketch, onClose }: { sketch: Sketch; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 py-8"
      onClick={onClose}
    >
      <div
        className="my-auto flex flex-col border-2 border-[#f6e7c4] bg-[#b2a58d] shadow-[12px_12px_0_rgba(31,45,46,0.8)]"
        style={{ width: "min(900px, 90vw)", maxHeight: "100vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex shrink-0 items-center justify-between border-b-2 border-[#f6e7c4] bg-[#315d68] px-4 py-2 font-mono text-xs font-bold uppercase text-[#fff4d6]">
          <span>{sketch.title}</span>
          <button
            onClick={onClose}
            className="web-button px-2 py-0.5 font-mono text-xs font-bold leading-none hover:bg-[#a9322c]"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {/* Full-size content — scrolls if taller than the window */}
        <div className="min-h-0 flex-1 overflow-auto bg-[var(--eye-background)]">
          <sketch.Component />
        </div>
        {/* Caption */}
        <div className="shrink-0 border-t-2 border-[#f6e7c4] px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-[#1d2f31]/60">
          {sketch.note} · esc or click outside to close
        </div>
      </div>
    </div>,
    document.body
  );
}

export function SketchesSection() {
  const [open, setOpen] = useState<Sketch | null>(null);

  return (
    <section id="eye" className="relative z-10 border-y-2 border-[#293b3d] bg-[#315d68] text-[#fff4d6]">
      {/* Header */}
      <div className="flex items-end justify-between border-b-2 border-white/20 px-6 pb-4 pt-8 sm:px-10">
        <div>
          <h2 className="section-title">Digital Sketches</h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/25">
            Fun things I've made
          </span>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-widest text-white/40 sm:block">
          click to open · scroll →
        </p>
      </div>

      {/* Scrollable card row */}
      <div className="overflow-x-auto px-6 py-8 sm:px-10">
        <div className="flex gap-6" style={{ width: "max-content" }}>
          {SKETCHES.map((sketch) => (
            <div key={sketch.id} className="shrink-0">
              <button
                className="block text-left"
                onClick={() => setOpen(sketch)}
                aria-label={`Open ${sketch.title}`}
              >
                <div className="border-2 border-[#f6e7c4] bg-[#b2a58d] shadow-[4px_4px_0_rgba(31,45,46,0.6)] transition-shadow hover:shadow-[6px_6px_0_rgba(31,45,46,0.8)]">
                  {/* Title bar */}
                  <div className="flex items-center justify-between border-b-2 border-[#f6e7c4] bg-[#315d68] px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-[#fff4d6]">
                    <span>{sketch.title}</span>
                    <span className="opacity-60">— □ ×</span>
                  </div>
                  {/* Scaled thumbnail */}
                  <div
                    className="bg-[var(--eye-background)]"
                    style={{ width: THUMB_W, height: THUMB_H, overflow: "hidden", position: "relative" }}
                  >
                    <div style={{ width: CONTENT_W, transform: `scale(${SCALE})`, transformOrigin: "top left", position: "absolute" }}>
                      <sketch.Component />
                    </div>
                  </div>
                  {/* Caption */}
                  <div className="border-t-2 border-[#f6e7c4] px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-[#1d2f31]/60">
                    {sketch.note}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Overlay */}
      {open && <SketchOverlay sketch={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
