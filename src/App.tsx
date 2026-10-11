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
  "Bei Meixner   ★   Atlanta, Georgia, USA   ★   The internet is more fun with company   ★   ";

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

      <div className="site-shell overflow-x-hidden bg-[#c4b498] text-[#1a2838]">
        <Nav />

        <Hero />

        {/* Ticker */}
        <div className="marquee relative z-10 border-b-2 border-[#1a2838] bg-[#3e6943] py-2 text-[#bdadc9]">
          <div className="marquee-track font-mono text-xs font-bold uppercase tracking-[0.2em]">
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
          </div>
        </div>

        {/* Under-construction bar */}
        <aside className="relative z-10 grid border-b-2 border-[#1a2838] bg-[#c4b498] font-mono text-[10px] font-bold uppercase md:grid-cols-3">
          <div className="bevel-box p-3 text-center">
            <span className="blink-text text-red-600">[!]</span> This page is
            permanently under construction
          </div>
          <div className="bevel-box p-3 text-center">
            There are alternate labels on this site in German
          </div>
          <div className="bevel-box p-3 text-center">
            I don't speak German, but it's my heritage
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
