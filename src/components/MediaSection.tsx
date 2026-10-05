import { useState } from "react";
import { MEDIA, CATEGORY_COLORS, MediaItem } from "../lib/media";
import { DiscussionOverlay } from "./DiscussionOverlay";

function CdCaseCover({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  const accentColor = CATEGORY_COLORS[item.category];
  // CD jewel case: roughly square front panel with a grey plastic spine
  return (
    <button
      onClick={onClick}
      className="group flex shrink-0 flex-col text-left focus:outline-none"
      aria-label={`Open ${item.title}`}
      style={{ width: 207 }}
    >
      <div
        className="relative w-full overflow-hidden transition-transform duration-150 group-hover:-translate-y-2"
        style={{
          height: 207,
          boxShadow: "5px 7px 0 #1d2f31",
        }}
      >
        {/* Grey plastic spine — outer edge of the case past the hinge */}
        <div
          className="absolute inset-y-0 left-0 z-10"
          style={{
            width: 18,
            background: "linear-gradient(to right, #b0afad 0%, #8a8986 30%, #9e9d9b 55%, #7a7977 100%)",
            boxShadow: "inset -2px 0 3px rgba(0,0,0,0.35)",
          }}
        />

        {/* Cover face */}
        <div
          className="absolute inset-0 left-[18px]"
          style={{ background: item.image ? undefined : accentColor }}
        >
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {/* Thin inner border mimicking the tray edge */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.15), inset 0 0 8px rgba(0,0,0,0.25)" }}
          />
          {!item.image && (
            <div className="relative z-10 flex h-full flex-col justify-between p-[15px]">
              <span
                className="self-start px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest"
                style={{ background: "rgba(0,0,0,0.45)", color: "#fff4d6" }}
              >
                {item.category}
              </span>
              <div>
                <p
                  className="line-clamp-2 text-[15px] font-bold uppercase leading-tight tracking-wide"
                  style={{ fontFamily: '"Walbaum Book Pro", "Bodoni 72", Didot, serif', color: "#fff4d6" }}
                >
                  {item.title}
                </p>
                {item.creator && (
                  <p className="mt-1 font-mono text-[11px] leading-tight" style={{ color: "rgba(255,244,214,0.65)" }}>
                    {item.creator}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {item.image ? (
        <div className="mt-2 w-full">
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#293b3d]/40">{item.category}</p>
          <p
            className="mt-0.5 line-clamp-2 text-[13px] font-bold uppercase leading-tight tracking-wide"
            style={{ fontFamily: '"Walbaum Book Pro", "Bodoni 72", Didot, serif', color: "#1d2f31" }}
          >
            {item.title}
          </p>
          {item.creator && (
            <p className="mt-0.5 font-mono text-[10px] text-[#293b3d]/50">{item.creator}</p>
          )}
          {item.year && (
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-[#293b3d]/40">{item.year}</p>
          )}
        </div>
      ) : (
        <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-[#293b3d]/40">{item.category}</p>
      )}
    </button>
  );
}

function NotecardCover({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  // Index card: landscape, cream paper with ruled lines and a red margin
  const lineCount = 7;
  return (
    <button
      onClick={onClick}
      className="group flex shrink-0 flex-col text-left focus:outline-none"
      aria-label={`Open ${item.title}`}
      style={{ width: 225 }}
    >
      <div
        className="relative w-full overflow-hidden transition-transform duration-150 group-hover:-translate-y-2"
        style={{
          height: 155,
          borderRadius: 3,
          background: "#2D6B3F",
          boxShadow: "5px 7px 0 #1a3d28",
        }}
      >
        {/* Ruled lines */}
        <div className="absolute inset-0 flex flex-col justify-around pt-[30px] pb-[10px]">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="w-full" style={{ height: 1, background: "#ffffff", opacity: 0.15 }} />
          ))}
        </div>

        {/* Red margin line */}
        <div
          className="absolute inset-y-0"
          style={{ left: 34, width: 1.5, background: "#d9534f", opacity: 0.6 }}
        />

        {/* Content */}
        <div className="absolute inset-0 pl-[44px] pr-3">
          {/* Title between ruled lines 1 and 2 (~38–54px) */}
          <p
            className="absolute line-clamp-1 text-[13px] font-bold uppercase leading-none tracking-wide"
            style={{ top: 40, left: 44, right: 12, fontFamily: '"Walbaum Book Pro", "Bodoni 72", Didot, serif', color: "#fff4d6" }}
          >
            {item.title}
          </p>
          {/* Creator between ruled lines 2 and 3 (~54–70px) */}
          {item.creator && (
            <p
              className="absolute font-mono text-[10px] leading-none"
              style={{ top: 57, left: 44, color: "rgba(255,244,214,0.6)" }}
            >
              {item.creator}
            </p>
          )}
        </div>
      </div>
      <div className="mt-2 w-full">
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#293b3d]/40">{item.category}</p>
        <p
          className="mt-0.5 line-clamp-2 text-[13px] font-bold uppercase leading-tight tracking-wide"
          style={{ fontFamily: '"Walbaum Book Pro", "Bodoni 72", Didot, serif', color: "#1d2f31" }}
        >
          {item.title}
        </p>
        {item.creator && (
          <p className="mt-0.5 font-mono text-[10px] text-[#293b3d]/50">{item.creator}</p>
        )}
        {item.year && (
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-[#293b3d]/40">{item.year}</p>
        )}
      </div>
    </button>
  );
}

function MediaCover({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  if (item.category === "Music") return <CdCaseCover item={item} onClick={onClick} />;
  if (item.category === "Recipe") return <NotecardCover item={item} onClick={onClick} />;

  const accentColor = CATEGORY_COLORS[item.category];

  return (
    <button
      onClick={onClick}
      className="group flex shrink-0 flex-col text-left focus:outline-none"
      aria-label={`Open ${item.title}`}
      style={{ width: 195 }}
    >
      {/* Cover */}
      <div
        className="relative w-full overflow-hidden transition-transform duration-150 group-hover:-translate-y-2"
        style={{
          height: 273,
          borderRadius: item.category === "Film" ? 5 : 0,
          boxShadow: "5px 7px 0 #1d2f31",
        }}
      >
        {/* Spine */}
        <div
          className="absolute inset-y-0 left-0 w-[15px]"
          style={{ background: accentColor }}
        />

        {/* Cover face */}
        <div
          className="absolute inset-0 left-[15px] flex flex-col justify-between p-[18px]"
          style={{
            background: item.image ? undefined : accentColor,
          }}
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="relative z-10 flex flex-col justify-between h-full">
              <span
                className="self-start px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest"
                style={{ background: "rgba(0,0,0,0.45)", color: "#fff4d6" }}
              >
                {item.category}
              </span>
              <div>
                <p
                  className="line-clamp-3 text-[16px] font-bold uppercase leading-tight tracking-wide"
                  style={{ fontFamily: '"Walbaum Book Pro", "Bodoni 72", Didot, serif', color: "#fff4d6" }}
                >
                  {item.title}
                </p>
                {item.creator && (
                  <p className="mt-1 font-mono text-[11px] leading-tight" style={{ color: "rgba(255,244,214,0.65)" }}>
                    {item.creator}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Label below — only when the cover face shows an image */}
      {item.image ? (
        <div className="mt-2 w-full">
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#293b3d]/40">{item.category}</p>
          <p
            className="mt-0.5 line-clamp-2 text-[13px] font-bold uppercase leading-tight tracking-wide"
            style={{ fontFamily: '"Walbaum Book Pro", "Bodoni 72", Didot, serif', color: "#1d2f31" }}
          >
            {item.title}
          </p>
          {item.creator && (
            <p className="mt-0.5 font-mono text-[10px] text-[#293b3d]/50">{item.creator}</p>
          )}
          {item.year && (
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-[#293b3d]/40">{item.year}</p>
          )}
        </div>
      ) : (
        <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-[#293b3d]/40">{item.category}</p>
      )}
    </button>
  );
}

export function MediaSection({ onNavigate }: { onNavigate: () => void }) {
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const preview = MEDIA.slice(0, 5);

  return (
    <section
      id="media"
      className="relative z-10 border-y-2 border-[#293b3d] bg-[#f0dfba] px-4 py-16 sm:px-8 lg:py-20"
    >
      {/* Header */}
      <div className="mb-10 flex items-end justify-between border-b-2 border-black pb-3">
        <div>
          <h2 className="section-title">On the Shelf</h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#293b3d]/30">
            Was ich gerade liebe
          </span>
        </div>
        {MEDIA.length > 5 && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#293b3d]/40">
            +{MEDIA.length - 5} more
          </span>
        )}
      </div>

      {/* Cover row */}
      <div className="mb-10 flex gap-8 overflow-x-auto pb-4 pr-4 sm:pr-8">
        {preview.map((item) => (
          <MediaCover key={item.id} item={item} onClick={() => setSelected(item)} />
        ))}
      </div>

      <button
        onClick={onNavigate}
        className="web-button px-6 py-3 font-mono text-xs font-bold uppercase"
      >
        Browse the shelf &gt;&gt;
      </button>

      {selected && <DiscussionOverlay item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
