const WOCHENFRAGE = {
  week: 42,
  question: "Welches Lied hörst du gerade auf Repeat?",
  hint: "What song have you had on repeat lately?",
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative z-10 grid border-b-2 border-[#293b3d] bg-[#f5e7c6] lg:grid-cols-[1.1fr_0.9fr]"
    >
      {/* Left: welcome */}
      <div className="flex min-h-[560px] flex-col justify-between p-6 sm:p-10 lg:min-h-[640px] lg:border-r-2 lg:border-[#293b3d] lg:p-12">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#293b3d]/50">
          <span>Bei Meixner · A Corner of the Internet</span>
          <span>[ Est. 1996 ]</span>
        </div>

        <div className="py-12 lg:py-8">
          <p className="blink-text mb-5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#a9322c]">
            &lt;WILLKOMMEN!&gt; You found the place
          </p>
          <h1 className="hero-title">
            MICHAEL
            <br />
            <em>MEIXNER.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed sm:text-xl">
            Software developer in Wien. This is my little corner of the internet — not a portfolio,
            just a place. Come in, look around, leave a note.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <a
            className="web-button px-6 py-3 font-mono text-xs font-bold uppercase"
            href="#wochenfrage"
          >
            This week's question &gt;&gt;
          </a>
          <a className="classic-link font-mono text-xs font-bold uppercase" href="#gaestebuch">
            Sign the guestbook
          </a>
        </div>
      </div>

      {/* Right: about.txt bevel window */}
      <div className="relative bg-[#8eb3b6] p-6 sm:p-10 lg:p-12">
        <div className="bevel-box bg-[#b2a58d] shadow-[8px_8px_0_#293b3d]">
          <div className="flex items-center justify-between border-b-2 border-[#f6e7c4] bg-[#315d68] px-4 py-2 font-mono text-xs font-bold uppercase text-[#fff4d6]">
            <span>about.txt</span>
            <span className="opacity-60">— □ ×</span>
          </div>
          <div className="p-5 font-mono text-sm leading-relaxed text-[#1d2f31]">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#293b3d]/40">
              // who is this guy
            </p>
            <p>
              <span className="text-[#a9322c]">name:</span>&nbsp;&nbsp;&nbsp;&nbsp; Michael Meixner
            </p>
            <p>
              <span className="text-[#a9322c]">lives:</span>&nbsp;&nbsp;&nbsp;&nbsp; Wien, Österreich
            </p>
            <p>
              <span className="text-[#a9322c]">makes:</span>&nbsp;&nbsp;&nbsp; Software for the web
            </p>
            <div className="my-4 border-t border-[#293b3d]/20" />
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#293b3d]/40">
              // currently into
            </p>
            <p className="leading-relaxed">
              Pixel art. Espresso.
              <br />
              Long walks with no destination.
              <br />
              Making things that feel alive.
            </p>
            <div className="my-4 border-t border-[#293b3d]/20" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#293b3d]/40">
              // wochenfrage #{WOCHENFRAGE.week}
            </p>
            <p className="mt-2 italic leading-relaxed">
              &ldquo;{WOCHENFRAGE.question}&rdquo;
            </p>
            <p className="mt-1 text-[10px] text-[#293b3d]/40">{WOCHENFRAGE.hint}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
