import { FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { supabase } from "../lib/supabase";
import { MediaItem, CATEGORY_COLORS } from "../lib/media";

interface DiscussionEntry {
  name: string;
  message: string;
  created_at: string;
}

export function DiscussionOverlay({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  const [entries, setEntries] = useState<DiscussionEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const accentColor = CATEGORY_COLORS[item.category];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    supabase
      .from("media_discussions")
      .select("name, message, created_at")
      .eq("media_id", item.id)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (data) setEntries(data as DiscussionEntry[]);
        setLoading(false);
      });
  }, [item.id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!message.trim() || submitting) return;
    setSubmitting(true);
    const { data, error } = await supabase
      .from("media_discussions")
      .insert({ media_id: item.id, name: name.trim() || "anonym", message: message.trim() })
      .select()
      .single();
    if (data && !error) setEntries((prev) => [data as DiscussionEntry, ...prev]);
    setMessage("");
    setSubmitting(false);
    setTimeout(() => listRef.current?.scrollTo({ top: 0, behavior: "smooth" }), 50);
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 py-8"
      onClick={onClose}
    >
      <div
        className="my-auto flex w-full flex-col border-2 border-[#f6e7c4] bg-[#b2a58d] shadow-[12px_12px_0_rgba(31,45,46,0.8)]"
        style={{ maxWidth: "min(680px, 92vw)", maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex shrink-0 items-center justify-between border-b-2 border-[#f6e7c4] px-4 py-2 font-mono text-xs font-bold uppercase text-[#fff4d6]"
          style={{ background: accentColor }}
        >
          <span>{item.title}</span>
          <button onClick={onClose} className="web-button px-2 py-0.5 font-mono text-xs font-bold leading-none" aria-label="Close">×</button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="border-b-2 border-black/20 bg-[#f0dfba]">
            {item.image && (
              <div className="border-b-2 border-black/20">
                <img src={item.image} alt={item.title} className="max-h-64 w-full object-cover" />
              </div>
            )}
            <div className="p-6">
              <span
                className="mb-3 inline-block px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-white"
                style={{ background: accentColor }}
              >
                {item.category}
              </span>
              <h3 className="section-title text-[clamp(1.6rem,4vw,2.4rem)] leading-tight">{item.title}</h3>
              <p className="mt-1 font-mono text-xs text-[#293b3d]/60">
                {item.creator}{item.year ? ` · ${item.year}` : ""}
              </p>
              <p className="mt-4 max-w-lg leading-relaxed text-[#1d2f31]">{item.note}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="classic-link mt-3 inline-block font-mono text-[10px] uppercase tracking-widest"
                >
                  → View link ↗
                </a>
              )}
            </div>
          </div>

          <div className="p-5">
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#293b3d]/50">Discussion</p>
            <form onSubmit={handleSubmit} className="mb-5">
              <div className="flex gap-2">
                <input value={name} onChange={(e) => setName(e.target.value)} maxLength={30} placeholder="your name (optional)" className="inset-field w-32 shrink-0 bg-white px-3 py-2 font-mono text-xs outline-none placeholder:text-black/40" />
                <input value={message} onChange={(e) => setMessage(e.target.value)} maxLength={300} required placeholder="say something..." className="inset-field min-w-0 flex-1 bg-white px-3 py-2 font-mono text-xs outline-none placeholder:text-black/40" />
                <button type="submit" disabled={!message.trim() || submitting} className="web-button shrink-0 px-4 font-mono text-xs font-bold uppercase disabled:opacity-40">Post</button>
              </div>
            </form>
            <div ref={listRef} className="border-2 border-black">
              {loading && <p className="p-4 font-mono text-xs text-black/40">Loading...</p>}
              {!loading && entries.length === 0 && <p className="p-4 font-mono text-xs italic text-black/40">No replies yet. Be the first.</p>}
              {entries.map((entry, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto] gap-2 border-b border-black/20 p-4 last:border-0">
                  <p className="text-sm leading-relaxed">
                    <span className="font-mono text-xs font-bold" style={{ color: accentColor }}>{entry.name}</span>
                    <span className="font-mono mx-2 text-xs">:</span>
                    {entry.message}
                  </p>
                  <span className="whitespace-nowrap font-mono text-[9px] uppercase text-black/40">
                    {new Date(entry.created_at).toLocaleDateString("en-GB")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t-2 border-[#f6e7c4] px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-[#1d2f31]/50">
          esc or click outside to close
        </div>
      </div>
    </div>,
    document.body
  );
}
