"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type Locale = "id" | "en";
type Stage = "intro" | "question" | "result";
type AnswerMap = Record<string, string>;
type Domain = "pengetahuan" | "keterampilan" | "sikap";
type LocalizedText = { id: string; en: string };
type Question = {
  id: string;
  domain: Domain;
  module: string;
  prompt: LocalizedText;
  options: Array<{ value: string; label: LocalizedText }>;
  correct: string;
};

const questions: Question[] = [
  {
    id: "eq1", domain: "pengetahuan", module: "M1",
    prompt: {
      id: "Perbedaan utama antara zat adiktif dan psikotropika adalah...",
      en: "The main difference between addictive substances and psychotropics is...",
    },
    options: [
      { value: "a", label: { id: "Psikotropika lebih berbahaya dari zat adiktif.", en: "Psychotropics are more dangerous than addictive substances." } },
      { value: "b", label: { id: "Zat adiktif menimbulkan ketergantungan; psikotropika bekerja khusus pada sistem saraf pusat mengubah aktivitas mental.", en: "Addictive substances cause dependency; psychotropics specifically target the CNS to alter mental activity." } },
      { value: "c", label: { id: "Keduanya memiliki definisi hukum yang sama di Indonesia.", en: "Both share the same legal definition in Indonesia." } },
      { value: "d", label: { id: "Zat adiktif hanya dari alam, psikotropika hanya buatan.", en: "Addictive substances are only natural; psychotropics are only synthetic." } },
    ],
    correct: "b",
  },
  {
    id: "eq2", domain: "pengetahuan", module: "M1",
    prompt: {
      id: "Seseorang dengan literasi halal yang baik akan...",
      en: "A person with good halal literacy will...",
    },
    options: [
      { value: "a", label: { id: "Hanya membeli produk berlabel halal MUI.", en: "Only buy products with an MUI halal label." } },
      { value: "b", label: { id: "Menilai kandungan, efek, dan potensi mudarat sebelum mengonsumsi produk.", en: "Assess ingredients, effects, and potential harm before consuming a product." } },
      { value: "c", label: { id: "Mengikuti pilihan orang tua tanpa mempertanyakan kandungan produk.", en: "Follow parents' choices without questioning product contents." } },
      { value: "d", label: { id: "Menghindari semua produk yang tidak dijual di apotek.", en: "Avoid all products not sold at pharmacies." } },
    ],
    correct: "b",
  },
  {
    id: "eq3", domain: "pengetahuan", module: "M1",
    prompt: {
      id: "Kafein dan nikotin termasuk golongan zat...",
      en: "Caffeine and nicotine both belong to the class of...",
    },
    options: [
      { value: "a", label: { id: "Depresan.", en: "Depressants." } },
      { value: "b", label: { id: "Halusinogen.", en: "Hallucinogens." } },
      { value: "c", label: { id: "Stimulan.", en: "Stimulants." } },
      { value: "d", label: { id: "Sedatif.", en: "Sedatives." } },
    ],
    correct: "c",
  },
  {
    id: "eq4", domain: "pengetahuan", module: "M1",
    prompt: {
      id: "Seseorang dianggap mengalami adiksi jika...",
      en: "A person is considered addicted if they...",
    },
    options: [
      { value: "a", label: { id: "Pernah mencoba suatu zat lebih dari sekali.", en: "Have tried a substance more than once." } },
      { value: "b", label: { id: "Mengalami craving, toleransi meningkat, dan kesulitan berhenti meski sadar dampak negatifnya.", en: "Experience craving, increasing tolerance, and difficulty stopping despite knowing the negative effects." } },
      { value: "c", label: { id: "Merasa lebih percaya diri setelah menggunakan produk tertentu.", en: "Feel more confident after using a particular product." } },
      { value: "d", label: { id: "Menggunakan obat resep dokter secara rutin.", en: "Regularly use prescribed medication." } },
    ],
    correct: "b",
  },
  {
    id: "eq5", domain: "pengetahuan", module: "M1",
    prompt: {
      id: "Urutan proses farmakokinetik yang benar adalah...",
      en: "The correct order of pharmacokinetic processes is...",
    },
    options: [
      { value: "a", label: { id: "Distribusi → Absorpsi → Metabolisme → Ekskresi", en: "Distribution → Absorption → Metabolism → Excretion" } },
      { value: "b", label: { id: "Absorpsi → Distribusi → Metabolisme → Ekskresi", en: "Absorption → Distribution → Metabolism → Excretion" } },
      { value: "c", label: { id: "Metabolisme → Absorpsi → Distribusi → Ekskresi", en: "Metabolism → Absorption → Distribution → Excretion" } },
      { value: "d", label: { id: "Ekskresi → Metabolisme → Distribusi → Absorpsi", en: "Excretion → Metabolism → Distribution → Absorption" } },
    ],
    correct: "b",
  },
  {
    id: "eq6", domain: "pengetahuan", module: "M1",
    prompt: {
      id: "Hati berperan kritis dalam farmakokinetik karena...",
      en: "The liver plays a critical role in pharmacokinetics because it...",
    },
    options: [
      { value: "a", label: { id: "Menghasilkan dopamin untuk sistem reward otak.", en: "Produces dopamine for the brain's reward system." } },
      { value: "b", label: { id: "Memompa zat ke seluruh tubuh melalui aliran darah.", en: "Pumps substances throughout the body via blood flow." } },
      { value: "c", label: { id: "Memproses dan mendetoksifikasi zat sebelum dikeluarkan dari tubuh.", en: "Processes and detoxifies substances before they are expelled from the body." } },
      { value: "d", label: { id: "Menyimpan zat sebagai cadangan energi jangka panjang.", en: "Stores substances as long-term energy reserves." } },
    ],
    correct: "c",
  },
  {
    id: "eq7", domain: "keterampilan", module: "M2",
    prompt: {
      id: "Penggunaan zat adiktif berulang kali menyebabkan toleransi karena...",
      en: "Repeated use of addictive substances causes tolerance because...",
    },
    options: [
      { value: "a", label: { id: "Tubuh memproduksi lebih banyak zat tersebut secara alami.", en: "The body naturally produces more of the substance." } },
      { value: "b", label: { id: "Otak menyesuaikan jumlah reseptor dopaminnya sehingga respons terhadap zat berkurang.", en: "The brain adjusts its dopamine receptors so the response to the substance diminishes." } },
      { value: "c", label: { id: "Zat tersebut semakin cepat diabsorpsi seiring waktu.", en: "The substance is absorbed faster over time." } },
      { value: "d", label: { id: "Sistem imun menghancurkan zat tersebut lebih efisien.", en: "The immune system destroys the substance more efficiently." } },
    ],
    correct: "b",
  },
  {
    id: "eq8", domain: "keterampilan", module: "M2",
    prompt: {
      id: "Gejala withdrawal (putus zat) muncul karena...",
      en: "Withdrawal symptoms occur because...",
    },
    options: [
      { value: "a", label: { id: "Tubuh kelebihan dopamin setelah penghentian penggunaan.", en: "The body has excess dopamine after stopping use." } },
      { value: "b", label: { id: "Sistem saraf yang sudah menyesuaikan diri dengan zat tiba-tiba kehilangan rangsangan tersebut.", en: "A nervous system adapted to the substance suddenly loses that stimulation." } },
      { value: "c", label: { id: "Hati tidak bisa lagi memetabolisme zat yang sudah ada.", en: "The liver can no longer metabolize the existing substance." } },
      { value: "d", label: { id: "Otak mulai memproduksi zat adiktif sendiri sebagai pengganti.", en: "The brain starts producing the addictive substance itself as a substitute." } },
    ],
    correct: "b",
  },
  {
    id: "eq9", domain: "keterampilan", module: "M3",
    prompt: {
      id: "Paru-paru sangat rentan terhadap dampak zat yang dihirup karena...",
      en: "Lungs are particularly vulnerable to inhaled substances because...",
    },
    options: [
      { value: "a", label: { id: "Paru-paru adalah organ terbesar di tubuh.", en: "The lungs are the largest organ in the body." } },
      { value: "b", label: { id: "Paru-paru berhubungan langsung dengan sistem saraf pusat.", en: "The lungs connect directly to the central nervous system." } },
      { value: "c", label: { id: "Zat yang dihirup langsung masuk ke jaringan paru dan mengganggu pertukaran gas.", en: "Inhaled substances enter lung tissue directly and disrupt gas exchange." } },
      { value: "d", label: { id: "Paru-paru tidak memiliki mekanisme pertahanan apapun.", en: "The lungs have no defense mechanisms whatsoever." } },
    ],
    correct: "c",
  },
  {
    id: "eq10", domain: "keterampilan", module: "M3",
    prompt: {
      id: "Perbedaan antara efek jangka pendek dan jangka panjang zat adiktif pada organ adalah...",
      en: "The difference between short-term and long-term effects of addictive substances on organs is...",
    },
    options: [
      { value: "a", label: { id: "Efek jangka pendek bersifat segera dan sering reversibel; jangka panjang cenderung kumulatif dan permanen.", en: "Short-term effects are immediate and often reversible; long-term effects tend to be cumulative and permanent." } },
      { value: "b", label: { id: "Efek jangka pendek hanya memengaruhi otak; jangka panjang hanya memengaruhi hati.", en: "Short-term effects only affect the brain; long-term effects only affect the liver." } },
      { value: "c", label: { id: "Efek jangka panjang lebih cepat muncul dibanding jangka pendek.", en: "Long-term effects appear faster than short-term effects." } },
      { value: "d", label: { id: "Keduanya tidak berbeda secara medis.", en: "They are not medically different." } },
    ],
    correct: "a",
  },
  {
    id: "eq11", domain: "keterampilan", module: "M4",
    prompt: {
      id: "Saat membaca label produk, yang paling penting diperiksa pertama kali adalah...",
      en: "When reading a product label, the most important thing to check first is...",
    },
    options: [
      { value: "a", label: { id: "Desain dan warna kemasan produk.", en: "The design and color of the packaging." } },
      { value: "b", label: { id: "Komposisi bahan, izin edar, dan ada tidaknya peringatan kesehatan.", en: "Ingredient composition, distribution permit, and whether health warnings are present." } },
      { value: "c", label: { id: "Tanggal produksi saja.", en: "Only the production date." } },
      { value: "d", label: { id: "Nama merek dan reputasi produsen.", en: "Brand name and producer reputation." } },
    ],
    correct: "b",
  },
  {
    id: "eq12", domain: "keterampilan", module: "M4",
    prompt: {
      id: "Prinsip halal-tayyib membantu keputusan konsumsi dengan cara...",
      en: "The halal-tayyib principle aids consumption decisions by...",
    },
    options: [
      { value: "a", label: { id: "Mewajibkan semua produk memiliki label dari MUI.", en: "Requiring all products to carry an MUI label." } },
      { value: "b", label: { id: "Melarang konsumsi semua produk impor.", en: "Prohibiting consumption of all imported products." } },
      { value: "c", label: { id: "Mendorong penilaian menyeluruh: kehalalan, keamanan, manfaat, dan potensi mudarat.", en: "Encouraging a holistic assessment: lawfulness, safety, benefit, and potential harm." } },
      { value: "d", label: { id: "Memastikan produk hanya dijual oleh perusahaan muslim.", en: "Ensuring products are only sold by Muslim-owned companies." } },
    ],
    correct: "c",
  },
  {
    id: "eq13", domain: "sikap", module: "M5",
    prompt: {
      id: "Strategi menolak ajakan penggunaan zat yang paling efektif dan asertif adalah...",
      en: "The most effective and assertive strategy for refusing substance use invitations is...",
    },
    options: [
      { value: "a", label: { id: "Diam dan langsung pergi tanpa penjelasan.", en: "Stay silent and leave immediately without explanation." } },
      { value: "b", label: { id: "Mengatakan tidak dengan tegas, memberi alasan jelas, dan tidak merasa bersalah.", en: "Saying no firmly, giving a clear reason, and feeling no guilt." } },
      { value: "c", label: { id: "Menerima ajakan sekali agar tidak dianggap sombong.", en: "Accepting once to avoid seeming arrogant." } },
      { value: "d", label: { id: "Meminta orang tua untuk berbicara dengan teman yang mengajak.", en: "Asking a parent to speak to the inviting friend." } },
    ],
    correct: "b",
  },
  {
    id: "eq14", domain: "sikap", module: "M5",
    prompt: {
      id: "Penolakan berbasis ilmu berarti menolak ajakan karena...",
      en: "Science-based refusal means declining an invitation because you...",
    },
    options: [
      { value: "a", label: { id: "Diperintahkan agama tanpa perlu memahami alasannya.", en: "Are commanded by religion without needing to understand why." } },
      { value: "b", label: { id: "Takut hukuman dari orang tua atau guru.", en: "Fear punishment from parents or teachers." } },
      { value: "c", label: { id: "Tidak suka penampilan atau bau zat tersebut.", en: "Dislike the appearance or smell of the substance." } },
      { value: "d", label: { id: "Memahami jenis zat, mekanisme adiksi, dampak organ, dan risiko kesehatan yang nyata.", en: "Understand the substance type, addiction mechanism, organ impact, and real health risks." } },
    ],
    correct: "d",
  },
];

const domainIds: Domain[] = ["pengetahuan", "keterampilan", "sikap"];

function getBadge(score: number): { label: { id: string; en: string }; emoji: string; color: string } {
  if (score >= 13) return { label: { id: "Pakar Literasi Sains", en: "Science Literacy Expert" }, emoji: "🏆", color: "#f59e0b" };
  if (score >= 10) return { label: { id: "Ilmuwan Kritis", en: "Critical Scientist" }, emoji: "🔬", color: "#2ec1b9" };
  if (score >= 6) return { label: { id: "Pemahaman Berkembang", en: "Developing Understanding" }, emoji: "📚", color: "#6366f1" };
  return { label: { id: "Penjelajah Ilmu", en: "Science Explorer" }, emoji: "🌱", color: "#22c55e" };
}

function getDomainScore(answers: AnswerMap, domain: Domain): { correct: number; total: number } {
  const qs = questions.filter((q) => q.domain === domain);
  const correct = qs.filter((q) => answers[q.id] === q.correct).length;
  return { correct, total: qs.length };
}

const weakModules: Record<string, { id: string; en: string }> = {
  M1: { id: "M1 — Zat Adiktif, Psikotropika, Klasifikasi & Farmakokinetik", en: "M1 — Addictive Substances, Psychotropics, Classification & Pharmacokinetics" },
  M2: { id: "M2 — Sistem Reward Otak", en: "M2 — Brain Reward System" },
  M3: { id: "M3 — Dampak pada Organ", en: "M3 — Impact on Organs" },
  M4: { id: "M4 — Literasi Halal", en: "M4 — Halal Literacy" },
  M5: { id: "M5 — Studi Kasus & Strategi", en: "M5 — Case Studies & Strategies" },
};

export default function EvaluatePage() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("id");
  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("sains-edu-locale");
    if (saved === "id" || saved === "en") setLocale(saved);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal-up"));
    for (const el of elements) el.classList.remove("is-visible");
    if (typeof window.IntersectionObserver === "undefined") {
      for (const el of elements) el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [stage, activeIndex]);

  const t = useMemo(
    () => ({
      back: locale === "id" ? "← Kembali" : "← Back",
      title: locale === "id" ? "Evaluasi Sumatif" : "Summative Evaluation",
      subtitle: locale === "id" ? "Kuis & Evaluasi" : "Quiz & Evaluation",
      introDesc: locale === "id"
        ? "Uji pemahaman kamu tentang seluruh materi modul M1–M5. Evaluasi ini mencakup tiga domain kompetensi: Pengetahuan, Keterampilan, dan Sikap."
        : "Test your understanding of all module content M1–M5. This evaluation covers three competency domains: Knowledge, Skills, and Values.",
      stats: locale === "id"
        ? ["14 soal pilihan ganda", "Mencakup M1–M5", "3 domain kompetensi"]
        : ["14 multiple-choice questions", "Covers M1–M5", "3 competency domains"],
      start: locale === "id" ? "Mulai Evaluasi" : "Start Evaluation",
      question: locale === "id" ? "Soal" : "Question",
      of: locale === "id" ? "dari" : "of",
      prev: locale === "id" ? "← Sebelumnya" : "← Previous",
      next: locale === "id" ? "Berikutnya →" : "Next →",
      submit: locale === "id" ? "Kirim Jawaban" : "Submit Answers",
      resultTitle: locale === "id" ? "Hasil Evaluasi" : "Evaluation Result",
      yourScore: locale === "id" ? "Skor Kamu" : "Your Score",
      domainLabel: {
        pengetahuan: locale === "id" ? "Pengetahuan" : "Knowledge",
        keterampilan: locale === "id" ? "Keterampilan" : "Skills",
        sikap: locale === "id" ? "Sikap & Nilai" : "Values & Attitude",
      },
      badge: locale === "id" ? "Pencapaian" : "Achievement",
      strengthen: locale === "id" ? "Rekomendasi Penguatan" : "Strengthening Recommendations",
      strengthenDesc: locale === "id" ? "Pelajari ulang modul berikut:" : "Review the following modules:",
      allPassed: locale === "id" ? "Semua domain sudah kamu kuasai. Luar biasa!" : "You have mastered all domains. Excellent!",
      backToExplore: locale === "id" ? "Kembali ke Peta Modul" : "Back to Module Map",
      retake: locale === "id" ? "Ulangi Evaluasi" : "Retake Evaluation",
    }),
    [locale]
  );

  const currentQ = questions[activeIndex];
  const totalQ = questions.length;
  const progress = ((activeIndex + 1) / totalQ) * 100;

  const handleSelect = useCallback((value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
  }, [currentQ]);

  const handleNext = useCallback(() => {
    if (activeIndex < totalQ - 1) {
      setActiveIndex((i) => i + 1);
    } else {
      // Score and save
      const score = questions.filter((q) => answers[q.id] === q.correct).length;
      const badge = getBadge(score);
      localStorage.setItem("sains-edu-evaluate-score", String(score));
      localStorage.setItem("sains-edu-evaluate-badge", badge.label[locale]);
      setStage("result");
    }
  }, [activeIndex, totalQ, answers, locale]);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) setActiveIndex((i) => i - 1);
  }, [activeIndex]);

  const handleRetake = useCallback(() => {
    setAnswers({});
    setActiveIndex(0);
    setStage("question");
  }, []);

  // Derive result data
  const score = questions.filter((q) => answers[q.id] === q.correct).length;
  const badge = getBadge(score);
  const wrongModules = questions
    .filter((q) => answers[q.id] !== q.correct)
    .map((q) => q.module)
    .filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#f0fffe_0%,#f9f9fb_60%,#fff_100%)]">
      {/* Top bar */}
      <header className="sticky top-0 z-20 flex h-14 items-center border-b border-zinc-200/70 bg-white/80 px-4 backdrop-blur-md sm:px-6">
        <button
          onClick={() => router.push("/dashboard/explore")}
          className="rounded-xl px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
        >
          {t.back}
        </button>
        <span className="ml-4 text-sm font-semibold text-zinc-800">{t.subtitle}</span>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {/* INTRO */}
        {stage === "intro" && (
          <div className="reveal-up rounded-[1.75rem] border border-zinc-200/70 bg-white/90 p-8 shadow-sm ring-1 ring-zinc-200/60">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl" style={{ backgroundColor: "rgba(46,193,185,0.12)" }}>
              📝
            </div>
            <h1 className="text-2xl font-bold text-zinc-900">{t.title}</h1>
            <p className="mt-3 text-sm leading-7 text-zinc-600">{t.introDesc}</p>
            <ul className="mt-5 space-y-2">
              {t.stats.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-zinc-700">
                  <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--brand)" }} />
                  {s}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setStage("question")}
              className="mt-8 w-full rounded-xl py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ backgroundColor: "var(--brand)" }}
            >
              {t.start}
            </button>
          </div>
        )}

        {/* QUESTION */}
        {stage === "question" && (
          <div className="space-y-5">
            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>{t.question} {activeIndex + 1} {t.of} {totalQ}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%`, backgroundColor: "var(--brand)" }}
              />
            </div>

            {/* Domain chip */}
            <div className="flex items-center gap-2">
              <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium" style={{ borderColor: "var(--brand)", color: "var(--brand)" }}>
                {t.domainLabel[currentQ.domain]}
              </span>
              <span className="text-xs text-zinc-400">{currentQ.module}</span>
            </div>

            {/* Question card */}
            <div className="rounded-[1.5rem] border border-zinc-200/70 bg-white/90 p-6 shadow-sm ring-1 ring-zinc-200/60">
              <p className="text-base font-semibold leading-7 text-zinc-900">{currentQ.prompt[locale]}</p>

              <div className="mt-5 space-y-3">
                {currentQ.options.map((opt) => {
                  const selected = answers[currentQ.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className="w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all"
                      style={
                        selected
                          ? { borderColor: "var(--brand)", backgroundColor: "rgba(46,193,185,0.10)", color: "#0f766e" }
                          : { borderColor: "#e5e7eb", backgroundColor: "white", color: "#3f3f46" }
                      }
                    >
                      <span className="mr-2 font-bold uppercase">{opt.value}.</span>
                      {opt.label[locale]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nav */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-30"
              >
                {t.prev}
              </button>
              <button
                onClick={handleNext}
                disabled={!answers[currentQ.id]}
                className="rounded-xl px-5 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-40"
                style={{ backgroundColor: "var(--brand)" }}
              >
                {activeIndex === totalQ - 1 ? t.submit : t.next}
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {stage === "result" && (
          <div className="space-y-5">
            <h1 className="text-xl font-bold text-zinc-900">{t.resultTitle}</h1>
            {/* Score card */}
            <div className="rounded-[1.75rem] border border-zinc-200/70 bg-white/90 p-8 shadow-sm ring-1 ring-zinc-200/60 text-center">
              <p className="text-sm font-medium text-zinc-500">{t.yourScore}</p>
              <p className="mt-1 text-6xl font-black" style={{ color: "var(--brand)" }}>
                {score}<span className="text-2xl font-semibold text-zinc-400">/{totalQ}</span>
              </p>
              <p className="mt-2 text-xs text-zinc-400">{Math.round((score / totalQ) * 100)}%</p>
            </div>

            {/* Domain breakdown */}
            <div className="rounded-[1.5rem] border border-zinc-200/70 bg-white/90 p-6 shadow-sm ring-1 ring-zinc-200/60">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Domain</p>
              <div className="mt-4 space-y-4">
                {domainIds.map((d) => {
                  const { correct, total } = getDomainScore(answers, d);
                  const pct = Math.round((correct / total) * 100);
                  return (
                    <div key={d}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-zinc-700">{t.domainLabel[d]}</span>
                        <span className="font-semibold" style={{ color: pct >= 60 ? "var(--brand)" : "#f97316" }}>
                          {correct}/{total}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: pct >= 60 ? "var(--brand)" : "#f97316" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Badge */}
            <div className="rounded-[1.5rem] border border-zinc-200/70 bg-white/90 p-6 shadow-sm ring-1 ring-zinc-200/60 flex items-center gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-3xl" style={{ backgroundColor: `${badge.color}1a` }}>
                {badge.emoji}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{t.badge}</p>
                <p className="mt-0.5 text-base font-bold text-zinc-900">{badge.label[locale]}</p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="rounded-[1.5rem] border border-zinc-200/70 bg-white/90 p-6 shadow-sm ring-1 ring-zinc-200/60">
              <p className="text-sm font-semibold text-zinc-900">{t.strengthen}</p>
              {wrongModules.length === 0 ? (
                <p className="mt-2 text-sm text-zinc-500">{t.allPassed}</p>
              ) : (
                <>
                  <p className="mt-1 text-xs text-zinc-500">{t.strengthenDesc}</p>
                  <ul className="mt-3 space-y-2">
                    {wrongModules.map((m) => (
                      <li key={m} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#f97316" }} />
                        <button
                          onClick={() => router.push(`/dashboard/modules/${m}`)}
                          className="text-sm font-medium text-zinc-700 underline underline-offset-2 hover:text-zinc-900"
                        >
                          {weakModules[m]?.[locale] ?? m}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/dashboard/explore")}
                className="flex-1 rounded-xl border border-zinc-200 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
              >
                {t.backToExplore}
              </button>
              <button
                onClick={handleRetake}
                className="flex-1 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--brand)" }}
              >
                {t.retake}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
