import { useState } from "react";

// Update WOCHENFRAGE each Monday to change the weekly question
const WOCHENFRAGE = {
  week: 42,
  year: 2025,
  question: "Welches Lied hörst du gerade auf Repeat?",
  hint: "What song have you had on repeat lately?",
  email: "hello@michaelmeixner.com",
};

const PREVIOUS_QUESTIONS = [
  { week: 41, question: "Was macht den perfekten Sonntagmorgen aus?" },
  { week: 40, question: "Welches Buch liegt gerade auf deinem Nachttisch?" },
  { week: 39, question: "Was war das beste Essen, das du je gegessen hast?" },
  { week: 38, question: "Wenn du morgen irgendwo aufwachen könntest — wo?" },
];

export function ProjectsSection() {
  const [answer, setAnswer] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Wochenfrage #${WOCHENFRAGE.week}: ${WOCHENFRAGE.question}`
    );
    const body = encodeURIComponent(
      `Name: ${name.trim() || "Anonym"}\n\nAnswer:\n${answer}`
    );
    window.location.href = `mailto:${WOCHENFRAGE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="wochenfrage"
      className="relative z-10 bg-[#f0dfba] px-4 py-16 sm:px-8 lg:py-20"
    >
      {/* Section header */}
      <div className="mb-10 flex items-end justify-between border-b-2 border-black pb-3">
        <div>
          <h2 className="section-title">Weekly Question</h2>
          <span className="subhead text-xs uppercase tracking-widest text-[#293b3d]/30">
            Wochenfrage
          </span>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-widest sm:block">
          Woche #{WOCHENFRAGE.week} · {WOCHENFRAGE.year}
        </span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Left: question + form */}
        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[#293b3d]/40">
            This week I'm asking:
          </p>
          <blockquote className="section-title mb-3 text-[clamp(1.8rem,4vw,3.2rem)] leading-tight">
            &ldquo;{WOCHENFRAGE.question}&rdquo;
          </blockquote>
          <p className="mb-10 font-mono text-xs italic text-[#293b3d]/50">
            ↳ {WOCHENFRAGE.hint}
          </p>

          {/* Answer form */}
          {sent ? (
            <div className="bevel-box bg-[#b2a58d] p-6 font-mono text-sm text-[#1d2f31]">
              <p className="font-bold text-[#a9322c]">Danke. ✓</p>
              <p className="mt-2 text-[#293b3d]/60">
                Your answer is on its way. Come back next week.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bevel-box bg-[#b2a58d]">
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b-2 border-[#f6e7c4] bg-[#315d68] px-4 py-2 font-mono text-xs font-bold uppercase text-[#fff4d6]">
                <span>deine_antwort.txt</span>
                <span className="opacity-60">— □ ×</span>
              </div>
              <div className="space-y-4 p-5">
                <div>
                  <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-[#293b3d]/60">
                    Your name (optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Anonymous"
                    className="inset-field w-full bg-[#f5e7c6] px-3 py-2 font-mono text-sm text-[#1d2f31] placeholder-[#293b3d]/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-[#293b3d]/60">
                    Your answer *
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    rows={4}
                    placeholder="Write what you think..."
                    className="inset-field w-full resize-none bg-[#f5e7c6] px-3 py-2 font-mono text-sm text-[#1d2f31] placeholder-[#293b3d]/30"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!answer.trim()}
                  className="web-button px-6 py-2 font-mono text-xs font-bold uppercase disabled:opacity-40"
                >
                  Send &gt;&gt;
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: previous questions archive */}
        <aside>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[#293b3d]/40">
            Previous questions:
          </p>
          <div className="border-2 border-black">
            {PREVIOUS_QUESTIONS.map((q, i) => (
              <div
                key={q.week}
                className={[
                  "p-4",
                  i < PREVIOUS_QUESTIONS.length - 1 ? "border-b-2 border-black" : "",
                ].join(" ")}
              >
                <span className="mb-1 block font-mono text-[9px] font-bold uppercase tracking-widest text-[#a9322c]">
                  Woche #{q.week}
                </span>
                <p className="font-serif text-sm italic leading-snug">
                  &ldquo;{q.question}&rdquo;
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[9px] leading-relaxed text-[#293b3d]/40">
            Every Monday, a new question.
            <br />
            Come back.
          </p>
        </aside>
      </div>
    </section>
  );
}
