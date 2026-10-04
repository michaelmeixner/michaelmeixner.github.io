import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function Nav() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .rpc("visit_count")
      .then(({ data }) => { if (data != null) setCount(data as number); });
  }, []);

  const formatted = count != null
    ? String(count).padStart(6, "0")
    : "······";

  return (
    <header className="sticky top-0 z-10 border-b-2 border-[#293b3d] bg-[#b2a58d]">
      {/* Status bar */}
      <div className="flex items-center justify-between border-b-2 border-[#f6e7c4] bg-[#315d68] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#fff4d6] sm:px-5">
        <span>Bei Meixner · Est. 1996</span>
        <span className="hidden items-center gap-2 sm:flex">
          Visitors: <b className="hit-counter">{formatted}</b>
        </span>
        <span className="flex items-center gap-1.5">
          <i className="online-dot" />
          Online Now
        </span>
      </div>

      {/* Logo + nav */}
      <div className="grid items-end gap-4 border-b-2 border-[#766b59] px-4 py-5 shadow-[inset_0_-2px_0_#f6e7c4] sm:px-6 lg:grid-cols-[1fr_auto] lg:py-6">
        <a className="logo leading-none" href="#top" aria-label="Michael Meixner home">
          BEI <span>MEIXNER</span>
        </a>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs font-bold uppercase">
          <a href="#wochenfrage">[Weekly Question]</a>
          <a href="#eye">[Cookies]</a>
          <a href="#gaestebuch">[Guestbook]</a>
        </nav>
      </div>
    </header>
  );
}
