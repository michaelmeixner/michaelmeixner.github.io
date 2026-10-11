import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { WOCHENFRAGE } from "../lib/wochenfrage";

interface Answer {
  name: string;
  answer: string;
  created_at: string;
}

export function WeeklyQuestionSection() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase
      .from("wochenfrage_answers")
      .select("name, answer, created_at")
      .eq("week", WOCHENFRAGE.week)
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => { if (data) setAnswers(data as Answer[]); });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!answer.trim() || submitting) return;
    setSubmitting(true);
    const { data, error } = await supabase
      .from("wochenfrage_answers")
      .insert({ week: WOCHENFRAGE.week, name: name.trim() || "anonym", answer: answer.trim() })
      .select()
      .single();
    if (data && !error) {
      setAnswers((prev) => [data as Answer, ...prev]);
      setSent(true);
    }
    setSubmitting(false);
  }

  return (
    <section
      id="wochenfrage"
      className="relative z-10 bg-[#e8dfc8] px-4 py-16 sm:px-8 lg:py-20"
    >
      {/* Section header */}
      <div className="mb-10 flex items-end justify-between border-b-2 border-black pb-3">
        <div>
          <h2 className="section-title">Weekly Question</h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#1a2838]/30">
            Wochenfrage
          </span>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-widest sm:block">
          Woche #{WOCHENFRAGE.week} · {WOCHENFRAGE.year}
        </span>
      </div>

      <div className="grid gap-10">
        <div>
          <blockquote className="section-title mb-3 text-[clamp(1.8rem,4vw,3.2rem)] leading-tight">
            &ldquo;{WOCHENFRAGE.question}&rdquo;
          </blockquote>
          {WOCHENFRAGE.hint && (
            <p className="mb-6 font-mono text-xs italic text-[#1a2838]/50">
              ↳ {WOCHENFRAGE.hint}
            </p>
          )}

          {answers.length > 0 && (
            <p className="mb-8 font-mono text-[10px] uppercase tracking-widest text-[#ba3929]">
              {answers.length} {answers.length === 1 ? "person" : "people"} answered this week
            </p>
          )}

          {/* Answer form */}
          {sent ? (
            <div className="bevel-box bg-[#c4b498] p-6 font-mono text-sm text-[#1a2838]">
              <p className="font-bold text-[#ba3929]">Danke. ✓</p>
              <p className="mt-2 text-[#1a2838]/60">
                Your answer is in. Come back next week.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bevel-box bg-[#c4b498]">
              <div className="flex items-center justify-between border-b-2 border-[#f4efe1] bg-[#233d58] px-4 py-2 font-mono text-xs font-bold uppercase text-[#fff4d6]">
                <span>deine_antwort.txt</span>
                <span className="opacity-60">— □ ×</span>
              </div>
              <div className="space-y-4 p-5">
                <div>
                  <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-[#1a2838]/60">
                    Your name (optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Anonymous"
                    className="inset-field w-full bg-[#ede4c8] px-3 py-2 font-mono text-sm text-[#1a2838] placeholder-[#1a2838]/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-[#1a2838]/60">
                    Your answer *
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    rows={4}
                    placeholder="Write what you think..."
                    className="inset-field w-full resize-none bg-[#ede4c8] px-3 py-2 font-mono text-sm text-[#1a2838] placeholder-[#1a2838]/30"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!answer.trim() || submitting}
                  className="web-button px-6 py-2 font-mono text-xs font-bold uppercase disabled:opacity-40"
                >
                  {submitting ? "Sending..." : "Send >>"}
                </button>
              </div>
            </form>
          )}

          {/* This week's answers */}
          {answers.length > 0 && (
            <div className="mt-10">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[#1a2838]/40">
                What others said:
              </p>
              <div className="space-y-3">
                {answers.map((a, i) => (
                  <div key={i} className="border-l-2 border-[#ba3929] bg-[#e4d5a4] px-4 py-3">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#ba3929]">
                      {a.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">{a.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
