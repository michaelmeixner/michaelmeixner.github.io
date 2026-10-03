import { useEffect } from "react";
import { logVisit } from "./lib/logVisit";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ProjectsSection } from "./components/ProjectsSection";
import { TheEyeSection } from "./components/TheEyeSection";
import { ContactSection } from "./components/ContactSection";

const MARQUEE_TEXT =
  "Bei Meixner   ★   Wien, Österreich   ★   The internet is more fun when it feels small   ★   Wochenfrage · Das Auge · Gästebuch   ★   ";

export default function App() {
  useEffect(() => { logVisit(); }, []);

  return (
    <>
      <div className="noise" aria-hidden="true" />

      <div className="site-shell overflow-x-hidden bg-[#b2a58d] text-[#1d2f31]">
        <Nav />

        <div className="relative z-[11] bg-[#d6a344] px-2 py-1 text-center font-mono text-[10px] font-bold uppercase text-[#37291e] shadow-[0_4px_0_#6f2b27]">
          *** Welcome to our little corner of the World Wide Web! ***
        </div>

        <Hero />

        {/* Ticker */}
        <div className="marquee relative z-10 border-b-2 border-[#293b3d] bg-[#6f2b27] py-2 text-[#f3d78e]">
          <div className="marquee-track font-mono text-xs font-bold uppercase tracking-[0.2em]">
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
          </div>
        </div>

        {/* Under-construction bar */}
        <aside className="relative z-10 grid border-b-2 border-[#293b3d] bg-[#b2a58d] font-mono text-[10px] font-bold uppercase md:grid-cols-3">
          <div className="bevel-box p-3 text-center">
            <span className="blink-text text-red-600">[!]</span>{" "}
            This page is permanently under construction
          </div>
          <div className="bevel-box p-3 text-center">
            Best viewed at 1280 × 800 in any browser
          </div>
          <div className="bevel-box p-3 text-center">
            <a className="classic-link" href="mailto:hello@michaelmeixner.com">
              Email the webmaster
            </a>
          </div>
        </aside>

        <ProjectsSection />
        <TheEyeSection />
        <ContactSection />
      </div>
    </>
  );
}
