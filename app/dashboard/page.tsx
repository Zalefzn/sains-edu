"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [studentName, setStudentName] = useState("Pengguna");
  const [locale, setLocale] = useState<"id" | "en">("id");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [understoodUsage, setUnderstoodUsage] = useState(false);
  const [agreedContract, setAgreedContract] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("sains-edu-student-name");
    if (saved) setStudentName(saved);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("sains-edu-locale");
    if (saved === "id" || saved === "en") setLocale(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("sains-edu-locale", locale);
  }, [locale]);

  const t = useMemo(
    () =>
      locale === "id"
        ? {
            lang: "Bahasa",
            searchPlaceholder: "Cari Informasi...",
            notification: "Notifikasi",
            steps: ["Tujuan & Aturan", "Kontrak Belajar", "Mulai Darimana ?"],
            orientation: "Halaman Orientasi",
            next: "Selanjutnya",
            logout: "Logout",
            goalsTitle: "Tujuan Pembelajaran",
            rulesTitle: "Aturan Penggunaan Media",
            goals: [
              "Memahami konsep dasar kimia secara runtut.",
              "Mengenali simbol, satuan, dan notasi yang sering digunakan di kimia.",
              "Meningkatkan kemampuan analisis dan pemecahan masalah.",
              "Mengaitkan konsep kimia dengan fenomena sehari-hari.",
              "Berlatih melalui contoh, latihan, dan kuis secara mandiri.",
              "Meningkatkan ketelitian dalam perhitungan dan interpretasi data.",
              "Membangun kebiasaan belajar yang konsisten dan terarah.",
            ],
            rules: [
              "Gunakan media ini dengan tertib dan bertanggung jawab.",
              "Kerjakan latihan secara mandiri sebelum melihat pembahasan.",
              "Jaga etika komunikasi dan adab selama proses belajar.",
              "Gunakan fitur pencarian untuk menemukan topik dengan cepat.",
              "Baca instruksi pada setiap bagian sebelum mengerjakan tugas.",
              "Laporkan kendala teknis kepada pengelola jika diperlukan.",
            ],
            understandCheck: "Saya memahami cara penggunaan",
            contractTitle: "Kontrak Belajar",
            contractSubtitle:
              "Komitmen belajar untuk menjaga diri, jujur, dan beradab selama mengikuti pembelajaran.",
            contractPoints: [
              "Amanah menjaga diri: disiplin waktu dan fokus belajar.",
              "Amanah menjaga diri: menjaga kesehatan, istirahat, dan tidak memaksakan diri.",
              "Jujur: tidak mencontek, mengerjakan latihan dengan kemampuan sendiri.",
              "Jujur: mencatat sumber jika menggunakan referensi tambahan.",
              "Adab: menghormati aturan, guru, dan sesama pengguna.",
              "Adab: menggunakan bahasa yang sopan dan tidak merendahkan.",
              "Komitmen: menyelesaikan materi sesuai target yang ditetapkan.",
            ],
            agreeCheck: "Saya setuju dengan kontrak belajar ini",
            continue: "Lanjut",
            agreeContinue: "Setuju & Lanjut",
          choosePathTitle: "Mulai Darimana?",
          choosePathSubtitle: "Pilih jalur belajar yang sesuai untukmu.",
          pathRecommended: "Jalur Rekomendasi (Pre-test)",
          pathRecommendedDesc:
            "Mulai dengan pre-test diagnostik agar materi disesuaikan dengan kemampuanmu.",
          pathExplore: "Eksplor Bebas",
          pathExploreDesc:
            "Langsung eksplor materi dan latihan sesuai minat tanpa pre-test.",
          openPath: "Buka",
          }
        : {
            lang: "Language",
            searchPlaceholder: "Search...",
            notification: "Notifications",
            steps: ["Goals & Rules", "Study Agreement", "Where to Start?"],
            orientation: "Orientation",
            next: "Next",
            logout: "Log out",
          goalsTitle: "Learning Objectives",
          rulesTitle: "Media Usage Rules",
          goals: [
            "Understand core chemistry concepts in a structured way.",
            "Learn common symbols, units, and notations used in chemistry.",
            "Improve analysis and problem-solving skills.",
            "Connect chemistry concepts to everyday phenomena.",
            "Practice independently through examples, exercises, and quizzes.",
            "Increase accuracy in calculations and data interpretation.",
            "Build a consistent and focused study habit.",
          ],
          rules: [
            "Use this media responsibly and respectfully.",
            "Try exercises independently before viewing solutions.",
            "Maintain good conduct and etiquette during learning.",
            "Use search to find topics quickly.",
            "Read each section’s instructions before starting.",
            "Report technical issues when needed.",
          ],
          understandCheck: "I understand how to use this",
          contractTitle: "Study Agreement",
          contractSubtitle:
            "A learning commitment to stay responsible, honest, and respectful throughout the program.",
          contractPoints: [
            "Responsibility: manage your time and stay focused.",
            "Responsibility: take care of your wellbeing and avoid overexertion.",
            "Honesty: no cheating; complete exercises with your own effort.",
            "Honesty: cite sources when using external references.",
            "Etiquette: respect the rules, teachers, and other users.",
            "Etiquette: communicate politely and avoid harmful language.",
            "Commitment: complete materials according to your planned targets.",
          ],
          agreeCheck: "I agree to this study agreement",
          continue: "Continue",
          agreeContinue: "Agree & Continue",
          choosePathTitle: "Where to Start?",
          choosePathSubtitle: "Pick a learning path that suits you.",
          pathRecommended: "Recommended Path (Pre-test)",
          pathRecommendedDesc:
            "Start with a diagnostic pre-test so the materials match your level.",
          pathExplore: "Free Exploration",
          pathExploreDesc:
            "Explore materials and exercises freely without taking a pre-test.",
          openPath: "Open",
          },
    [locale]
  );

  const steps = t.steps;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (!stepParam) return;
    const parsed = Number(stepParam);
    if (!Number.isFinite(parsed)) return;
    if (parsed < 0 || parsed >= steps.length) return;
    setActiveStep(parsed);
  }, [searchParams, steps.length]);

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
  }, [activeStep, locale]);

  useEffect(() => {
    if (!isProfileOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-profile-menu]")) return;
      setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [isProfileOpen]);

  const onLogout = () => {
    window.localStorage.removeItem("sains-edu-student-name");
    window.localStorage.removeItem("sains-edu-university");
    router.push("/");
  };

  const canContinue =
    activeStep === 0 ? understoodUsage : activeStep === 1 ? agreedContract : true;

  const continueLabel =
    activeStep === 1 ? t.agreeContinue : activeStep === 0 ? t.continue : t.next;

  const onContinue = () => {
    if (!canContinue) return;
    setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const onOpenPretest = () => {
    router.push("/dashboard/pretest");
  };

  const onOpenExplore = () => {
    router.push("/dashboard/explore");
  };

  return (
    <div className="min-h-dvh bg-white">
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 backdrop-blur">
        <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/Logo.png"
              alt="Edu Sains"
              width={220}
              height={44}
              priority
              className="h-7 w-auto select-none"
            />

            <div className="hidden w-full max-w-md flex-1 items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2.5 md:flex">
              <svg
                viewBox="0 0 24 24"
                className="h-4.5 w-4.5 text-zinc-500"
                aria-hidden="true"
              >
                <path
                  d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm6.1-1.4 4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                className="w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
                placeholder={t.searchPlaceholder}
              />
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center rounded-full border border-zinc-200 bg-white p-1 sm:flex">
                <span className="hidden px-2 text-xs font-medium text-zinc-600 md:inline">
                  {t.lang}
                </span>
                <button
                  type="button"
                  onClick={() => setLocale("id")}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    locale === "id"
                      ? "bg-zinc-900 text-white"
                      : "cursor-pointer text-zinc-700 hover:bg-zinc-100"
                  }`}
                  aria-pressed={locale === "id"}
                >
                  ID
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    locale === "en"
                      ? "bg-zinc-900 text-white"
                      : "cursor-pointer text-zinc-700 hover:bg-zinc-100"
                  }`}
                  aria-pressed={locale === "en"}
                >
                  EN
                </button>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:bg-zinc-50"
                aria-label={t.notification}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M12 22a2.2 2.2 0 0 0 2.1-1.6H9.9A2.2 2.2 0 0 0 12 22Zm7-6V11a7 7 0 1 0-14 0v5l-2 2v1h18v-1l-2-2Z"
                    fill="currentColor"
                    opacity="0.9"
                  />
                </svg>
              </button>

              <div className="relative" data-profile-menu>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((v) => !v)}
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 transition-colors hover:bg-zinc-50"
                  aria-haspopup="menu"
                  aria-expanded={isProfileOpen}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-white">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 12a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12Zm0 2.3c-4.2 0-7.7 2.2-7.7 5v.7h15.4v-.7c0-2.8-3.5-5-7.7-5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className="max-w-[120px] truncate text-sm font-medium text-zinc-900 sm:max-w-[160px]">
                    {studentName}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="hidden h-4 w-4 text-zinc-500 sm:block"
                  >
                    <path
                      d="M7 10l5 5 5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {isProfileOpen ? (
                  <div
                    className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-zinc-200"
                    role="menu"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        onLogout();
                      }}
                      className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50"
                      role="menuitem"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-zinc-500"
                        aria-hidden="true"
                      >
                        <path
                          d="M10 17l-1.4-1.4 2.6-2.6H3v-2h8.2L8.6 8.4 10 7l5 5-5 5Zm9-14h-7v2h7v14h-7v2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"
                          fill="currentColor"
                        />
                      </svg>
                      {t.logout}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-3 md:hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="flex w-full items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2.5">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4.5 w-4.5 text-zinc-500"
                  aria-hidden="true"
                >
                  <path
                    d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm6.1-1.4 4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  className="w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
                  placeholder={t.searchPlaceholder}
                />
              </div>
              <div className="flex items-center rounded-full border border-zinc-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setLocale("id")}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    locale === "id"
                      ? "bg-zinc-900 text-white"
                      : "cursor-pointer text-zinc-700 hover:bg-zinc-100"
                  }`}
                  aria-pressed={locale === "id"}
                >
                  ID
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    locale === "en"
                      ? "bg-zinc-900 text-white"
                      : "cursor-pointer text-zinc-700 hover:bg-zinc-100"
                  }`}
                  aria-pressed={locale === "en"}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-6 pb-24 sm:px-6 sm:py-8 sm:pb-28">
        <div className="flex flex-col gap-6 sm:flex-row">
          <nav className="w-full sm:max-w-[260px] sm:shrink-0">
            <div className="hidden sm:block">
              <div className="reveal-up sticky top-[92px] relative pl-4">
                <div className="absolute left-1.5 top-0 h-full w-0.5 bg-zinc-200" />
                <div className="space-y-2">
                  {steps.map((label, idx) => {
                    const active = idx === activeStep;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setActiveStep(idx)}
                        className={`relative flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                          active
                            ? "text-[var(--brand)]"
                            : "text-zinc-500 hover:bg-zinc-50"
                        }`}
                      >
                        {active ? (
                          <span
                            className="absolute left-0 top-2.5 h-8 w-1 rounded-full"
                            style={{ backgroundColor: "var(--brand)" }}
                          />
                        ) : null}
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="sm:hidden">
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
                {steps.map((label, idx) => {
                  const active = idx === activeStep;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-inset transition-colors ${
                        active
                          ? "bg-[var(--brand)] text-white ring-transparent"
                          : "bg-white text-zinc-700 ring-zinc-200"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          <section className="flex-1">
            <h1 className="text-sm font-semibold text-zinc-500">
              {t.orientation} : {steps[activeStep]}
            </h1>
            <div className="mt-6 min-h-[360px] sm:min-h-[420px]">
              {activeStep === 0 ? (
                <div className="relative">
                  <div className="reveal-up rounded-2xl bg-white p-6 ring-1 ring-zinc-200/70">
                    <h2 className="text-base font-semibold text-zinc-900">
                      {t.goalsTitle}
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                      {t.goals.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            className="mt-1 h-2 w-2 rounded-full"
                            style={{ backgroundColor: "var(--brand)" }}
                          />
                          <span className="leading-6">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="reveal-up -mt-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/70">
                    <h2 className="text-base font-semibold text-zinc-900">
                      {t.rulesTitle}
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                      {t.rules.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-0.5 text-zinc-400">•</span>
                          <span className="leading-6">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={understoodUsage}
                        onChange={(e) => setUnderstoodUsage(e.target.checked)}
                        className="h-4 w-4 cursor-pointer accent-[var(--brand)]"
                      />
                      <span className="text-sm font-semibold text-zinc-800">
                        {t.understandCheck}
                      </span>
                    </label>
                  </div>
                </div>
              ) : activeStep === 1 ? (
                <div className="reveal-up rounded-2xl bg-white p-6 ring-1 ring-zinc-200/70">
                  <h2 className="text-base font-semibold text-zinc-900">
                    {t.contractTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {t.contractSubtitle}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm text-zinc-700">
                    {t.contractPoints.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full text-white"
                          style={{ backgroundColor: "var(--brand)" }}
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path
                              d="M20 6 9 17l-5-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="leading-6">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={agreedContract}
                      onChange={(e) => setAgreedContract(e.target.checked)}
                      className="h-4 w-4 cursor-pointer accent-[var(--brand)]"
                    />
                    <span className="text-sm font-semibold text-zinc-800">
                      {t.agreeCheck}
                    </span>
                  </label>
                </div>
              ) : (
                <div>
                  <h2 className="reveal-up text-base font-semibold text-zinc-900">
                    {t.choosePathTitle}
                  </h2>
                  <p className="reveal-up mt-2 text-sm leading-6 text-zinc-600">
                    {t.choosePathSubtitle}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <button
                      type="button"
                      onClick={onOpenPretest}
                      className="reveal-up group flex cursor-pointer flex-col items-start justify-between gap-6 rounded-2xl bg-white p-6 text-left ring-1 ring-zinc-200/70 transition-colors hover:bg-zinc-50"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                          style={{ backgroundColor: "var(--brand)" }}
                        >
                          <svg viewBox="0 0 24 24" className="h-6 w-6">
                            <path
                              d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                              fill="currentColor"
                              opacity="0.95"
                            />
                            <path
                              d="M8.5 8h7M8.5 11h7M8.5 14h4.5"
                              stroke="white"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-base font-semibold text-zinc-900">
                            {t.pathRecommended}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-zinc-600">
                            {t.pathRecommendedDesc}
                          </p>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
                        {t.openPath}
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-0.5"
                        >
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

                    <button
                      type="button"
                      onClick={onOpenExplore}
                      className="reveal-up group flex cursor-pointer flex-col items-start justify-between gap-6 rounded-2xl bg-white p-6 text-left ring-1 ring-zinc-200/70 transition-colors hover:bg-zinc-50"
                      style={{ ["--reveal-delay" as any]: "80ms" }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                          style={{ backgroundColor: "var(--brand)" }}
                        >
                          <svg viewBox="0 0 24 24" className="h-6 w-6">
                            <path
                              d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"
                              fill="currentColor"
                              opacity="0.95"
                            />
                            <path
                              d="M9.4 12.2 11 14l3.8-4.2"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-base font-semibold text-zinc-900">
                            {t.pathExplore}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-zinc-600">
                            {t.pathExploreDesc}
                          </p>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
                        {t.openPath}
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-0.5"
                        >
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
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {activeStep !== 2 ? (
        <div className="fixed bottom-4 left-4 right-4 sm:bottom-8 sm:left-auto sm:right-8">
          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue}
            className="w-full rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors enabled:cursor-pointer enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:bg-zinc-300 sm:w-auto"
          >
            {continueLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}
