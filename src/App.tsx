import { useEffect, useState } from "react";
import { logVisit } from "./lib/logVisit";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { WeeklyQuestionSection } from "./components/WeeklyQuestionSection";
import { SketchesSection } from "./components/SketchesSection";
import { MediaSection } from "./components/MediaSection";
import { ContactSection } from "./components/ContactSection";
import { MediaPage } from "./pages/MediaPage";

const MARQUEE_TEXT =
  "Bei Meixner   ★   Atlanta, Georgia, USA   ★   The internet is more fun when it feels small   ★   ";

export default function App() {
  const [page, setPage] = useState<"home" | "media">(() =>
    window.location.pathname === "/media" ? "media" : "home"
  );

  useEffect(() => { logVisit(); }, []);

  useEffect(() => {
    const path = page === "media" ? "/media" : "/";
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
  }, [page]);

  useEffect(() => {
    const onPop = () => {
      setPage(window.location.pathname === "/media" ? "media" : "home");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (page === "media") {
    return <MediaPage onBack={() => setPage("home")} />;
  }

  return (
    <>
      <div className="noise" aria-hidden="true" />

      <div className="site-shell overflow-x-hidden bg-[#b2a58d] text-[#1d2f31]">
        <Nav />

        <div className="relative z-[11] bg-[#d6a344] px-2 py-1 text-center font-mono text-[10px] font-bold uppercase text-[#37291e] shadow-[0_4px_0_#6f2b27]">
          <span className="blink-text">
            &lt;WILLKOMMEN!&gt; You found the place
          </span>
        </div>

        <Hero />

        {/* Ticker */}
        <div className="marquee relative z-10 border-b-2 border-[#293b3d] bg-[#2D6B3F] py-2 text-[#C1ACCB]">
          <div className="marquee-track font-mono text-xs font-bold uppercase tracking-[0.2em]">
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
          </div>
        </div>

        {/* Under-construction bar */}
        <aside className="relative z-10 grid border-b-2 border-[#293b3d] bg-[#b2a58d] font-mono text-[10px] font-bold uppercase md:grid-cols-3">
          <div className="bevel-box p-3 text-center">
            <span className="blink-text text-red-600">[!]</span> This page is
            permanently under construction
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

        <WeeklyQuestionSection />
        <SketchesSection />
        <MediaSection onNavigate={() => setPage("media")} />
        <ContactSection />
      </div>
    </>
  );
}
