"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type Locale = "id" | "en";
type Level = "dasar" | "sedang" | "lanjut";
type Stage = "question" | "result" | "recommendation";
type AnswerMap = Record<string, string>;
type LocalizedText = { id: string; en: string };
type Question = {
  id: string;
  topic: LocalizedText;
  prompt: LocalizedText;
  options: Array<{ value: string; label: LocalizedText }>;
  correct: string;
};

const questions: Question[] = [
  {
    id: "q1",
    topic: { id: "konsep dasar zat adiktif", en: "core concept of addictive substances" },
    prompt: {
      id: "Pernyataan yang paling tepat tentang zat adiktif adalah...",
      en: "Which statement best describes addictive substances?",
    },
    options: [
      {
        value: "a",
        label: {
          id: "Zat yang hanya memengaruhi rasa makanan.",
          en: "Substances that only affect food taste.",
        },
      },
      {
        value: "b",
        label: {
          id: "Zat yang dapat memengaruhi tubuh dan menimbulkan ketergantungan.",
          en: "Substances that can affect the body and cause dependency.",
        },
      },
      {
        value: "c",
        label: {
          id: "Zat yang selalu aman jika dipakai sedikit.",
          en: "Substances that are always safe in small amounts.",
        },
      },
      {
        value: "d",
        label: {
          id: "Zat yang hanya ditemukan di laboratorium.",
          en: "Substances found only in laboratories.",
        },
      },
    ],
    correct: "b",
  },
  {
    id: "q2",
    topic: { id: "literasi halal", en: "halal literacy" },
    prompt: {
      id: "Perilaku literasi halal yang paling tepat saat memilih produk adalah...",
      en: "Which behavior best reflects halal literacy when choosing a product?",
    },
    options: [
      {
        value: "a",
        label: {
          id: "Memilih berdasarkan iklan saja.",
          en: "Choosing based on advertising only.",
        },
      },
      {
        value: "b",
        label: {
          id: "Mengikuti pilihan teman tanpa memeriksa isi produk.",
          en: "Following a friend’s choice without checking the product.",
        },
      },
      {
        value: "c",
        label: {
          id: "Memeriksa label, komposisi, dan potensi mudaratnya.",
          en: "Checking the label, ingredients, and potential harm.",
        },
      },
      {
        value: "d",
        label: {
          id: "Membeli produk yang paling murah tanpa pertimbangan lain.",
          en: "Buying the cheapest product without other considerations.",
        },
      },
    ],
    correct: "c",
  },
  {
    id: "q3",
    topic: { id: "dampak pada organ", en: "organ impact" },
    prompt: {
      id: "Organ yang dapat terdampak oleh zat adiktif adalah...",
      en: "Organs that may be affected by addictive substances include...",
    },
    options: [
      {
        value: "a",
        label: {
          id: "Hanya otak.",
          en: "Only the brain.",
        },
      },
      {
        value: "b",
        label: {
          id: "Otak, jantung, paru, dan hati.",
          en: "Brain, heart, lungs, and liver.",
        },
      },
      {
        value: "c",
        label: {
          id: "Hanya paru dan hati.",
          en: "Only lungs and liver.",
        },
      },
      {
        value: "d",
        label: {
          id: "Tidak ada organ yang terdampak.",
          en: "No organs are affected.",
        },
      },
    ],
    correct: "b",
  },
  {
    id: "q4",
    topic: { id: "pengambilan keputusan", en: "decision making" },
    prompt: {
      id: "Saat ragu terhadap ajakan mencoba zat tertentu, respons paling aman adalah...",
      en: "When unsure about an invitation to try a substance, the safest response is...",
    },
    options: [
      {
        value: "a",
        label: {
          id: "Mengikuti dulu agar tidak dianggap berbeda.",
          en: "Joining in first so you don’t seem different.",
        },
      },
      {
        value: "b",
        label: {
          id: "Mencoba sedikit selama diawasi teman.",
          en: "Trying a small amount while being watched by friends.",
        },
      },
      {
        value: "c",
        label: {
          id: "Mencari informasi lalu menolak dengan tegas dan santun.",
          en: "Seeking information and refusing firmly but politely.",
        },
      },
      {
        value: "d",
        label: {
          id: "Diam dan membiarkan situasi berjalan.",
          en: "Staying silent and letting the situation continue.",
        },
      },
    ],
    correct: "c",
  },
  {
    id: "q5",
    topic: { id: "mekanisme kimia", en: "chemical mechanism" },
    prompt: {
      id: "Tujuan mempelajari mekanisme kimia zat adiktif di tubuh adalah...",
      en: "The purpose of learning the chemical mechanism of addictive substances in the body is...",
    },
    options: [
      {
        value: "a",
        label: {
          id: "Agar bisa meniru efek zat dengan lebih cepat.",
          en: "To imitate the effects of substances more quickly.",
        },
      },
      {
        value: "b",
        label: {
          id: "Agar dapat memahami proses masuk, kerja, dan dampaknya secara bertanggung jawab.",
          en: "To understand their entry, action, and impact responsibly.",
        },
      },
      {
        value: "c",
        label: {
          id: "Agar tidak perlu membaca label produk.",
          en: "So there is no need to read product labels.",
        },
      },
      {
        value: "d",
        label: {
          id: "Agar semua keputusan bisa diserahkan kepada teman.",
          en: "So all decisions can be left to friends.",
        },
      },
    ],
    correct: "b",
  },
];

const priorityByLevel: Record<Level, string[]> = {
  dasar: ["M1", "M2", "M5", "M6"],
  sedang: ["M2", "M3", "M4", "M5", "M6"],
  lanjut: ["M3", "M4", "M6", "M7"],
};

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "id";
  try {
    const saved = window.localStorage.getItem("sains-edu-locale");
    return saved === "en" ? "en" : "id";
  } catch {
    return "id";
  }
}

function revealDelayStyle(delayMs: number): React.CSSProperties {
  return { "--reveal-delay": `${delayMs}ms` } as unknown as React.CSSProperties;
}

function getLevel(score: number): Level {
  if (score <= 2) return "dasar";
  if (score <= 4) return "sedang";
  return "lanjut";
}

function pick(locale: Locale, text: LocalizedText): string {
  return locale === "id" ? text.id : text.en;
}

export default function PretestPage() {
  const router = useRouter();
  const [locale] = useState<Locale>(() => getInitialLocale());
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("question");
  const backToChoosePath = useCallback(
    () => router.push("/dashboard?step=2"),
    [router]
  );

  useEffect(() => {
    const onPopState = () => backToChoosePath();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [backToChoosePath]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-up")
    );

    for (const el of elements) el.classList.remove("is-visible");

    if (typeof window.IntersectionObserver === "undefined") {
      for (const el of elements) el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [activeIndex, locale, stage]);

  const t = useMemo(
    () =>
      locale === "id"
        ? {
            home: "Home",
            title: "Pre-test Diagnostik",
            desc:
              "Tampilan soal mengikuti storyboard: satu soal per layar, ada indikator nomor, tombol sebelumnya/berikutnya, dan kirim pada soal terakhir.",
            questionTitle: "Soal...",
            answerHint: "Pilih jawaban A-D.",
            questionIntro: "Jawab satu per satu untuk memetakan kemampuan awalmu.",
            topicLabel: "Topik soal",
            progressLabel: "Progres pengerjaan",
            progressDone: "soal terjawab",
            chooseBest: "Pilih jawaban terbaik",
            prev: "Prev",
            next: "Next",
            submit: "Kirim",
            resultTitle: "Skor dan Profil Awal",
            scoreLabel: "Skor",
            summaryTitle: "Ringkasan",
            adviceTitle: "Saran",
            recommendationTitle: "Rekomendasi Level",
            recommendationButton: "Lihat Rekomendasi",
            restart: "Ulangi",
            startRoute: "Mulai Jalur",
            openMap: "Ke Peta Modul",
            priorityTitle: "Modul prioritas",
            recommendationLead: "Jalur yang paling sesuai untukmu saat ini",
            scoreInsight: "Pembacaan hasil",
            selectedPath: "Jalur terpilih",
            allPaths: "Perbandingan semua jalur",
            nextFocus: "Fokus belajarmu berikutnya",
            scoreTag: "Skor diagnostik",
            unanswered: "Pilih salah satu jawaban sebelum lanjut.",
            strengthsPrefix: "Kuat di",
            needsPrefix: "Perlu penguatan",
            levelNames: {
              dasar: "Dasar",
              sedang: "Sedang",
              lanjut: "Lanjut",
            },
            levelDescriptions: {
              dasar:
                "Fokus pada penguatan konsep awal, klasifikasi, dan literasi halal sebelum lanjut ke analisis kasus.",
              sedang:
                "Cocok untuk memperdalam mekanisme kimia, dampak organ, dan pengambilan keputusan yang lebih analitis.",
              lanjut:
                "Siap masuk ke pembelajaran dengan penekanan pada analisis terpadu, studi kasus, dan evaluasi akhir.",
            },
            stageLabels: {
              question: "Soal Diagnostik",
              result: "Hasil Diagnostik",
              recommendation: "Rekomendasi Jalur",
            },
            scoreSummary: {
              dasar:
                "Profil awal menunjukkan kamu masih perlu penguatan konsep inti sebelum masuk ke jalur belajar yang lebih kompleks.",
              sedang:
                "Profil awal menunjukkan kamu sudah punya dasar yang cukup, tetapi masih perlu penguatan pada beberapa area penting.",
              lanjut:
                "Profil awal menunjukkan kamu siap mengikuti jalur belajar dengan ritme yang lebih menantang.",
            },
          }
        : {
            home: "Home",
            title: "Diagnostic Pre-test",
            desc:
              "The question flow follows the storyboard: one question per screen, a question number indicator, previous/next controls, and submit on the last question.",
            questionTitle: "Question...",
            answerHint: "Choose answer A-D.",
            questionIntro: "Answer one by one to map your initial understanding.",
            topicLabel: "Question topic",
            progressLabel: "Progress",
            progressDone: "questions answered",
            chooseBest: "Choose the best answer",
            prev: "Prev",
            next: "Next",
            submit: "Submit",
            resultTitle: "Score and Initial Profile",
            scoreLabel: "Score",
            summaryTitle: "Summary",
            adviceTitle: "Suggestion",
            recommendationTitle: "Level Recommendation",
            recommendationButton: "See Recommendation",
            restart: "Retake",
            startRoute: "Start Route",
            openMap: "Go to Module Map",
            priorityTitle: "Priority modules",
            recommendationLead: "The route that best fits you right now",
            scoreInsight: "Result insight",
            selectedPath: "Selected route",
            allPaths: "All route comparison",
            nextFocus: "Your next learning focus",
            scoreTag: "Diagnostic score",
            unanswered: "Choose one answer before continuing.",
            strengthsPrefix: "Strong in",
            needsPrefix: "Needs improvement in",
            levelNames: {
              dasar: "Basic",
              sedang: "Intermediate",
              lanjut: "Advanced",
            },
            levelDescriptions: {
              dasar:
                "Focuses on strengthening core concepts, classification, and halal literacy before moving to case analysis.",
              sedang:
                "Suitable for deepening chemical mechanisms, organ impact, and more analytical decision making.",
              lanjut:
                "Ready to enter a learning route with stronger emphasis on integrated analysis, case studies, and final evaluation.",
            },
            stageLabels: {
              question: "Diagnostic Question",
              result: "Diagnostic Result",
              recommendation: "Route Recommendation",
            },
            scoreSummary: {
              dasar:
                "Your initial profile shows that you still need stronger reinforcement on core concepts before entering a more complex route.",
              sedang:
                "Your initial profile shows that you already have a fair foundation, but still need reinforcement in some important areas.",
              lanjut:
                "Your initial profile shows that you are ready for a more challenging learning route.",
            },
          },
    [locale]
  );

  const totalQuestions = questions.length;
  const currentQuestion = questions[activeIndex];
  const currentAnswer = answers[currentQuestion.id];
  const score = useMemo(
    () =>
      questions.reduce((total, question) => {
        return total + (answers[question.id] === question.correct ? 1 : 0);
      }, 0),
    [answers]
  );
  const recommendation = getLevel(score);
  const priorityModules = priorityByLevel[recommendation];
  const recommendationAccent =
    recommendation === "dasar"
      ? "#0f766e"
      : recommendation === "sedang"
        ? "#7c3aed"
        : "#ea580c";

  const correctTopics = questions
    .filter((question) => answers[question.id] === question.correct)
    .map((question) => pick(locale, question.topic));
  const wrongTopics = questions
    .filter((question) => answers[question.id] !== question.correct)
    .map((question) => pick(locale, question.topic));

  const strengthsText =
    correctTopics.length > 0
      ? `${t.strengthsPrefix} ${correctTopics.join(", ")}.`
      : locale === "id"
        ? "Kuat di belum tampak konsisten, sehingga masih perlu penguatan menyeluruh."
        : "No strong area is consistently visible yet, so broader reinforcement is still needed.";
  const needsText =
    wrongTopics.length > 0
      ? `${t.needsPrefix} ${wrongTopics.join(", ")}.`
      : locale === "id"
        ? "Perlu penguatan hanya ringan pada pengayaan dan pendalaman materi."
        : "Only minor reinforcement is needed for enrichment and deeper study.";

  const onSelectAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const onRetake = () => {
    setAnswers({});
    setActiveIndex(0);
    setStage("question");
  };

  const onOpenModuleMap = () => {
    window.localStorage.setItem("sains-edu-recommended-level", recommendation);
    window.localStorage.setItem("sains-edu-pretest-score", String(score));
    window.localStorage.setItem(
      "sains-edu-pretest-profile",
      t.scoreSummary[recommendation]
    );
    router.push(`/dashboard/explore?entry=recommended&level=${recommendation}`);
  };

  const onPrev = () => {
    if (stage === "question") {
      if (activeIndex === 0) {
        backToChoosePath();
        return;
      }
      setActiveIndex((prev) => prev - 1);
      return;
    }

    if (stage === "result") {
      setStage("question");
      setActiveIndex(totalQuestions - 1);
      return;
    }

    setStage("result");
  };

  const onNext = () => {
    if (stage === "question") {
      if (!currentAnswer) {
        window.alert(t.unanswered);
        return;
      }

      if (activeIndex < totalQuestions - 1) {
        setActiveIndex((prev) => prev + 1);
        return;
      }

      setStage("result");
      return;
    }

    if (stage === "result") {
      setStage("recommendation");
      return;
    }

    onOpenModuleMap();
  };

  const footerRightLabel =
    stage === "question"
      ? activeIndex === totalQuestions - 1
        ? t.submit
        : t.next
      : stage === "result"
        ? t.recommendationButton
        : t.openMap;

  return (
    <div className="min-h-dvh bg-white">
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={backToChoosePath}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:bg-zinc-50"
            aria-label="Back"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d="M15 6 9 12l6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-500">{t.home}</p>
              <p className="truncate text-sm font-semibold text-zinc-900">
                {stage === "question" ? t.title : t.stageLabels[stage]}
              </p>
            </div>

            <Image
              src="/Logo.png"
              alt="Edu Sains"
              width={180}
              height={36}
              priority
              className="hidden h-7 w-auto select-none sm:block"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 py-6 pb-24 sm:px-6 sm:py-8 sm:pb-28">
        {stage === "question" ? (
          <section className="reveal-up overflow-hidden rounded-[2rem] border border-zinc-200/70 bg-white shadow-[0_20px_60px_-38px_rgba(15,23,42,0.35)] ring-1 ring-zinc-200/60">
            <div className="border-b border-zinc-200/70 bg-[linear-gradient(135deg,rgba(46,193,185,0.14),rgba(255,255,255,0.95))] p-6 sm:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <span className="inline-flex rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-zinc-700 shadow-sm">
                    {t.questionTitle}
                  </span>
                  <h1 className="mt-4 text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                    {pick(locale, currentQuestion.prompt)}
                  </h1>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">
                    {t.questionIntro}
                  </p>
                </div>

                <div className="w-full max-w-sm rounded-3xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      {t.progressLabel}
                    </p>
                    <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-semibold text-zinc-700">
                      {activeIndex + 1}/{totalQuestions}
                    </span>
                  </div>
                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-zinc-200/80">
                    <div
                      className="h-full rounded-full bg-[var(--brand)]"
                      style={{ width: `${((activeIndex + 1) / totalQuestions) * 100}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-zinc-600">
                    {Object.keys(answers).length}/{totalQuestions} {t.progressDone}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-3 rounded-3xl bg-zinc-50/80 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    {t.topicLabel}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-zinc-900">
                    {pick(locale, currentQuestion.topic)}
                  </p>
                </div>
                <div className="inline-flex rounded-full border border-zinc-200/70 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm">
                  {t.chooseBest}
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-zinc-600">{t.answerHint}</p>

              <div className="mt-6 grid gap-3">
              {currentQuestion.options.map((option, index) => {
                const selected = currentAnswer === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onSelectAnswer(currentQuestion.id, option.value)}
                    className={`group flex items-start gap-4 rounded-3xl border px-4 py-4 text-left shadow-sm transition-all hover:-translate-y-0.5 ${
                      selected
                        ? "border-transparent text-white shadow-[0_18px_40px_-28px_rgba(46,193,185,0.9)]"
                        : "border-zinc-200 bg-white text-zinc-800 hover:border-[var(--brand)]/25 hover:bg-zinc-50"
                    }`}
                    style={
                      selected
                        ? { ...revealDelayStyle(index * 60), backgroundColor: "var(--brand)" }
                        : revealDelayStyle(index * 60)
                    }
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold transition-colors ${
                        selected
                          ? "bg-white/15 text-white"
                          : "bg-zinc-100 text-zinc-700 group-hover:bg-[rgba(46,193,185,0.12)]"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-6">
                        {pick(locale, option.label)}
                      </p>
                    </div>
                  </button>
                );
              })}
              </div>
            </div>
          </section>
        ) : null}

        {stage === "result" ? (
          <section className="space-y-6">
            <div className="reveal-up rounded-3xl bg-white p-6 ring-1 ring-zinc-200/70 sm:p-8">
              <h1 className="text-lg font-semibold text-zinc-900">
                {t.resultTitle}
              </h1>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{t.desc}</p>

              <div className="mt-8 flex justify-center">
                <div className="flex h-36 w-36 flex-col items-center justify-center rounded-3xl bg-zinc-50 ring-1 ring-zinc-200/70">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    {t.scoreLabel}
                  </p>
                  <p className="mt-2 text-4xl font-semibold text-zinc-900">
                    {score}/{totalQuestions}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="reveal-up rounded-2xl bg-zinc-50 p-5" style={revealDelayStyle(40)}>
                  <p className="text-base font-semibold text-zinc-900">
                    {t.summaryTitle}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-700">
                    {strengthsText}
                  </p>
                </div>

                <div className="reveal-up rounded-2xl bg-zinc-50 p-5" style={revealDelayStyle(80)}>
                  <p className="text-base font-semibold text-zinc-900">
                    {t.adviceTitle}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-700">
                    {needsText}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {stage === "recommendation" ? (
          <section className="space-y-6">
            <div className="reveal-up overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] ring-1 ring-zinc-200/60 sm:p-0">
              <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative overflow-hidden p-6 sm:p-8">
                  <div
                    className="absolute -right-10 -top-12 h-40 w-40 rounded-full opacity-20 blur-2xl"
                    style={{ backgroundColor: recommendationAccent }}
                  />
                  <div className="relative">
                    <span
                      className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: recommendationAccent }}
                    >
                      {t.recommendationLead}
                    </span>
                    <h1 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                      {t.recommendationTitle}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
                      {t.scoreSummary[recommendation]}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <div className="rounded-2xl border border-zinc-200/70 bg-white px-4 py-3 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          {t.scoreTag}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-zinc-950">
                          {score}/{totalQuestions}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-zinc-200/70 bg-white px-4 py-3 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          {t.selectedPath}
                        </p>
                        <p
                          className="mt-1 text-lg font-semibold"
                          style={{ color: recommendationAccent }}
                        >
                          {t.levelNames[recommendation]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-200/70 bg-zinc-50/70 p-6 sm:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-semibold text-zinc-900">
                    {t.scoreInsight}
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200/70">
                      <p className="text-sm font-semibold text-zinc-900">
                        {t.summaryTitle}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        {strengthsText}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200/70">
                      <p className="text-sm font-semibold text-zinc-900">
                        {t.adviceTitle}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        {needsText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-200/70 p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {t.allPaths}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">
                      {t.nextFocus}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                {(["dasar", "sedang", "lanjut"] as Level[]).map((level, index) => {
                  const active = recommendation === level;
                  return (
                    <div
                      key={level}
                      className={`reveal-up rounded-3xl border p-5 transition-all ${
                        active
                          ? "border-transparent text-white shadow-lg"
                          : "border-zinc-200 bg-white text-zinc-800 shadow-sm"
                      }`}
                      style={
                        active
                          ? {
                              ...revealDelayStyle(index * 70),
                              backgroundColor:
                                level === "dasar"
                                  ? "#0f766e"
                                  : level === "sedang"
                                    ? "#7c3aed"
                                    : "#ea580c",
                            }
                          : revealDelayStyle(index * 70)
                      }
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-lg font-semibold">{t.levelNames[level]}</p>
                        {active ? (
                          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white">
                            {t.selectedPath}
                          </span>
                        ) : null}
                      </div>
                      <p
                        className={`mt-3 text-sm leading-6 ${
                          active ? "text-white/90" : "text-zinc-600"
                        }`}
                      >
                        {t.levelDescriptions[level]}
                      </p>
                    </div>
                  );
                })}
                </div>

                <div className="mt-6 rounded-3xl bg-zinc-50 p-5">
                  <p className="text-sm font-semibold text-zinc-900">
                    {t.priorityTitle}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {priorityModules.map((item, index) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-200/70 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm"
                        style={revealDelayStyle(index * 50)}
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: recommendationAccent }}
                        />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={onOpenModuleMap}
                    className="rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                    style={{ backgroundColor: recommendationAccent }}
                  >
                    {t.startRoute}
                  </button>
                  <button
                    type="button"
                    onClick={onRetake}
                    className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50"
                  >
                    {t.restart}
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <div className="fixed bottom-4 left-4 right-4 sm:bottom-8 sm:left-auto sm:right-8">
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto">
          <button
            type="button"
            onClick={onPrev}
            className="reveal-up flex-1 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 sm:flex-none"
          >
            {t.prev}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={stage === "question" && !currentAnswer}
            className="reveal-up flex-1 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:bg-zinc-300 sm:flex-none"
            style={
              stage === "question" && !currentAnswer
                ? revealDelayStyle(80)
                : { ...revealDelayStyle(80), backgroundColor: "var(--brand)" }
            }
          >
            {footerRightLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
