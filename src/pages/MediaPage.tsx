import { FormEvent, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { CATEGORY_COLORS, MediaItem, Category } from "../lib/media";
import { useShelfItems } from "../lib/useShelfItems";
import { DiscussionOverlay } from "../components/DiscussionOverlay";

const CATEGORIES = Object.keys(CATEGORY_COLORS) as Category[];

function SuggestForm() {
  const [category, setCategory] = useState<Category>("Film");
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [year, setYear] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !note.trim() || submitting) return;
    setSubmitting(true);
    await supabase.from("shelf_suggestions").insert({
      category,
      title: title.trim(),
      creator: creator.trim(),
      year: year.trim() || null,
      note: note.trim(),
    });
    setSent(true);
    setSubmitting(false);
  }

  if (sent) {
    return (
      <div className="bevel-box bg-[#b2a58d] p-6 font-mono text-sm text-[#1d2f31]">
        <p className="font-bold text-[#2D6B3F]">Thanks. ✓</p>
        <p className="mt-1 text-[#293b3d]/60">Your suggestion is in — we'll review it soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bevel-box bg-[#b2a58d]">
      <div className="flex items-center justify-between border-b-2 border-[#f6e7c4] bg-[#315d68] px-4 py-2 font-mono text-xs font-bold uppercase text-[#fff4d6]">
        <span>vorschlag.txt</span>
        <span className="opacity-60">— □ ×</span>
      </div>
      <div className="space-y-3 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-[#293b3d]/60">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="inset-field w-full bg-[#f5e7c6] px-3 py-2 font-mono text-sm text-[#1d2f31]"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-[#293b3d]/60">Year</label>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              maxLength={4}
              placeholder="e.g. 2024"
              className="inset-field w-full bg-[#f5e7c6] px-3 py-2 font-mono text-sm text-[#1d2f31] placeholder-[#293b3d]/30"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-[#293b3d]/60">Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            required
            placeholder="Title"
            className="inset-field w-full bg-[#f5e7c6] px-3 py-2 font-mono text-sm text-[#1d2f31] placeholder-[#293b3d]/30"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-[#293b3d]/60">Creator / Director / Artist</label>
          <input
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            maxLength={100}
            placeholder="Optional"
            className="inset-field w-full bg-[#f5e7c6] px-3 py-2 font-mono text-sm text-[#1d2f31] placeholder-[#293b3d]/30"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-[#293b3d]/60">Why should it be on the shelf? *</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={500}
            required
            rows={3}
            placeholder="Say something about it..."
            className="inset-field w-full resize-none bg-[#f5e7c6] px-3 py-2 font-mono text-sm text-[#1d2f31] placeholder-[#293b3d]/30"
          />
        </div>
        <button
          type="submit"
          disabled={!title.trim() || !note.trim() || submitting}
          className="web-button px-6 py-2 font-mono text-xs font-bold uppercase disabled:opacity-40"
        >
          {submitting ? "Sending..." : "Suggest >>"}
        </button>
      </div>
    </form>
  );
}

export function MediaPage({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const items = useShelfItems();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="site-shell min-h-screen bg-[#b2a58d] text-[#1d2f31]">
      {/* Page header */}
      <div className="relative z-10 border-b-2 border-[#293b3d] bg-[#f0dfba] px-4 py-8 sm:px-8">
        <button
          onClick={onBack}
          className="classic-link mb-6 inline-block font-mono text-[10px] uppercase tracking-widest"
        >
          ← Back to Bei Meixner
        </button>
        <h1 className="section-title text-[clamp(2rem,5vw,3.5rem)]">On the Shelf</h1>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#293b3d]/30">
          Was ich gerade liebe
        </span>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#293b3d]/60">
          What I'm into right now. Click any card to read more and leave a comment.
        </p>
      </div>

      {/* Card grid */}
      <div className="relative z-10 bg-[#f0dfba] px-4 pb-16 sm:px-8">
        <div className="grid border-x-2 border-t-2 border-black sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const accentColor = CATEGORY_COLORS[item.category];
            return (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={[
                  "group flex min-h-[280px] w-full flex-col justify-between border-b-2 border-black p-6 text-left transition-colors hover:bg-white/50 sm:p-8",
                  index % 2 !== 1 ? "sm:border-r-2" : "",
                  index % 3 !== 2 ? "lg:border-r-2" : "",
                  index % 2 !== 1 && index % 3 === 2 ? "lg:border-r-0" : "",
                ].filter(Boolean).join(" ")}
              >
                <div>
                  {item.image ? (
                    <div className="-mx-6 -mt-6 mb-6 sm:-mx-8 sm:-mt-8">
                      <img src={item.image} alt={item.title} className="h-40 w-full object-cover" />
                    </div>
                  ) : (
                    <div className="mb-8" />
                  )}
                  <div className="mb-3 flex items-start justify-between font-mono text-[10px] font-bold tracking-widest">
                    <span className="px-2 py-0.5 uppercase text-white" style={{ background: accentColor }}>
                      {item.category}
                    </span>
                    <span className="text-[#293b3d]/40">↗</span>
                  </div>
                  <h3 className="section-title text-[clamp(1.4rem,3vw,2rem)] leading-tight">{item.title}</h3>
                  <p className="mt-1 font-mono text-[10px] text-[#293b3d]/50">
                    {item.creator}{item.year ? ` · ${item.year}` : ""}
                  </p>
                </div>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#293b3d]/70">{item.note}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Suggest form */}
      <div className="relative z-10 border-t-2 border-[#293b3d] bg-[#315d68] px-4 py-16 sm:px-8">
        <div className="mb-8">
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#e8c46b]">
            Suggest something
          </p>
          <h2 className="section-title text-[clamp(1.6rem,4vw,2.8rem)] text-[#fff4d6]">
            What should be on here?
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
            Suggest a film, album, magazine, or recipe. I'll review it and add it if it fits.
          </p>
        </div>
        <div className="max-w-xl">
          <SuggestForm />
        </div>
      </div>

      {selected && <DiscussionOverlay item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
