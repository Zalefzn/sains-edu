"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getDefaultModuleProgress,
  modules,
  pick,
  priorityByLevel,
  sanitizeModuleProgress,
  type Level,
  type Locale,
  type ModuleCode,
} from "../module-data";
import { glossaryTerms, references } from "../reference-data";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "id";
  try {
    const saved = window.localStorage.getItem("sains-edu-locale");
    return saved === "en" ? "en" : "id";
  } catch {
    return "id";
  }
}

function EvaluateCTA({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [lastScore, setLastScore] = useState<string | null>(null);
  const [lastBadge, setLastBadge] = useState<string | null>(null);

  useEffect(() => {
    setLastScore(localStorage.getItem("sains-edu-evaluate-score"));
    setLastBadge(localStorage.getItem("sains-edu-evaluate-badge"));
  }, []);

  const label = locale === "id" ? "Mulai Evaluasi Sumatif" : "Start Summative Evaluation";
  const retake = locale === "id" ? "Ulangi Evaluasi" : "Retake";
  const prev = locale === "id" ? "Skor Terakhir" : "Last Score";

  return (
    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
      {lastScore !== null && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
          {prev}: <span className="font-bold text-zinc-900">{lastScore}/14</span>
          {lastBadge && <span className="ml-2 text-zinc-500">— {lastBadge}</span>}
        </div>
      )}
      <button
        onClick={() => router.push("/dashboard/evaluate")}
        className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md"
        style={{ backgroundColor: "var(--brand)" }}
      >
        {lastScore !== null ? retake : label}
      </button>
    </div>
  );
}

function revealDelayStyle(delayMs: number): React.CSSProperties {
  return { "--reveal-delay": `${delayMs}ms` } as unknown as React.CSSProperties;
}

type EntryMode = "free" | "recommended";

export default function ExplorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [locale] = useState<Locale>(() => getInitialLocale());
  const [entryMode, setEntryMode] = useState<EntryMode>("free");
  const [recommendedLevel, setRecommendedLevel] = useState<Level>("dasar");
  const [storedScore, setStoredScore] = useState("");
  const [storedProfile, setStoredProfile] = useState("");
  const [moduleProgress, setModuleProgress] = useState(() =>
    getDefaultModuleProgress()
  );
  const [glossarySearch, setGlossarySearch] = useState("");
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
  }, [locale, moduleProgress]);

  useEffect(() => {
    const queryEntry = searchParams.get("entry");
    const queryLevel = searchParams.get("level");
    const nextEntry: EntryMode =
      queryEntry === "recommended" ? "recommended" : "free";
    const savedLevel = window.localStorage.getItem(
      "sains-edu-recommended-level"
    );
    const nextLevel: Level =
      queryLevel === "dasar" || queryLevel === "sedang" || queryLevel === "lanjut"
        ? queryLevel
        : savedLevel === "dasar" ||
            savedLevel === "sedang" ||
            savedLevel === "lanjut"
          ? savedLevel
          : "dasar";

    setEntryMode(nextEntry);
    setRecommendedLevel(nextLevel);
    setStoredScore(window.localStorage.getItem("sains-edu-pretest-score") ?? "");
    setStoredProfile(
      window.localStorage.getItem("sains-edu-pretest-profile") ?? ""
    );
    try {
      const saved = window.localStorage.getItem("sains-edu-module-progress");
      setModuleProgress(
        saved ? sanitizeModuleProgress(JSON.parse(saved)) : getDefaultModuleProgress()
      );
    } catch {
      setModuleProgress(getDefaultModuleProgress());
    }
  }, [searchParams]);

  const t = useMemo(
    () =>
      locale === "id"
        ? {
            home: "Home",
            title: "Peta Modul / Menu Utama",
            desc:
              "Tampilan peta modul mengikuti storyboard: kartu M1-M7 dalam grid, progress bar kecil, dan pintasan ke kuis serta referensi.",
            back: "Kembali",
            routeRecommended: "Jalur rekomendasi",
            routeFree: "Eksplor bebas",
            routeDescRecommended:
              "Kamu masuk dari hasil pre-test dan membawa rekomendasi level belajar.",
            routeDescFree:
              "Kamu masuk langsung ke peta modul untuk memilih materi secara mandiri.",
            levelLabel: "Level",
            scoreLabel: "Skor",
            profileLabel: "Profil awal",
            selectedLabel: "Modul dipilih",
            progressLabel: "Progress",
            overallProgress: "Progres keseluruhan",
            completedModules: "Modul selesai",
            availableModules: "Modul tersedia",
            remainingModules: "tersisa",
            continueLabel: "Lanjut belajar",
            statusDone: "Selesai",
            statusInProgress: "Berjalan",
            statusNotStarted: "Belum mulai",
            shortcutQuiz: "Kuis & Evaluasi",
            shortcutReference: "Referensi",
            shortcutGlossary: "Glosarium",
            priorityTitle: "Prioritas modul",
            mapTitle: "Kartu Modul M1-M7",
            mapDesc:
              "Halaman utama hanya menampilkan dashboard modul. Klik kartu modul untuk masuk ke pembelajaran.",
            openModule: "Buka Modul",
            quizTitle: "Kuis & Evaluasi",
            quizDesc:
              "Pintasan ini menuju kuis formatif, evaluasi, dan post-test sumatif setelah rangkaian modul selesai.",
            referenceTitle: "Referensi",
            referenceDesc:
              "Berisi sumber pendukung pembelajaran, bacaan lanjut, dan materi penguatan.",
            glossaryTitle: "Glosarium",
            glossaryDesc:
              "Memuat istilah penting seperti adiksi, farmakokinetik, halal-tayyib, dan istilah kimia lain.",
            heroCaption: "Dashboard pembelajaran",
            heroHighlight:
              "Pilih modul, pantau progres, dan lanjutkan pembelajaran dari satu tempat.",
            levelNames: {
              dasar: "Dasar",
              sedang: "Sedang",
              lanjut: "Lanjut",
            },
          }
        : {
            home: "Home",
            title: "Module Map / Main Menu",
            desc:
              "The module map follows the storyboard: M1-M7 cards in a grid, small progress bars, and shortcuts to quiz and references.",
            back: "Back",
            routeRecommended: "Recommended route",
            routeFree: "Free exploration",
            routeDescRecommended:
              "You entered from the pre-test result and carry a suggested learning level.",
            routeDescFree:
              "You entered the module map directly to choose materials independently.",
            levelLabel: "Level",
            scoreLabel: "Score",
            profileLabel: "Initial profile",
            selectedLabel: "Selected module",
            progressLabel: "Progress",
            overallProgress: "Overall progress",
            completedModules: "Completed modules",
            availableModules: "Available modules",
            remainingModules: "remaining",
            continueLabel: "Continue learning",
            statusDone: "Done",
            statusInProgress: "In progress",
            statusNotStarted: "Not started",
            shortcutQuiz: "Quiz & Evaluation",
            shortcutReference: "References",
            shortcutGlossary: "Glossary",
            priorityTitle: "Priority modules",
            mapTitle: "M1-M7 Module Cards",
            mapDesc:
              "The main page only shows the module dashboard. Click a module card to enter learning.",
            openModule: "Open Module",
            quizTitle: "Quiz & Evaluation",
            quizDesc:
              "This shortcut leads to formative quizzes, evaluation, and the summative post-test after the module sequence is complete.",
            referenceTitle: "References",
            referenceDesc:
              "Contains supporting sources, further reading, and reinforcement material.",
            glossaryTitle: "Glossary",
            glossaryDesc:
              "Contains key terms such as addiction, pharmacokinetics, halal-tayyib, and other chemistry concepts.",
            heroCaption: "Learning dashboard",
            heroHighlight:
              "Choose modules, track progress, and continue learning from one place.",
            levelNames: {
              dasar: "Basic",
              sedang: "Intermediate",
              lanjut: "Advanced",
            },
          },
    [locale]
  );

  const priorityModules = priorityByLevel[recommendedLevel];
  const overallProgress = Math.round(
    Object.values(moduleProgress).reduce((sum, value) => sum + value, 0) /
      modules.length
  );
  const completedModules = Object.values(moduleProgress).filter(
    (value) => value >= 100
  ).length;

  const onOpenModule = (code: ModuleCode) => {
    router.push(`/dashboard/modules/${code.toLowerCase()}`);
  };

  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_top,_rgba(46,193,185,0.14),_transparent_35%),linear-gradient(180deg,_#f7fffe_0%,_#ffffff_28%,_#ffffff_100%)]">
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={backToChoosePath}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/80 bg-white text-zinc-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-zinc-50"
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
                {t.title}
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

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="space-y-6">
          <section className="reveal-up overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_20px_70px_-32px_rgba(15,23,42,0.35)] ring-1 ring-zinc-200/60 backdrop-blur sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,rgba(46,193,185,0.14),rgba(15,23,42,0.04))] p-6 sm:p-7">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(46,193,185,0.26),_transparent_68%)]" />
                <div className="relative">
                  <span className="inline-flex rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-zinc-700 shadow-sm">
                    {t.heroCaption}
                  </span>
                  <h1 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                    {t.title}
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-[15px]">
                    {t.heroHighlight}
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
                    {t.desc}
                  </p>
                </div>

                <div className="relative mt-6 flex flex-wrap gap-2.5">
                  <span
                    className="inline-flex rounded-full px-3.5 py-2 text-xs font-semibold text-white shadow-sm"
                    style={{ backgroundColor: "var(--brand)" }}
                  >
                    {entryMode === "recommended"
                      ? t.routeRecommended
                      : t.routeFree}
                  </span>
                  <span className="inline-flex rounded-full border border-zinc-200/70 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-sm">
                    {t.levelLabel}: {t.levelNames[recommendedLevel]}
                  </span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-[1.5rem] border border-zinc-200/70 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    {t.availableModules}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-zinc-950">
                    {modules.length}
                  </p>
                  <p className="mt-2 text-sm text-zinc-600">{t.continueLabel}</p>
                </div>
                <div className="rounded-[1.5rem] border border-zinc-200/70 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    {t.completedModules}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-zinc-950">
                    {completedModules}
                  </p>
                  <p className="mt-2 text-sm text-zinc-600">
                    {modules.length - completedModules} {t.remainingModules}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-zinc-200/70 bg-zinc-950 p-5 text-white shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                      {t.overallProgress}
                    </p>
                    <p className="text-sm font-semibold text-white">{overallProgress}%</p>
                  </div>
                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-[var(--brand)]"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-white/70">
                    {overallProgress >= 100
                      ? t.statusDone
                      : completedModules > 0
                        ? t.statusInProgress
                        : t.statusNotStarted}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[1.5rem] border border-zinc-200/70 bg-zinc-50/80 p-5 shadow-sm">
                <p className="text-sm font-semibold text-zinc-900">
                  {entryMode === "recommended"
                    ? t.routeRecommended
                    : t.routeFree}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-700">
                  {entryMode === "recommended"
                    ? t.routeDescRecommended
                    : t.routeDescFree}
                </p>
                {entryMode === "recommended" ? (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200/70">
                      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        {t.scoreLabel}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-zinc-900">
                        {storedScore || "-"}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200/70">
                      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        {t.profileLabel}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-700">
                        {storedProfile || "-"}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="rounded-[1.5rem] border border-zinc-200/70 bg-zinc-50/80 p-5 shadow-sm">
                <p className="text-sm font-semibold text-zinc-900">{t.priorityTitle}</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {priorityModules.map((item) => (
                    <span
                      key={item}
                      className="inline-flex rounded-full border border-zinc-200/70 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200/70">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      {t.overallProgress}
                    </p>
                    <p className="text-sm font-semibold text-zinc-900">
                      {overallProgress}%
                    </p>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full bg-[var(--brand)]"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="reveal-up rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_20px_70px_-32px_rgba(15,23,42,0.25)] ring-1 ring-zinc-200/60 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
                  {t.mapTitle}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">
                  {t.mapDesc}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/70 bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
                {completedModules}/{modules.length} {t.completedModules.toLowerCase()}
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {modules.map((module, index) => {
                const progress = moduleProgress[module.code];
                const prioritized = priorityModules.includes(module.code);
                const statusLabel =
                  progress >= 100
                    ? t.statusDone
                    : progress > 0
                      ? t.statusInProgress
                      : t.statusNotStarted;

                return (
                  <button
                    key={module.code}
                    type="button"
                    onClick={() => onOpenModule(module.code)}
                    className="reveal-up group relative overflow-hidden rounded-[1.75rem] border border-zinc-200/80 bg-white p-5 text-left shadow-[0_14px_40px_-28px_rgba(15,23,42,0.35)] transition-all hover:-translate-y-1 hover:border-[var(--brand)]/30 hover:shadow-[0_24px_50px_-28px_rgba(15,23,42,0.35)]"
                    style={revealDelayStyle(index * 60)}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--brand),rgba(46,193,185,0.15))]" />
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(46,193,185,0.18),rgba(46,193,185,0.06))] text-sm font-semibold text-zinc-800">
                          {module.code}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                            {statusLabel}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-zinc-900">
                            {t.continueLabel}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {prioritized ? (
                          <span className="rounded-full bg-[rgba(46,193,185,0.12)] px-2.5 py-1 text-[11px] font-semibold text-[var(--brand)]">
                            Prioritas
                          </span>
                        ) : null}
                        {progress >= 100 ? (
                          <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold text-white">
                            {t.statusDone}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold leading-7 tracking-tight text-zinc-950">
                      {pick(locale, module.title)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      {pick(locale, module.summary)}
                    </p>

                    <div className="mt-5 rounded-2xl bg-zinc-50/80 p-4">
                      <div className="flex items-center justify-between gap-3 text-xs font-semibold">
                        <span className="text-zinc-500">{t.progressLabel}</span>
                        <span className="text-zinc-700">{progress}%</span>
                      </div>
                      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-zinc-200/80">
                        <div
                          className="h-full rounded-full bg-[var(--brand)]"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
                      {t.openModule}
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-1">
                        <path
                          d="M9 6l6 6-6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <a
                href="/dashboard/evaluate"
                className="reveal-up rounded-[1.5rem] border border-zinc-200/80 bg-[linear-gradient(135deg,rgba(46,193,185,0.10),rgba(255,255,255,1))] p-5 text-zinc-800 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={revealDelayStyle(40)}
              >
                <p className="text-sm font-semibold text-zinc-950">{t.shortcutQuiz}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{t.quizDesc}</p>
              </a>
              <a
                href="#reference"
                className="reveal-up rounded-[1.5rem] border border-zinc-200/80 bg-white p-5 text-zinc-800 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={revealDelayStyle(80)}
              >
                <p className="text-sm font-semibold text-zinc-950">{t.shortcutReference}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{t.referenceDesc}</p>
              </a>
              <a
                href="#glossary"
                className="reveal-up rounded-[1.5rem] border border-zinc-200/80 bg-white p-5 text-zinc-800 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={revealDelayStyle(120)}
              >
                <p className="text-sm font-semibold text-zinc-950">{t.shortcutGlossary}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{t.glossaryDesc}</p>
              </a>
            </div>
          </section>

          <section id="quiz" className="reveal-up rounded-[1.75rem] border border-zinc-200/70 bg-white/90 p-6 shadow-sm ring-1 ring-zinc-200/60 sm:p-8">
            <h2 className="text-lg font-semibold text-zinc-900">{t.quizTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">{t.quizDesc}</p>
            <EvaluateCTA locale={locale} />
          </section>

          <section id="reference" className="reveal-up rounded-[1.75rem] border border-zinc-200/70 bg-white/90 p-6 shadow-sm ring-1 ring-zinc-200/60 sm:p-8">
            <h2 className="text-lg font-semibold text-zinc-900">{t.referenceTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{t.referenceDesc}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {references.map((ref) => {
                const categoryLabel: Record<typeof ref.category, string> =
                  locale === "id"
                    ? { buku: "Buku", jurnal: "Jurnal", website: "Website", regulasi: "Regulasi" }
                    : { buku: "Book", jurnal: "Journal", website: "Website", regulasi: "Regulation" };
                return (
                  <div
                    key={ref.id}
                    className="flex flex-col gap-3 rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                        {categoryLabel[ref.category]}
                      </span>
                      <span className="text-xs font-medium text-zinc-400">{ref.year}</span>
                    </div>
                    <p className="text-sm font-semibold leading-5 text-zinc-900">{ref.title}</p>
                    <p className="text-xs leading-5 text-zinc-500">{ref.author}</p>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <p className="text-xs text-zinc-400">{ref.source}</p>
                      {ref.url ? (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
                        >
                          {locale === "id" ? "Buka" : "Open"}
                          <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="glossary" className="reveal-up rounded-[1.75rem] border border-zinc-200/70 bg-white/90 p-6 shadow-sm ring-1 ring-zinc-200/60 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">{t.glossaryTitle}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{t.glossaryDesc}</p>
              </div>
              <span className="inline-flex rounded-full border border-zinc-200/70 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-500">
                {glossaryTerms.length} {locale === "id" ? "istilah" : "terms"}
              </span>
            </div>

            <div className="mt-5">
              <input
                type="search"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder={locale === "id" ? "Cari istilah…" : "Search terms…"}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 sm:max-w-xs"
              />
            </div>

            <div className="mt-4 divide-y divide-zinc-100">
              {glossaryTerms
                .filter((term) => {
                  if (!glossarySearch) return true;
                  const q = glossarySearch.toLowerCase();
                  return (
                    term.term.toLowerCase().includes(q) ||
                    term.termEn.toLowerCase().includes(q) ||
                    term.definition.id.toLowerCase().includes(q) ||
                    term.definition.en.toLowerCase().includes(q)
                  );
                })
                .map((term) => (
                  <div key={term.id} className="flex flex-col gap-1.5 py-4 sm:flex-row sm:gap-6">
                    <div className="w-full shrink-0 sm:w-48">
                      <p className="text-sm font-semibold text-zinc-900">{term.term}</p>
                      <p className="text-xs text-zinc-400">{term.termEn}</p>
                    </div>
                    <p className="text-sm leading-6 text-zinc-600">
                      {locale === "id" ? term.definition.id : term.definition.en}
                    </p>
                    {term.module ? (
                      <span className="self-start rounded-full bg-[rgba(46,193,185,0.1)] px-2.5 py-1 text-[11px] font-semibold text-[var(--brand)] sm:ml-auto sm:shrink-0">
                        {term.module}
                      </span>
                    ) : null}
                  </div>
                ))}
              {glossaryTerms.filter((term) => {
                if (!glossarySearch) return true;
                const q = glossarySearch.toLowerCase();
                return (
                  term.term.toLowerCase().includes(q) ||
                  term.termEn.toLowerCase().includes(q) ||
                  term.definition.id.toLowerCase().includes(q) ||
                  term.definition.en.toLowerCase().includes(q)
                );
              }).length === 0 ? (
                <p className="py-8 text-center text-sm text-zinc-400">
                  {locale === "id" ? "Tidak ada istilah yang cocok." : "No matching terms."}
                </p>
              ) : null}
            </div>
          </section>

          <div>
            <button
              type="button"
              onClick={backToChoosePath}
              className="reveal-up rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50"
              style={revealDelayStyle(80)}
            >
              {t.back}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
