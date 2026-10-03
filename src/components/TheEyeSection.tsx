import { EyeCard } from "./EyeCard";

export function TheEyeSection() {
  return (
    <section className="relative z-10 grid border-y-2 border-[#293b3d] bg-[#315d68] text-[#fff4d6] lg:grid-cols-[0.9fr_1.1fr]">
      {/* Left: description */}
      <div className="p-6 sm:p-10 lg:border-r lg:border-white/20 lg:p-16">
        <p className="mb-8 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#e8c46b]">
          Komm rein. Schau dich um.
        </p>
        <h2 className="section-title max-w-xs">The Eye.</h2>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/25">
          Das Auge.
        </span>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-white/80">
          It watches. Not in a creepy way — in a curious way. Move your mouse and
          see what happens. It was here before you arrived.
        </p>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-white/40">
          Design nach{" "}
          <a
            className="classic-link"
            href="https://www.instagram.com/faelpt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rafael Serra
          </a>
        </p>
      </div>

      {/* Right: bevel window */}
      <div id="eye" className="p-4 sm:p-8 lg:p-12">
        <div className="border-2 border-[#f6e7c4] bg-[#b2a58d] shadow-[8px_8px_0_rgba(31,45,46,0.6)]">
          {/* Window chrome */}
          <div className="flex items-center justify-between border-b-2 border-[#f6e7c4] bg-[#315d68] px-4 py-2 font-mono text-xs font-bold uppercase text-[#fff4d6]">
            <span>das_auge.exe</span>
            <span className="opacity-60">— □ ×</span>
          </div>
          {/* Eye canvas */}
          <div className="flex items-center justify-center overflow-hidden bg-[var(--eye-background)]">
            <EyeCard />
          </div>
        </div>
      </div>
    </section>
  );
}
