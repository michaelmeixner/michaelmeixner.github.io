import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { WOCHENFRAGE } from "../lib/wochenfrage";

export function Hero() {
  const [answerCount, setAnswerCount] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from("wochenfrage_answers")
      .select("*", { count: "exact", head: true })
      .eq("week", WOCHENFRAGE.week)
      .then(({ count }) => { if (count != null) setAnswerCount(count); });
  }, []);

  return (
    <section
      id="top"
      className="relative z-10 grid border-b-2 border-[#1a2838] bg-[#ede4c8] lg:grid-cols-[1.1fr_0.9fr]"
    >
      {/* Left: welcome */}
      <div className="flex min-h-[560px] flex-col justify-between p-6 sm:p-10 lg:min-h-[640px] lg:border-r-2 lg:border-[#1a2838] lg:p-12">
        <div className="subhead flex items-center justify-between text-[10px] uppercase tracking-widest text-[#1a2838]/50">
          <span>
            Bei Meixner · An internet cafe built like they used to be.
          </span>
          {/* <span>[ Est. 2026 ]</span> */}
        </div>

        <p className="max-w-xl text-lg leading-relaxed sm:text-xl">
          Hallo. I'm a software developer in Atlanta, and this is my internet
          cafe. Come in, look around, and engage in discussions with other
          visitors if you feel like it.
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <a
            className="web-button px-6 py-3 font-mono text-xs font-bold uppercase"
            href="#wochenfrage"
          >
            Answer this week's question
          </a>
          <a
            className="web-button px-6 py-3 font-mono text-xs font-bold uppercase"
            href="#gaestebuch"
          >
            Sign the guestbook
          </a>
        </div>
      </div>

      {/* Right: about.txt bevel window */}
      <div className="relative bg-[#6aaec8] p-6 sm:p-10 lg:p-12">
        <div className="bevel-box bg-[#c4b498] shadow-[8px_8px_0_#1a2838]">
          <div className="flex items-center justify-between border-b-2 border-[#f4efe1] bg-[#233d58] px-4 py-2 font-mono text-xs font-bold uppercase text-[#fff4d6]">
            <span>about.txt</span>
            <span className="opacity-60">— □ ×</span>
          </div>
          <div className="p-5 font-mono text-sm text-[#1a2838]">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#1a2838]/40">
              // who is this guy
            </p>
            <div className="space-y-1 leading-relaxed">
              <p>
                <span className="text-[#ba3929]">name:</span>
                &nbsp;&nbsp;&nbsp;&nbsp; Michael Meixner
              </p>
              <p>
                <span className="text-[#ba3929]">lives:</span>
                &nbsp;&nbsp;&nbsp;&nbsp; Atlanta, Georgia, USA
              </p>
              <p>
                <span className="text-[#ba3929]">makes:</span>&nbsp;&nbsp;&nbsp;
                Software, coffee, food, vibes
              </p>
            </div>

            <div className="my-4 border-t border-[#1a2838]/20" />

            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#1a2838]/40">
              // currently into
            </p>
            <p className="leading-relaxed">
              Fashion. Interesting silhouettes, unusual pairings.
              <br />
              Mobility training, meditation.
              <br />
              Figuring out my own point of view.
            </p>

            <div className="my-4 border-t border-[#1a2838]/20" />

            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#1a2838]/40">
              // weekly question · woche #{WOCHENFRAGE.week}
            </p>
            {WOCHENFRAGE.question ? (
              <>
                <p className="italic leading-relaxed">
                  &ldquo;{WOCHENFRAGE.question}&rdquo;
                </p>
                {WOCHENFRAGE.hint && (
                  <p className="mt-1 text-[10px] text-[#1a2838]/40">
                    {WOCHENFRAGE.hint}
                  </p>
                )}
                {answerCount != null && answerCount > 0 && (
                  <p className="mt-1 text-[10px] text-[#ba3929]">
                    ↳ {answerCount} {answerCount === 1 ? "person" : "people"}{" "}
                    answered
                  </p>
                )}
              </>
            ) : (
              <p className="italic text-[10px] text-[#1a2838]/30">
                No question posted yet. Check back soon.
              </p>
            )}
            <a
              href="#wochenfrage"
              className="classic-link mt-3 block text-[10px] uppercase tracking-widest"
            >
              → answer this week's question
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
