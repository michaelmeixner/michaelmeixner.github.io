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
              time: new Date(row.created_at).toLocaleDateString("en-US"),
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
  const [subError, setSubError] = useState(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setSubError(false);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: trimmed });
    if (error && error.code !== "23505") {
      setSubError(true);
      return;
    }
    setSubscribed(true);
    setEmail("");
  }

  return (
    <>
      {/* Gästebuch */}
      <section
        id="gaestebuch"
        className="relative z-10 grid border-y-2 border-[#1a2838] bg-[#233d58] text-[#fff4d6] lg:grid-cols-[0.9fr_1.1fr]"
      >
        {/* Left: description */}
        <div className="p-6 sm:p-10 lg:border-r lg:border-white/20 lg:p-16">
          <p className="subhead mb-8 text-sm font-medium uppercase tracking-[0.25em] text-[#dfb447]">
            Guestbook{" "}
            <span className="text-[#dfb447]/40">Gästebuch</span>
          </p>
          <h2 className="section-title max-w-md">Leave something for the next person.</h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-white/80">
            Leave a joke, make a suggestion, or just say hello.
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-white/40">
            No account required
          </p>
        </div>

        {/* Right: guestbook window */}
        <div className="p-4 pb-6 pr-6 sm:p-8 sm:pb-10 sm:pr-10 lg:p-12 lg:pb-14 lg:pr-14">
          <div className="border-2 border-[#f4efe1] bg-[#c4b498] text-[#1a2838] shadow-[8px_8px_0_rgba(31,45,46,0.6)]">
            {/* Window chrome */}
            <div className="flex items-center justify-between border-b-2 border-[#f4efe1] bg-[#233d58] px-4 py-2 font-mono text-xs font-bold uppercase text-[#fff4d6]">
              <span>gaestebuch.html</span>
              <span className="opacity-60">— □ ×</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="border-b-2 border-black p-3 space-y-2">
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="sr-only" htmlFor="gb-name">Your name</label>
                <input
                  id="gb-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={30}
                  placeholder="your name (optional)"
                  className="inset-field w-full bg-white px-3 py-2 font-mono text-xs outline-none placeholder:text-black/40 sm:w-32 sm:shrink-0"
                />
                <label className="sr-only" htmlFor="gb-message">Message</label>
                <input
                  id="gb-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={120}
                  required
                  placeholder="write something..."
                  className="inset-field w-full bg-white px-3 py-2 font-mono text-xs outline-none placeholder:text-black/40 sm:min-w-0 sm:flex-1"
                />
                <button
                  type="submit"
                  className="web-button w-full px-4 py-2 font-mono text-xs font-bold uppercase sm:w-auto sm:shrink-0"
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
                  <p className="text-sm leading-relaxed">
                    <span className="font-mono text-xs font-bold text-[#ba3929]">{entry.name}</span>
                    <span className="font-mono mx-2 text-xs">:</span>
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
        className="relative z-10 border-t-2 border-[#1a2838] bg-[#6aaec8] px-4 py-16 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="subhead mb-6 text-sm font-medium uppercase tracking-[0.3em]">
            Sign up for questions and news from the cafe.
          </p>
          <h2 className="hero-title text-[clamp(2.6rem,7vw,6rem)]">
            Don't be a stranger.
          </h2>
          <p className="subhead mt-2 text-xs uppercase tracking-widest text-[#1a2838]/35">
            Nicht fremd bleiben.
          </p>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed">
            New questions, good links, and a reason to come back every now and then.
          </p>

          {subscribed ? (
            <div className="mx-auto mt-10 inline-block border-2 border-[#1a2838] bg-[#dfb447] px-6 py-4 font-mono text-sm font-bold uppercase shadow-[5px_5px_0_#1a2838]">
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
          {subError && (
            <p className="mt-3 font-mono text-xs text-[#ba3929]">Something went wrong. Try again.</p>
          )}
        </div>

        {/* Colophon */}
        <div className="mx-auto mt-20 max-w-2xl border-t-2 border-black/20 pt-10 text-center font-mono text-[10px] leading-relaxed text-[#1a2838]/50">
          <p className="subhead mb-2 font-bold uppercase tracking-widest">Colophon</p>
          <p>
            Built by hand in Atlanta, Georgia. Set in{" "}
            Walbaum Book Pro,{" "}
            Futura Now, and system monospace.
            Made with React, Vite, and Tailwind CSS. Hosted on GitHub Pages.
            Data stored in Supabase.
          </p>
        </div>

        {/* Footer bar */}
        <div className="mt-10 flex flex-col gap-4 border-t-2 border-black pt-5 font-mono text-[9px] font-bold uppercase tracking-widest sm:flex-row sm:items-center sm:justify-between">
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
          <span>Made for humans</span>
        </div>
      </footer>
    </>
  );
}
