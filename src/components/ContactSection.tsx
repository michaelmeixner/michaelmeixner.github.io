import { FormEvent, useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

interface GuestEntry {
  name: string;
  message: string;
  time: string;
}

const SEED_ENTRIES: GuestEntry[] = [
  { name: "moss_92", message: "the internet should feel small again", time: "2 days ago" },
  { name: "vhsangel", message: "found this through a friend of a friend. hello!", time: "3 days ago" },
  { name: "felix.k", message: "das auge hat mich beobachtet", time: "5 days ago" },
  { name: "anonym", message: "coole seite. ich komm wieder", time: "1 week ago" },
];

export function ContactSection() {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase
      .from("guestbook")
      .select("name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (data && !error) {
          setEntries(
            data.map((row) => ({
              name: row.name,
              message: row.message,
              time: new Date(row.created_at).toLocaleDateString("en-GB"),
            }))
          );
        }
        setLoading(false);
      });
  }, []);

  const displayEntries = loading ? SEED_ENTRIES : entries.length > 0 ? entries : SEED_ENTRIES;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    const payload = { name: name.trim() || "anonym", message: trimmed };
    const { data, error } = await supabase
      .from("guestbook")
      .insert(payload)
      .select()
      .single();
    if (data && !error) {
      setEntries((prev) => [
        { name: data.name, message: data.message, time: "just now" },
        ...prev,
      ]);
    }
    setName("");
    setMessage("");
    setTimeout(() => listRef.current?.scrollTo({ top: 0, behavior: "smooth" }), 50);
  }

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <>
      {/* Gästebuch */}
      <section
        id="gaestebuch"
        className="relative z-10 grid border-y-2 border-[#293b3d] bg-[#315d68] text-[#fff4d6] lg:grid-cols-[0.9fr_1.1fr]"
      >
        {/* Left: description */}
        <div className="p-6 sm:p-10 lg:border-r lg:border-white/20 lg:p-16">
          <p className="subhead mb-8 text-sm font-medium uppercase tracking-[0.25em] text-[#e8c46b]">
            Guestbook
          </p>
          <h2 className="section-title max-w-md">Leave something for the next person.</h2>
          <span className="subhead text-xs uppercase tracking-widest text-white/25">
            Gästebuch
          </span>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-white/80">
            No likes, no follower counts. Just a small corner of the web where you can say hello.
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-white/40">
            No account required
          </p>
        </div>

        {/* Right: guestbook window */}
        <div className="p-4 sm:p-8 lg:p-12">
          <div className="border-2 border-[#f6e7c4] bg-[#b2a58d] text-[#1d2f31] shadow-[8px_8px_0_rgba(31,45,46,0.6)]">
            {/* Window chrome */}
            <div className="flex items-center justify-between border-b-2 border-[#f6e7c4] bg-[#315d68] px-4 py-2 font-mono text-xs font-bold uppercase text-[#fff4d6]">
              <span>gaestebuch.html</span>
              <span className="opacity-60">— □ ×</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="border-b-2 border-black p-3 space-y-2">
              <div className="flex gap-2">
                <label className="sr-only" htmlFor="gb-name">Your name</label>
                <input
                  id="gb-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={30}
                  placeholder="your name (optional)"
                  className="inset-field w-32 shrink-0 bg-white px-3 py-2 font-mono text-xs outline-none placeholder:text-black/40"
                />
                <label className="sr-only" htmlFor="gb-message">Message</label>
                <input
                  id="gb-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={120}
                  required
                  placeholder="write something..."
                  className="inset-field min-w-0 flex-1 bg-white px-3 py-2 font-mono text-xs outline-none placeholder:text-black/40"
                />
                <button
                  type="submit"
                  className="web-button shrink-0 px-4 font-mono text-xs font-bold uppercase"
                >
                  Post
                </button>
              </div>
            </form>

            {/* Entries list */}
            <div ref={listRef} className="max-h-[300px] overflow-y-auto">
              {loading && (
                <p className="p-4 font-mono text-xs text-black/40">Loading...</p>
              )}
              {displayEntries.map((entry, i) => (
                <div
                  key={`${entry.name}-${i}`}
                  className="grid grid-cols-[1fr_auto] gap-2 border-b border-black/20 p-4 last:border-0"
                >
                  <p className="font-mono text-xs leading-relaxed">
                    <span className="font-bold text-[#9f302b]">{entry.name}</span>
                    <span className="mx-2">:</span>
                    {entry.message}
                  </p>
                  <span className="font-mono text-[9px] uppercase text-black/50 whitespace-nowrap">
                    {entry.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / footer */}
      <footer
        id="newsletter"
        className="relative z-10 border-t-2 border-[#293b3d] bg-[#8eb3b6] px-4 py-16 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="subhead mb-6 text-sm font-medium uppercase tracking-[0.3em]">
            Gelegentlich ein Brief aus der Ecke
          </p>
          <h2 className="hero-title text-[clamp(2.6rem,7vw,6rem)]">
            Don't be a stranger.
          </h2>
          <p className="subhead mt-2 text-xs uppercase tracking-widest text-[#1d2f31]/35">
            Nicht fremd bleiben.
          </p>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed">
            New questions, good links, and a reason to come back. Every now and then.
          </p>

          {subscribed ? (
            <div className="mx-auto mt-10 inline-block border-2 border-[#293b3d] bg-[#e1b45b] px-6 py-4 font-mono text-sm font-bold uppercase shadow-[5px_5px_0_#293b3d]">
              You're in. Talk soon.
            </div>
          ) : (
            <form
              onSubmit={subscribe}
              className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="inset-field min-w-0 flex-1 bg-white px-5 py-4 font-mono text-sm outline-none placeholder:text-black/40"
              />
              <button
                type="submit"
                className="web-button px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest"
              >
                Count me in
              </button>
            </form>
          )}
        </div>

        {/* Footer bar */}
        <div className="mt-20 flex flex-col gap-4 border-t-2 border-black pt-5 font-mono text-[9px] font-bold uppercase tracking-widest sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Michael Meixner</span>
          <div className="flex flex-wrap gap-5">
            <a className="underline" href="#top">Top of page</a>
            <a className="underline" href="#gaestebuch">Gästebuch</a>
            <a className="underline" href="mailto:hello@michaelmeixner.com">Email</a>
            <a
              className="underline"
              href="https://github.com/michaelmeixner"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <span>Made for humans · Not for robots</span>
        </div>

        {/* Webring ornament */}
        <div className="mx-auto mt-10 max-w-xl border-2 border-[#f6e7c4] bg-[#b2a58d] p-3 text-center font-mono text-[10px] text-[#1d2f31] shadow-[inset_2px_2px_0_#766b59,inset_-2px_-2px_0_#f6e7c4]">
          <p className="font-bold uppercase">The Small Web Webring</p>
          <p className="mt-2">
            <a className="classic-link" href="#top">&lt;&lt; Previous</a>
            <span className="mx-4">[ Random site ]</span>
            <a className="classic-link" href="#top">Next &gt;&gt;</a>
          </p>
        </div>
      </footer>
    </>
  );
}
