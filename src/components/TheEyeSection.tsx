import { EyeCard } from "./EyeCard";

export function TheEyeSection() {
  return (
    <section className="relative z-10 grid border-y-2 border-[#293b3d] bg-[#315d68] text-[#fff4d6] lg:grid-cols-[0.9fr_1.1fr]">
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
