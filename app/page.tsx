"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Locale = "id" | "en";
type IconKind = "book" | "brain" | "chart" | "cap" | "cup";

const iconClassName = "h-9 w-9 text-white";

function Icon({ kind }: { kind: IconKind }) {
  if (kind === "book") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClassName} aria-hidden="true">
        <path
          d="M6.5 4.5H18a2 2 0 0 1 2 2V19a1 1 0 0 1-1.5.86c-1.4-.8-3-.86-4.5-.86-2.5 0-4.5.6-6 1.2-1.5-.6-3.5-1.2-6-1.2-.78 0-1.54.04-2.3.14A1 1 0 0 1 2 18.2V6.5a2 2 0 0 1 2-2h2.5Z"
          opacity="0.9"
          fill="currentColor"
        />
        <path
          d="M8 7.2h6.8M8 10.2h6.8M8 13.2h4.6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (kind === "brain") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClassName} aria-hidden="true">
        <path
          d="M9.2 4.8c-.2-1.6 1-2.8 2.6-2.8 1.2 0 2.3.8 2.6 2 .2-.1.5-.1.8-.1 1.7 0 3 1.3 3 3 0 .4-.1.8-.2 1.1 1.3.4 2.2 1.6 2.2 3.1 0 1.2-.6 2.3-1.6 2.9.2.4.3.8.3 1.3 0 1.7-1.3 3-3 3-.4 0-.9-.1-1.2-.3-.7 1-1.8 1.6-3.1 1.6-1.4 0-2.6-.7-3.3-1.8-.3.2-.7.3-1.1.3-1.7 0-3-1.3-3-3 0-.5.1-.9.3-1.3C2.6 13.4 2 12.3 2 11.1c0-1.6 1-2.9 2.5-3.2-.1-.3-.1-.6-.1-.9 0-1.7 1.3-3 3-3 .6 0 1.2.2 1.8.6Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M8 9.2c.7-.7 1.6-1.1 2.6-1.1m-2.6 4c.7-.7 1.6-1.1 2.6-1.1m3.2-2.7c.9 0 1.8.4 2.5 1.1m-2.5 2.9c.9 0 1.8.4 2.5 1.1"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    );
  }

  if (kind === "chart") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClassName} aria-hidden="true">
        <path
          d="M4 20V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v15H4Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M7 16.5l2.3-2.7 2.2 1.6 3.3-4 2.2 1.9"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "cap") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClassName} aria-hidden="true">
        <path
          d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M6.2 11v4.3c0 1.3 2.6 2.7 5.8 2.7s5.8-1.4 5.8-2.7V11"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClassName} aria-hidden="true">
      <path
        d="M7 21h10a2 2 0 0 0 2-2v-3H5v3a2 2 0 0 0 2 2Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M6 4h12v5c0 3.3-2.7 6-6 6s-6-2.7-6-6V4Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M8.2 8.4h7.6M9 11h6"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.95"
      />
    </svg>
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

function getInitialText(key: string): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function revealDelayStyle(delayMs: number): React.CSSProperties {
  return { "--reveal-delay": `${delayMs}ms` } as unknown as React.CSSProperties;
}

export default function Home() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale());
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [studentName, setStudentName] = useState(() =>
    getInitialText("sains-edu-student-name")
  );
  const [university, setUniversity] = useState(() =>
    getInitialText("sains-edu-university")
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: "user" | "ai"; text: string }>
  >([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const t = useMemo(
    () =>
      locale === "id"
        ? {
            brand: "SAINS EDUKASI",
            subject: "Kimia",
            headline:
              "Materi, latihan, dan kuis untuk membantu memahami konsep kimia dengan lebih mudah.",
            start: "Mulai Belajar",
            materials: "Lihat Materi",
            lang: "Bahasa",
            heroAlt: "Ilustrasi siswa belajar",
            splashAlt: "Memuat Sains Edukasi Kimia",
            formTitle: "Mulai Belajar",
            nameLabel: "Nama",
            univLabel: "Universitas",
            startNow: "Start",
            cancel: "Batal",
            required: "Nama dan Universitas wajib diisi.",
            leaderboardTitle: "Peringkat Tertinggi",
            leaderboardSubtitle: "Pengguna dengan skor tertinggi minggu ini.",
            scoreLabel: "Skor",
            scrollTop: "Ke Atas",
            chatTitle: "AI Chat Kimia",
            chatPlaceholder: "Tanya tentang kimia...",
            chatSend: "Kirim",
            chatGreeting:
              "Halo! Aku asisten belajar kimia. Tanya konsep, contoh soal, atau ringkasan materi.",
            footerTagline: "Belajar kimia jadi lebih mudah dan terarah.",
            footerCopyright: "Sains Edukasi Kimia",
            growthTitle: "Bersama kami, kamu berkembang dari berbagai sisi",
            growthItems: [
              {
                title: "Memahami konsep kimia",
                desc: "Belajar dari dasar hingga lanjutan dengan penjelasan yang ringkas dan terstruktur.",
                icon: "book" as const,
              },
              {
                title: "Melatih logika & analisis",
                desc: "Asah kemampuan memecahkan soal dan menganalisis reaksi serta perhitungan.",
                icon: "brain" as const,
              },
              {
                title: "Meningkatkan literasi sains",
                desc: "Terbiasa membaca data, grafik, dan hasil percobaan dengan tepat.",
                icon: "chart" as const,
              },
              {
                title: "Mendukung prestasi sekolah",
                desc: "Latihan terarah untuk persiapan ulangan, tugas, dan ujian.",
                icon: "cap" as const,
              },
            ],
            growthExtraTitle: "Dan juga membuka peluang masa depan",
            growthExtraDesc:
              "Bangun fondasi sains yang kuat untuk studi lanjut dan berbagai bidang karier.",
            growthExtraIcon: "cup" as const,
          }
        : {
            brand: "SCIENCE EDUCATION",
            subject: "Chemistry",
            headline:
              "Materials, exercises, and quizzes to make chemistry concepts easier to understand.",
            start: "Start Learning",
            materials: "View Materials",
            lang: "Language",
            heroAlt: "Student learning illustration",
            splashAlt: "Loading Chemistry Science Education",
            formTitle: "Start Learning",
            nameLabel: "Name",
            univLabel: "University",
            startNow: "Start",
            cancel: "Cancel",
            required: "Name and University are required.",
            leaderboardTitle: "Top Ranking",
            leaderboardSubtitle: "Highest scoring users this week.",
            scoreLabel: "Score",
            scrollTop: "To Top",
            chatTitle: "Chemistry AI Chat",
            chatPlaceholder: "Ask about chemistry...",
            chatSend: "Send",
            chatGreeting:
              "Hi! I’m your chemistry study assistant. Ask concepts, practice questions, or quick summaries.",
            footerTagline: "Learn chemistry in a simpler and more structured way.",
            footerCopyright: "Chemistry Science Education",
            growthTitle: "With us, you grow from multiple angles",
            growthItems: [
              {
                title: "Understand chemistry concepts",
                desc: "Learn from basics to advanced topics with concise, structured explanations.",
                icon: "book" as const,
              },
              {
                title: "Train logic & analysis",
                desc: "Sharpen problem-solving through reactions, calculations, and reasoning.",
                icon: "brain" as const,
              },
              {
                title: "Improve science literacy",
                desc: "Get used to reading data, graphs, and experiment results accurately.",
                icon: "chart" as const,
              },
              {
                title: "Boost school performance",
                desc: "Targeted practice for assignments, quizzes, and exams.",
                icon: "cap" as const,
              },
            ],
            growthExtraTitle: "And unlock future opportunities",
            growthExtraDesc:
              "Build a strong science foundation for further study and many career paths.",
            growthExtraIcon: "cup" as const,
          },
    [locale]
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setShowSplash(false), 900);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("sains-edu-locale", locale);
  }, [locale]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (showSplash) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-up")
    );

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
  }, [locale, showSplash]);

  useEffect(() => {
    if (!isChatOpen) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isChatOpen, chatMessages.length]);

  const onOpenStart = () => {
    setFormError(null);
    setIsStartOpen(true);
  };

  const onOpenChat = () => {
    setIsChatOpen(true);
    if (chatMessages.length === 0) {
      setChatMessages([{ role: "ai", text: t.chatGreeting }]);
    }
  };

  const leaderboard = [
    { name: "Rahyu Ardiana", univ: "UIN Bandung", score: 980 },
    { name: "Alya Putri", univ: "UNPAD", score: 945 },
    { name: "Dimas Pratama", univ: "ITB", score: 910 },
    { name: "Nabila Azzahra", univ: "UI", score: 885 },
    { name: "Fahri Ramadhan", univ: "UGM", score: 860 },
  ];

  const getAiReply = (prompt: string) => {
    const p = prompt.toLowerCase();
    if (locale === "id") {
      if (p.includes("asam") && p.includes("basa")) {
        return "Asam adalah donor H+ (atau penerima pasangan elektron), basa adalah akseptor H+ (atau donor pasangan elektron). Mau bahas contoh reaksi netralisasi?";
      }
      if (p.includes("mol") || p.includes("stoikiometri")) {
        return "Stoikiometri biasanya: tulis reaksi setara → ubah ke mol → pakai perbandingan koefisien → balik ke satuan yang diminta. Kamu punya soalnya?";
      }
      if (p.includes("redoks") || p.includes("oksidasi") || p.includes("reduksi")) {
        return "Redoks: oksidasi = naik biloks / lepas elektron, reduksi = turun biloks / terima elektron. Sebutkan reaksinya, nanti kita tentukan biloks.";
      }
      if (p.includes("larutan") || p.includes("molaritas") || p.includes("konsentrasi")) {
        return "Molaritas (M) = mol zat terlarut / liter larutan. Jika ada pengenceran: M1V1 = M2V2. Mau contoh hitung cepat?";
      }
      return "Oke. Tulis topiknya (misal: stoikiometri, asam-basa, redoks, larutan) atau kirim soal, nanti aku bantu langkahnya.";
    }

    if (p.includes("acid") && p.includes("base")) {
      return "Acid donates H+ (or accepts an electron pair), base accepts H+ (or donates an electron pair). Want a neutralization example?";
    }
    if (p.includes("mole") || p.includes("stoichiometry")) {
      return "Stoichiometry: balance equation → convert to moles → use coefficients ratio → convert back to required units. Share your problem?";
    }
    if (p.includes("redox") || p.includes("oxidation") || p.includes("reduction")) {
      return "Redox: oxidation = oxidation number increases / loses electrons; reduction = decreases / gains electrons. Paste the reaction and we’ll assign oxidation numbers.";
    }
    if (p.includes("solution") || p.includes("molarity") || p.includes("concentration")) {
      return "Molarity (M) = moles of solute / liters of solution. For dilution: M1V1 = M2V2. Want a quick example?";
    }
    return "Sure. Tell me the topic (stoichiometry, acid-base, redox, solutions) or paste a question, and I’ll guide you step-by-step.";
  };

  const onSendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatInput("");
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "ai", text: getAiReply(text) },
    ]);
    window.setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 0);
  };

  const onSubmitStart = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const trimmedName = studentName.trim();
    const trimmedUniv = university.trim();
    if (!trimmedName || !trimmedUniv) {
      setFormError(t.required);
      return;
    }

    window.localStorage.setItem("sains-edu-student-name", trimmedName);
    window.localStorage.setItem("sains-edu-university", trimmedUniv);
    setIsStartOpen(false);
    setShowSplash(true);
    window.setTimeout(() => {
      router.push("/dashboard");
    }, 650);
  };

  if (showSplash) {
    return (
      <div className="flex min-h-dvh flex-1 items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/loading.png"
            alt={t.splashAlt}
            width={180}
            height={180}
            priority
            className="select-none"
          />
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200"
            style={{ borderTopColor: "var(--brand)" }}
            aria-label="Loading"
            role="status"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50">
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-6 py-4 sm:flex-row sm:items-center">
          <Image
            src="/Logo.png"
            alt="Edu Sains"
            width={220}
            height={44}
            priority
            className="h-8 w-auto select-none"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenStart}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold text-white transition-colors hover:opacity-90 sm:px-5 sm:py-2.5 sm:text-sm"
              style={{ backgroundColor: "var(--brand)" }}
            >
              {t.start}
            </button>
            <div className="flex items-center rounded-full border border-zinc-200 bg-white p-1">
              <span className="hidden px-2 text-xs font-medium text-zinc-600 sm:inline">
                {t.lang}
              </span>
              <button
                type="button"
                onClick={() => setLocale("id")}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  locale === "id"
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-700 hover:bg-zinc-100"
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
                    : "text-zinc-700 hover:bg-zinc-100"
                }`}
                aria-pressed={locale === "en"}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-8 sm:py-10">
        <section
          id="mulai-belajar"
          className="reveal-up relative scroll-mt-24 overflow-hidden rounded-3xl bg-[var(--brand)] [clip-path:polygon(0_0,100%_0,100%_86%,0_100%)]"
        >
          <div className="pointer-events-none absolute inset-0 opacity-25 [background:radial-gradient(circle_at_20%_20%,white,transparent_60%)]" />
          <div className="relative z-10 grid min-h-[300px] grid-cols-1 items-center gap-8 p-6 sm:p-10 md:grid-cols-[1.15fr_0.85fr] md:gap-10 md:p-14">
            <div className="max-w-xl text-white">
              <p className="text-sm font-semibold tracking-wide text-white/90">
                {t.brand}
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                {t.subject}
              </h1>
              <p className="mt-4 text-base leading-7 text-white/90 md:text-lg">
                {t.headline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onOpenStart}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white/90"
                >
                  {t.start}
                </button>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-white/45 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {t.materials}
                </a>
              </div>
            </div>
            <div className="relative hidden h-[340px] md:block lg:h-[380px]">
              <Image
                src="/cartoon-hero.png"
                alt={t.heroAlt}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 0vw"
                className="select-none object-contain object-bottom-right"
              />
            </div>
            <div className="relative mx-auto h-[220px] w-[240px] sm:h-[240px] sm:w-[260px] md:hidden">
              <Image
                src="/cartoon-hero.png"
                alt={t.heroAlt}
                fill
                priority
                sizes="260px"
                className="select-none object-contain"
              />
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mx-auto max-w-2xl text-center text-xl font-semibold leading-8 text-zinc-900 md:text-2xl">
            {t.growthTitle}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
            {t.growthItems.map((item, index) => (
              <div
                key={item.title}
                className="reveal-up flex flex-col items-start justify-between gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200/70 sm:flex-row sm:gap-6 sm:p-6"
                  style={revealDelayStyle(index * 80)}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-800">
                      {index + 1}
                    </div>
                    <h3 className="text-base font-semibold leading-6 text-zinc-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {item.desc}
                  </p>
                </div>

                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center self-end rounded-2xl sm:self-auto"
                  style={{ backgroundColor: "rgba(46, 193, 185, 0.18)" }}
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: "var(--brand)" }}
                  >
                    <Icon kind={item.icon} />
                  </div>
                </div>
              </div>
            ))}

            <div
              className="reveal-up rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200/70 md:col-span-2 sm:p-6"
              style={revealDelayStyle(360)}
            >
              <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-6 text-zinc-900">
                    {t.growthExtraTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {t.growthExtraDesc}
                  </p>
                </div>
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: "rgba(46, 193, 185, 0.18)" }}
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: "var(--brand)" }}
                  >
                    <Icon kind={t.growthExtraIcon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal-up mt-12">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 md:text-2xl">
                {t.leaderboardTitle}
              </h2>
              <p className="mt-1 text-sm text-zinc-600">
                {t.leaderboardSubtitle}
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200/70">
            <div className="divide-y divide-zinc-200/70">
              {leaderboard.map((u, idx) => (
                <div
                  key={`${u.name}-${u.univ}`}
                  className="reveal-up flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
                  style={revealDelayStyle(idx * 70)}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                      style={{ backgroundColor: "var(--brand)" }}
                    >
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-zinc-900">
                        {u.name}
                      </p>
                      <p className="truncate text-xs text-zinc-500">{u.univ}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs font-semibold text-zinc-500">
                      {t.scoreLabel}
                    </p>
                    <p className="text-sm font-semibold text-zinc-900">
                      {u.score}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="reveal-up border-t border-zinc-200/70 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Image
                src="/Logo.png"
                alt="Edu Sains"
                width={180}
                height={36}
                className="h-8 w-auto select-none"
              />
            </div>
            <p className="max-w-xl text-sm leading-6 text-zinc-600">
              {t.footerTagline}
            </p>
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-zinc-200/70 pt-6 sm:flex-row sm:items-center">
            <p className="text-xs font-medium text-zinc-500">
              © {new Date().getFullYear()} {t.footerCopyright}
            </p>
            <div className="flex items-center gap-3 text-xs font-semibold text-zinc-600">
              <a href="#mulai-belajar" className="hover:text-zinc-900">
                {t.start}
              </a>
              <a href="#" className="hover:text-zinc-900">
                {t.materials}
              </a>
            </div>
          </div>
        </div>
        <div className="h-24" />
      </footer>

      {!isStartOpen ? (
        <>
          {showScrollTop ? (
            <button
              type="button"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="fixed bottom-4 left-4 z-40 inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm transition-colors hover:bg-zinc-50"
            >
              {t.scrollTop}
            </button>
          ) : null}

          <div className="fixed bottom-4 right-4 z-40">
            {isChatOpen ? (
              <div className="w-[320px] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-zinc-200 sm:w-[360px]">
                <div className="flex items-center justify-between gap-3 border-b border-zinc-200/70 px-4 py-3">
                  <p className="text-sm font-semibold text-zinc-900">
                    {t.chatTitle}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsChatOpen(false)}
                    className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                    aria-label="Close"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5">
                      <path
                        d="M6 6l12 12M18 6 6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="max-h-[320px] space-y-3 overflow-y-auto px-4 py-4">
                  {chatMessages.map((m, i) => (
                    <div
                      key={`${m.role}-${i}`}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                          m.role === "user"
                            ? "bg-zinc-900 text-white"
                            : "bg-zinc-100 text-zinc-900"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <div className="border-t border-zinc-200/70 p-3">
                  <div className="flex items-center gap-2">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") onSendChat();
                      }}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-[var(--brand)]"
                      placeholder={t.chatPlaceholder}
                    />
                    <button
                      type="button"
                      onClick={onSendChat}
                      className="shrink-0 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: "var(--brand)" }}
                    >
                      {t.chatSend}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenChat}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-colors hover:opacity-90"
                style={{ backgroundColor: "var(--brand)" }}
                aria-label={t.chatTitle}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    d="M4 5h16v11H7l-3 3V5Z"
                    fill="currentColor"
                    opacity="0.95"
                  />
                  <path
                    d="M7.5 9h9M7.5 12h6.5"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </>
      ) : null}

      {isStartOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t.formTitle}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setFormError(null);
              setIsStartOpen(false);
            }
          }}
        >
          <form
            onSubmit={onSubmitStart}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-zinc-200"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-zinc-900">
                {t.formTitle}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setFormError(null);
                  setIsStartOpen(false);
                }}
                className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-zinc-800">
                  {t.nameLabel}
                </span>
                <input
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-0 transition-colors placeholder:text-zinc-400 focus:border-[var(--brand)]"
                  placeholder={t.nameLabel}
                  autoFocus
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-zinc-800">
                  {t.univLabel}
                </span>
                <input
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-0 transition-colors placeholder:text-zinc-400 focus:border-[var(--brand)]"
                  placeholder={t.univLabel}
                />
              </label>

              {formError ? (
                <p className="text-sm font-medium text-red-600">{formError}</p>
              ) : null}
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setFormError(null);
                  setIsStartOpen(false);
                }}
                className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "var(--brand)" }}
              >
                {t.startNow}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
