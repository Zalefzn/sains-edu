"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getDefaultModuleProgress,
  moduleStepsByCode,
  modules,
  pick,
  sanitizeModuleProgress,
  type DopamineChart,
  type Locale,
  type ModuleCode,
  type MoleculeItem,
  type ModuleQuote,
  type ModuleTab,
  type ModuleTable,
} from "../../module-data";

function ModuleTableView({ table, locale }: { table: ModuleTable; locale: Locale }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-3xl border border-zinc-200/70">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-zinc-50">
          <tr>
            {table.headers.map((header, index) => (
              <th key={index} className="px-4 py-3 font-semibold text-zinc-900">
                {pick(locale, header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t border-zinc-200/70">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 align-top text-zinc-700">
                  {pick(locale, cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ModuleQuoteView({ quote, locale }: { quote: ModuleQuote; locale: Locale }) {
  return (
    <div className="mt-4 rounded-3xl bg-zinc-50 p-6">
      {quote.arabic ? (
        <p dir="rtl" className="text-right text-lg leading-loose text-zinc-900">
          {quote.arabic}
        </p>
      ) : null}
      <p className="mt-3 text-sm italic leading-7 text-zinc-700">
        &ldquo;{pick(locale, quote.translation)}&rdquo;
      </p>
      <p className="mt-2 text-xs font-semibold text-zinc-500">{quote.source}</p>
    </div>
  );
}

function ModuleTabsBlock({
  tabs,
  locale,
  studyFocusLabel,
}: {
  tabs: ModuleTab[];
  locale: Locale;
  studyFocusLabel: string;
}) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const active = tabs.find((tabItem) => tabItem.id === activeId) ?? tabs[0];

  return (
    <div className="mt-5">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tabItem) => {
          const isActive = tabItem.id === active.id;
          return (
            <button
              key={tabItem.id}
              type="button"
              onClick={() => setActiveId(tabItem.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-transparent text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
              style={isActive ? { backgroundColor: "var(--brand)" } : undefined}
            >
              {pick(locale, tabItem.label)}
            </button>
          );
        })}
      </div>

      {active.body ? (
        <div className="mt-5 rounded-3xl bg-zinc-50 p-6">
          <p className="text-sm font-semibold text-zinc-900">{studyFocusLabel}</p>
          <p className="mt-3 text-sm leading-8 text-zinc-700">{pick(locale, active.body)}</p>
        </div>
      ) : null}

      {active.quote ? <ModuleQuoteView quote={active.quote} locale={locale} /> : null}
      {active.table ? <ModuleTableView table={active.table} locale={locale} /> : null}
    </div>
  );
}

function DopamineChartView({ chart, locale }: { chart: DopamineChart; locale: Locale }) {
  const [activeKey, setActiveKey] = useState(chart.items[0]?.key);
  const active = chart.items.find((item) => item.key === activeKey) ?? chart.items[0];

  return (
    <div className="mt-5 rounded-3xl border border-zinc-200/70 bg-white p-6">
      <p className="text-sm font-semibold text-zinc-900">{pick(locale, chart.title)}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {chart.items.map((item) => {
          const isActive = item.key === active.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveKey(item.key)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-transparent text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
              style={isActive ? { backgroundColor: "var(--brand)" } : undefined}
            >
              {pick(locale, item.label)}
            </button>
          );
        })}
      </div>
      <div className="mt-4 h-8 w-full overflow-hidden rounded-full bg-zinc-100">
        <div
          className="flex h-full items-center rounded-full pl-3 text-xs font-semibold text-white transition-all duration-500"
          style={{ width: `${active.widthPercent}%`, backgroundColor: active.color }}
        >
          {pick(locale, active.resultLabel)}
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-zinc-700">{pick(locale, active.description)}</p>
    </div>
  );
}

function MoleculeSelectorView({ molecules, locale }: { molecules: MoleculeItem[]; locale: Locale }) {
  const [activeKey, setActiveKey] = useState(molecules[0]?.key);
  const active = molecules.find((item) => item.key === activeKey) ?? molecules[0];

  return (
    <div className="mt-5">
      <div className="flex flex-wrap gap-2">
        {molecules.map((item) => {
          const isActive = item.key === active.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveKey(item.key)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-transparent text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
              style={isActive ? { backgroundColor: "var(--brand)" } : undefined}
            >
              {pick(locale, item.label)}
            </button>
          );
        })}
      </div>
      <div className="mt-4 rounded-3xl bg-zinc-50 p-5">
        <p className="text-sm font-semibold text-zinc-900">{pick(locale, active.label)}</p>
        <p className="mt-2 text-sm leading-7 text-zinc-700">{pick(locale, active.description)}</p>
      </div>
      <div className="mt-5 overflow-hidden rounded-3xl border border-zinc-200/70">
        <iframe
          key={active.key}
          src={`https://pubchem.ncbi.nlm.nih.gov/compound/${active.pubchemCid}#section=3D-Conformer&embed=true`}
          className="h-[85vh] min-h-[720px] w-full border-0"
          title={`3D structure – ${pick(locale, active.label)}`}
          loading="lazy"
        />
      </div>
    </div>
  );
}

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

export default function ModuleDetailPage() {
  const params = useParams<{ moduleId: string }>();
  const router = useRouter();
  const [locale] = useState<Locale>(() => getInitialLocale());
  const [stepIndex, setStepIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string>>({});
  const [exerciseResult, setExerciseResult] = useState<"passed" | "failed" | null>(null);
  const [exerciseScore, setExerciseScore] = useState<{ correct: number; total: number } | null>(null);

  const moduleId = String(params?.moduleId ?? "").toUpperCase() as ModuleCode;
  const [prevModuleId, setPrevModuleId] = useState(moduleId);
  const currentModule = modules.find((item) => item.code === moduleId);
  const currentModuleIndex = modules.findIndex((item) => item.code === moduleId);
  const nextModule = currentModuleIndex >= 0 ? modules[currentModuleIndex + 1] : undefined;
  const steps = currentModule ? moduleStepsByCode[moduleId] : [];
  const currentStep = steps[stepIndex];

  const backToMap = useCallback(
    () => router.push("/dashboard/explore"),
    [router]
  );

  const goToNextModule = useCallback(() => {
    if (nextModule) {
      router.push(`/dashboard/modules/${nextModule.code.toLowerCase()}`);
    } else {
      backToMap();
    }
  }, [nextModule, router, backToMap]);

  if (moduleId !== prevModuleId) {
    setPrevModuleId(moduleId);
    setStepIndex(0);
    setFinished(false);
    setExerciseResult(null);
    setExerciseScore(null);
    setExerciseAnswers({});
  }

  useEffect(() => {
    const onPopState = () => backToMap();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [backToMap]);

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
  }, [finished, stepIndex, exerciseResult]);

  const t = useMemo(
    () =>
      locale === "id"
        ? {
            home: "Home",
            back: "Kembali ke Peta Modul",
            next: "Tahap Selanjutnya",
            prev: "Sebelumnya",
            finish: "Selesaikan Modul",
            completedTitle: "Modul Selesai",
            completedDesc:
              "Progress modul sudah diperbarui. Kamu bisa kembali ke peta modul untuk memilih tahap berikutnya.",
            continueMap: "Kembali ke Peta Modul",
            progressLabel: "Progress Modul",
            stepLabel: "Tahap",
            moduleFlow: "Alur materi modul",
            moduleContent: "Materi lengkap modul",
            activeStep: "Tahap aktif",
            jumpToStep: "Pilih tahap",
            studyFocus: "Fokus pembahasan",
            checkpoints: "Poin penting",
          }
        : {
            home: "Home",
            back: "Back to Module Map",
            next: "Next Stage",
            prev: "Previous",
            finish: "Finish Module",
            completedTitle: "Module Completed",
            completedDesc:
              "The module progress has been updated. You can return to the module map to choose the next stage.",
            continueMap: "Back to Module Map",
            progressLabel: "Module Progress",
            stepLabel: "Stage",
            moduleFlow: "Module learning flow",
            moduleContent: "Full module content",
            activeStep: "Active stage",
            jumpToStep: "Choose stage",
            studyFocus: "Study focus",
            checkpoints: "Key points",
          },
    [locale]
  );

  const totalSteps = steps.length;
  const currentProgress = finished || exerciseResult === "passed"
    ? 100
    : totalSteps > 0
      ? Math.round(((stepIndex + 1) / totalSteps) * 100)
      : 0;

  const persistProgress = (value: number) => {
    try {
      const saved = window.localStorage.getItem("sains-edu-module-progress");
      const nextProgress = saved
        ? sanitizeModuleProgress(JSON.parse(saved))
        : getDefaultModuleProgress();
      nextProgress[moduleId] = value;
      window.localStorage.setItem(
        "sains-edu-module-progress",
        JSON.stringify(nextProgress)
      );
    } catch {
      const nextProgress = getDefaultModuleProgress();
      nextProgress[moduleId] = value;
      window.localStorage.setItem(
        "sains-edu-module-progress",
        JSON.stringify(nextProgress)
      );
    }
  };

  const onSelectStep = (index: number) => {
    setFinished(false);
    setExerciseResult(null);
    setExerciseScore(null);
    setExerciseAnswers({});
    setStepIndex(index);
    persistProgress(Math.round(((index + 1) / totalSteps) * 100));
  };

  const onNext = () => {
    if (!currentModule) {
      backToMap();
      return;
    }

    if (exerciseResult === "passed") {
      goToNextModule();
      return;
    }

    if (exerciseResult === "failed") {
      const target = Math.max(0, steps.findIndex((s) => s.key === "material"));
      setExerciseResult(null);
      setExerciseScore(null);
      setExerciseAnswers({});
      setStepIndex(target);
      persistProgress(Math.round(((target + 1) / totalSteps) * 100));
      return;
    }

    if (stepIndex >= totalSteps - 1 && currentStep?.key === "exercise") {
      const questions = currentStep.questions ?? [];
      if (questions.length > 0) {
        const unanswered = questions.filter((q) => !exerciseAnswers[q.id]);
        if (unanswered.length > 0) {
          window.alert(locale === "id" ? "Jawab semua soal sebelum mengirim." : "Answer all questions before submitting.");
          return;
        }
        const score = questions.filter((q) => exerciseAnswers[q.id] === q.correct).length;
        const passed = score >= Math.ceil(questions.length * 0.6);
        setExerciseScore({ correct: score, total: questions.length });
        setExerciseResult(passed ? "passed" : "failed");
        persistProgress(passed ? 100 : Math.round(((stepIndex + 1) / totalSteps) * 100));
        return;
      }
    }

    const nextValue =
      stepIndex >= totalSteps - 1
        ? 100
        : Math.round((((stepIndex + 2) / totalSteps) * 100));
    persistProgress(nextValue);

    if (stepIndex >= totalSteps - 1) {
      setFinished(true);
      return;
    }

    setStepIndex((prev) => prev + 1);
  };

  const onPrev = () => {
    if (!currentModule) {
      backToMap();
      return;
    }

    if (exerciseResult !== null) {
      setExerciseResult(null);
      setExerciseScore(null);
      setExerciseAnswers({});
      return;
    }

    if (finished) {
      setFinished(false);
      setStepIndex(totalSteps - 1);
      persistProgress(Math.round((totalSteps / totalSteps) * 100));
      return;
    }

    if (stepIndex === 0) {
      backToMap();
      return;
    }

    const nextStep = stepIndex - 1;
    setStepIndex(nextStep);
    persistProgress(Math.round(((nextStep + 1) / totalSteps) * 100));
  };

  if (!currentModule) {
    return (
      <div className="min-h-dvh bg-white">
        <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
            <button
              type="button"
              onClick={backToMap}
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
                  {locale === "id" ? "Modul tidak ditemukan" : "Module not found"}
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

        <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="reveal-up rounded-3xl bg-white p-8 ring-1 ring-zinc-200/70">
            <h1 className="text-lg font-semibold text-zinc-900">
              {locale === "id" ? "Modul tidak ditemukan" : "Module not found"}
            </h1>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              {locale === "id"
                ? "Kode modul yang diminta belum tersedia."
                : "The requested module code is not available."}
            </p>
            <button
              type="button"
              onClick={backToMap}
              className="mt-6 rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              {t.back}
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-white">
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={backToMap}
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
                {currentModule.code} - {pick(locale, currentModule.title)}
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

      <main className="mx-auto w-full max-w-5xl px-4 py-6 pb-24 sm:px-6 sm:py-8 sm:pb-28">
        <div className="space-y-6">
          <section className="reveal-up rounded-3xl bg-white p-6 ring-1 ring-zinc-200/70 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <h1 className="text-xl font-semibold text-zinc-900">
                  {pick(locale, currentModule.title)}
                </h1>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  {pick(locale, currentModule.summary)}
                </p>
              </div>

              <div className="w-full max-w-xs rounded-2xl bg-zinc-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    {t.progressLabel}
                  </p>
                  <p className="text-sm font-semibold text-zinc-900">
                    {currentProgress}%
                  </p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200">
                  <div
                    className="h-full rounded-full bg-[var(--brand)]"
                    style={{ width: `${currentProgress}%` }}
                  />
                </div>
                {!finished ? (
                  <p className="mt-3 text-xs font-medium text-zinc-600">
                    {t.stepLabel} {stepIndex + 1}/{totalSteps}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          <section className="reveal-up rounded-3xl bg-white p-6 ring-1 ring-zinc-200/70 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {t.moduleFlow}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-zinc-900">
                  {t.moduleContent}
                </h2>
              </div>
              <div className="rounded-2xl bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
                <span className="font-semibold text-zinc-900">{t.activeStep}:</span>{" "}
                {t.stepLabel} {stepIndex + 1} - {pick(locale, currentStep.title)}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {steps.map((step, index) => {
                const active = index === stepIndex && !finished;
                return (
                  <button
                    key={step.key}
                    type="button"
                    onClick={() => onSelectStep(index)}
                    className={`reveal-up rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? "border-transparent text-white"
                        : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                    }`}
                    style={
                      active
                        ? { ...revealDelayStyle(index * 30), backgroundColor: "var(--brand)" }
                        : revealDelayStyle(index * 30)
                    }
                  >
                    {t.stepLabel} {index + 1}
                  </button>
                );
              })}
            </div>
          </section>

          {exerciseResult === "passed" ? (
            <section className="reveal-up rounded-3xl bg-white p-6 ring-1 ring-zinc-200/70 sm:p-8">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: "var(--brand)" }}
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    {locale === "id" ? "Latihan selesai" : "Exercise complete"}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-zinc-900">
                    {locale === "id" ? "Lulus! Kamu memahami materi ini." : "Passed! You understand this material."}
                  </h2>
                  {exerciseScore ? (
                    <p className="mt-1 text-sm font-medium text-zinc-500">
                      {locale === "id" ? "Skor" : "Score"}: {exerciseScore.correct}/{exerciseScore.total}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mt-6 rounded-3xl bg-zinc-50 p-6">
                <p className="text-sm font-semibold text-zinc-900">
                  {locale === "id" ? "Refleksi" : "Reflection"}
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-700">
                  {pick(locale, currentModule.prompt)}
                </p>
              </div>
            </section>
          ) : exerciseResult === "failed" ? (
            <section className="reveal-up rounded-3xl bg-white p-6 ring-1 ring-zinc-200/70 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-100">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-zinc-500" aria-hidden="true">
                    <path d="M12 9v4m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    {locale === "id" ? "Belum lulus" : "Not yet passed"}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-zinc-900">
                    {locale === "id"
                      ? "Pelajari kembali materi inti sebelum mencoba lagi."
                      : "Review the core material before trying again."}
                  </h2>
                  {exerciseScore ? (
                    <p className="mt-1 text-sm font-medium text-zinc-500">
                      {locale === "id" ? "Skor" : "Score"}: {exerciseScore.correct}/{exerciseScore.total}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mt-6 rounded-3xl bg-zinc-50 p-6">
                <p className="text-sm font-semibold text-zinc-900">
                  {locale === "id" ? "Ringkasan Materi" : "Material Summary"}
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-700">
                  {pick(locale, steps.find((s) => s.key === "material")?.body ?? { id: "", en: "" })}
                </p>
              </div>
            </section>
          ) : !finished ? (
            <section className="space-y-5">
              {(() => {
                const step = currentStep;
                const isExerciseActive = step.key === "exercise";
                const exerciseQuestions = isExerciseActive ? (step.questions ?? []) : [];
                return (
                  <article
                    key={`${moduleId}-${step.key}`}
                    className="reveal-up rounded-3xl border border-[var(--brand)]/30 bg-white p-6 ring-1 ring-[var(--brand)]/20 sm:p-8"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                          {t.stepLabel} {stepIndex + 1}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-zinc-900">
                          {pick(locale, step.title)}
                        </h3>
                      </div>
                      <div
                        className="inline-flex rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                        style={{ backgroundColor: "var(--brand)" }}
                      >
                        {t.activeStep}
                      </div>
                    </div>

                    {step.key === "visual" && (step.dopamineChart || (step.molecules?.length ?? 0) > 0) ? (
                      <>
                        <div className="mt-5 rounded-3xl bg-zinc-50 p-6">
                          <p className="text-sm font-semibold text-zinc-900">
                            {t.studyFocus}
                          </p>
                          <p className="mt-3 text-sm leading-8 text-zinc-700">
                            {pick(locale, step.body)}
                          </p>
                        </div>
                        {step.dopamineChart ? (
                          <DopamineChartView chart={step.dopamineChart} locale={locale} />
                        ) : null}
                        {step.molecules?.length ? (
                          <MoleculeSelectorView molecules={step.molecules} locale={locale} />
                        ) : null}
                      </>
                    ) : step.tabs && step.tabs.length > 0 ? (
                      <ModuleTabsBlock
                        key={`${moduleId}-${step.key}`}
                        tabs={step.tabs}
                        locale={locale}
                        studyFocusLabel={t.studyFocus}
                      />
                    ) : isExerciseActive && exerciseQuestions.length > 0 ? (
                      <div className="mt-5 space-y-4">
                        {exerciseQuestions.map((q, qi) => (
                          <div key={q.id} className="rounded-3xl bg-zinc-50 p-5">
                            <p className="text-sm font-semibold text-zinc-900">
                              {qi + 1}. {pick(locale, q.prompt)}
                            </p>
                            <div className="mt-3 grid gap-2">
                              {q.options.map((opt, oi) => {
                                const selected = exerciseAnswers[q.id] === opt.value;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() =>
                                      setExerciseAnswers((prev) => ({ ...prev, [q.id]: opt.value }))
                                    }
                                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all hover:-translate-y-0.5 ${
                                      selected
                                        ? "border-transparent text-white shadow-md"
                                        : "border-zinc-200 bg-white text-zinc-800 hover:border-[var(--brand)]/30"
                                    }`}
                                    style={selected ? { backgroundColor: "var(--brand)" } : undefined}
                                  >
                                    <span
                                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-semibold ${
                                        selected ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-600"
                                      }`}
                                    >
                                      {String.fromCharCode(65 + oi)}
                                    </span>
                                    {pick(locale, opt.label)}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div className="mt-5 rounded-3xl bg-zinc-50 p-6">
                          <p className="text-sm font-semibold text-zinc-900">
                            {t.studyFocus}
                          </p>
                          <p className="mt-3 text-sm leading-8 text-zinc-700">
                            {pick(locale, step.body)}
                          </p>
                        </div>

                        {step.table ? (
                          <ModuleTableView table={step.table} locale={locale} />
                        ) : null}

                        {step.quotes?.length ? (
                          <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            {step.quotes.map((quote, quoteIndex) => (
                              <ModuleQuoteView key={quoteIndex} quote={quote} locale={locale} />
                            ))}
                          </div>
                        ) : null}

                        {step.checkpoints?.length ? (
                          <div className="mt-5 rounded-3xl border border-zinc-200 bg-white p-6">
                            <p className="text-sm font-semibold text-zinc-900">
                              {t.checkpoints}
                            </p>
                            <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-700">
                              {step.checkpoints.map((point, pointIndex) => (
                                <li key={pointIndex} className="flex gap-3">
                                  <span
                                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                                    style={{ backgroundColor: "var(--brand)" }}
                                  />
                                  <span>{pick(locale, point)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </>
                    )}
                  </article>
                );
              })()}
            </section>
          ) : (
            <section className="reveal-up rounded-3xl bg-white p-6 ring-1 ring-zinc-200/70 sm:p-8">
              <h2 className="text-lg font-semibold text-zinc-900">
                {t.completedTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {t.completedDesc}
              </p>
              <div className="mt-6 rounded-3xl bg-zinc-50 p-6">
                <p className="text-sm font-semibold text-zinc-900">
                  {locale === "id" ? "Tahap berikutnya" : "Next stage"}
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-700">
                  {locale === "id"
                    ? `Setelah ${currentModule.code} selesai, kamu dapat kembali ke peta modul. Progress akan berubah, lalu kamu bisa melanjutkan ke modul lain yang diawali dari tahap stimulus.`
                    : `After ${currentModule.code} is completed, you can return to the module map. The progress will change, and you can continue to another module beginning from the stimulus stage.`}
                </p>
              </div>
            </section>
          )}
        </div>
      </main>

      <div className="fixed bottom-4 left-4 right-4 sm:bottom-8 sm:left-auto sm:right-8">
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto">
          <button
            type="button"
            onClick={onPrev}
            className="reveal-up flex-1 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 sm:flex-none"
          >
            {exerciseResult !== null || finished ? t.back : t.prev}
          </button>
          <button
            type="button"
            onClick={onNext}
            className="reveal-up flex-1 rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 sm:flex-none"
            style={revealDelayStyle(80)}
          >
            {exerciseResult === "passed"
              ? nextModule
                ? (locale === "id" ? `Lanjut ke ${nextModule.code}` : `Continue to ${nextModule.code}`)
                : t.continueMap
              : exerciseResult === "failed"
              ? (locale === "id" ? "Pelajari Ulang" : "Review Material")
              : finished
              ? t.continueMap
              : stepIndex === totalSteps - 1 && currentStep?.key === "exercise" && (currentStep.questions?.length ?? 0) > 0
              ? (locale === "id" ? "Kirim Jawaban" : "Submit Answers")
              : stepIndex === totalSteps - 1
              ? t.finish
              : t.next}
          </button>
        </div>
      </div>
    </div>
  );
}
