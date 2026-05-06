"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type Locale = "id" | "en";

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

export default function PretestPage() {
  const router = useRouter();
  const [locale] = useState<Locale>(() => getInitialLocale());
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
  }, [locale]);

  const t = useMemo(
    () =>
      locale === "id"
        ? {
            home: "Home",
            title: "Pre-test Diagnostik",
            desc:
              "Kerjakan pre-test untuk memetakan kemampuan awal dan mendapatkan rekomendasi materi.",
            prev: "Prev",
            next: "Next",
          }
        : {
            home: "Home",
            title: "Diagnostic Pre-test",
            desc:
              "Take a pre-test to map your current level and get recommended materials.",
            prev: "Prev",
            next: "Next",
          },
    [locale]
  );

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

      <main className="mx-auto w-full max-w-6xl px-4 py-6 pb-24 sm:px-6 sm:py-8 sm:pb-28">
        <div className="reveal-up rounded-2xl bg-white p-6 ring-1 ring-zinc-200/70">
          <h1 className="text-lg font-semibold text-zinc-900">{t.title}</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{t.desc}</p>
          <div className="mt-6 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-600">
            Coming soon.
          </div>
        </div>
      </main>

      <div className="fixed bottom-4 left-4 right-4 sm:bottom-8 sm:left-auto sm:right-8">
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto">
          <button
            type="button"
            onClick={backToChoosePath}
            className="reveal-up flex-1 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 sm:flex-none"
          >
            {t.prev}
          </button>
          <button
            type="button"
            disabled
            className="reveal-up flex-1 rounded-xl bg-zinc-300 px-6 py-3 text-sm font-semibold text-white sm:flex-none"
            style={revealDelayStyle(80)}
          >
            {t.next}
          </button>
        </div>
      </div>
    </div>
  );
}
