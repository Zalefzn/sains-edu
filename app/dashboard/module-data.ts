export type Locale = "id" | "en";
export type Level = "dasar" | "sedang" | "lanjut";
export type ModuleCode = "M1" | "M2" | "M3" | "M4" | "M5";
export type LocalizedText = { id: string; en: string };
export type ModuleItem = {
  code: ModuleCode;
  title: LocalizedText;
  summary: LocalizedText;
  prompt: LocalizedText;
};
export type ExerciseQuestion = {
  id: string;
  prompt: LocalizedText;
  options: Array<{ value: string; label: LocalizedText }>;
  correct: string;
};

export type ModuleQuote = {
  arabic?: string;
  translation: LocalizedText;
  source: string;
};

export type ModuleTable = {
  headers: LocalizedText[];
  rows: LocalizedText[][];
};

export type ModuleTab = {
  id: string;
  label: LocalizedText;
  body?: LocalizedText;
  table?: ModuleTable;
  quote?: ModuleQuote;
};

export type DopamineComparisonItem = {
  key: string;
  label: LocalizedText;
  widthPercent: number;
  color: string;
  resultLabel: LocalizedText;
  description: LocalizedText;
};

export type DopamineChart = {
  title: LocalizedText;
  items: DopamineComparisonItem[];
};

export type MoleculeItem = {
  key: string;
  label: LocalizedText;
  pubchemCid: number;
  description: LocalizedText;
};

export type ModuleStep = {
  key:
    | "stimulus"
    | "goal"
    | "material"
    | "visual"
    | "value"
    | "halal"
    | "exercise";
  title: LocalizedText;
  body: LocalizedText;
  checkpoints?: LocalizedText[];
  questions?: ExerciseQuestion[];
  table?: ModuleTable;
  quotes?: ModuleQuote[];
  tabs?: ModuleTab[];
  dopamineChart?: DopamineChart;
  molecules?: MoleculeItem[];
};

export type ModuleProgressMap = Record<ModuleCode, number>;

export const modules: ModuleItem[] = [
  {
    code: "M1",
    title: {
      id: "Pengertian, ruang lingkup, dan klasifikasi zat adiktif serta psikotropika",
      en: "Definition, scope, and classification of addictive substances and psychotropics",
    },
    summary: {
      id: "Mengenal definisi, contoh umum, dan ruang lingkup zat adiktif serta psikotropika, dan mengklasifikasikannya ke dalam stimulan, depresan, halusinogen, dan opioid.",
      en: "Learn the definition, common examples, and scope of addictive substances and psychotropics, and classify them into stimulants, depressants, hallucinogens, and opioids.",
    },
    prompt: {
      id: "Mengapa memahami pengertian, ruang lingkup, dan klasifikasi zat adiktif penting untuk menjaga diri dan membuat keputusan yang aman?",
      en: "Why is understanding the definition, scope, and classification of addictive substances important for self-protection and safe decision making?",
    },
  },
  {
    code: "M2",
    title: {
      id: "Sistem reward otak (dopamin, craving, tolerance, withdrawal)",
      en: "Brain reward system (dopamine, craving, tolerance, withdrawal)",
    },
    summary: {
      id: "Mengkaji dopamin, craving, tolerance, dan withdrawal pada perilaku adiktif.",
      en: "Study dopamine, craving, tolerance, and withdrawal in addictive behavior.",
    },
    prompt: {
      id: "Bagaimana perubahan kimia di otak dapat memengaruhi perilaku dan keputusan?",
      en: "How can chemical changes in the brain influence behavior and decisions?",
    },
  },
  {
    code: "M3",
    title: {
      id: "Dampak pada organ (otak, jantung, paru, hati) dan timeline efek",
      en: "Organ impact (brain, heart, lungs, liver) and effect timeline",
    },
    summary: {
      id: "Menghubungkan dampak zat adiktif pada organ dengan perubahan jangka pendek dan jangka panjang.",
      en: "Connect addictive substance effects on organs with short-term and long-term changes.",
    },
    prompt: {
      id: "Apa hubungan perubahan organ dengan konsep kimia yang dipelajari?",
      en: "How are organ changes related to the chemistry concepts being studied?",
    },
  },
  {
    code: "M4",
    title: {
      id: "Literasi halal (label, red flags, aman konsumsi)",
      en: "Halal literacy (labels, red flags, safe consumption)",
    },
    summary: {
      id: "Melatih pembacaan label, red flags, dan keputusan konsumsi yang aman.",
      en: "Practice reading labels, spotting red flags, and making safe consumption decisions.",
    },
    prompt: {
      id: "Bagaimana prinsip halal-tayyib membantu menilai sebuah produk atau zat?",
      en: "How do halal-tayyib principles help evaluate a product or substance?",
    },
  },
  {
    code: "M5",
    title: {
      id: "Studi kasus dan strategi menolak ajakan",
      en: "Case study and refusal strategy",
    },
    summary: {
      id: "Menganalisis skenario ajakan dan menyusun respons yang aman serta asertif.",
      en: "Analyze invitation scenarios and prepare safe, assertive responses.",
    },
    prompt: {
      id: "Respons seperti apa yang aman, asertif, dan sesuai nilai yang dipelajari?",
      en: "What response is safe, assertive, and aligned with the values being learned?",
    },
  },
];

export const priorityByLevel: Record<Level, ModuleCode[]> = {
  dasar: ["M1", "M3", "M4"],
  sedang: ["M1", "M2", "M3", "M4"],
  lanjut: ["M1", "M2", "M4", "M5"],
};

export const moduleStepsByCode: Record<ModuleCode, ModuleStep[]> = {
  M1: [
    {
      key: "stimulus",
      title: {
        id: "Stimulus",
        en: "Stimulus",
      },
      body: {
        id: "Di sekitar remaja terdapat rokok, vape, obat penenang, minuman berenergi, dan produk lain yang sering dianggap biasa. Tidak semua orang memahami mana yang termasuk zat adiktif, mana yang tergolong psikotropika, dan apa akibatnya bila digunakan tanpa pengetahuan yang benar. Dua produk yang terlihat mirip pun bisa memiliki kandungan dan risiko yang sangat berbeda — ada yang bersifat stimulan, ada yang menekan sistem saraf, ada yang mengubah persepsi, dan ada pula opioid yang bekerja pada reseptor nyeri, masing-masing dengan status hukum Islam yang berbeda.",
        en: "Around teenagers there are cigarettes, vapes, sedatives, energy drinks, and other products often seen as ordinary. Not everyone understands which are addictive substances, which are psychotropics, and what happens when they are used without proper knowledge. Two products may even look similar yet have very different content and risk — some are stimulants, some depress the nervous system, some alter perception, and others are opioids acting on pain receptors — each with a different Islamic legal status.",
      },
    },
    {
      key: "goal",
      title: {
        id: "Tujuan Belajar + Indikator Literasi Halal",
        en: "Learning Goals + Halal Literacy Indicators",
      },
      body: {
        id: "Kamu diharapkan mampu menjelaskan pengertian zat adiktif dan psikotropika, membedakan ruang lingkup keduanya, mengklasifikasikan zat psikoaktif ke dalam stimulan, depresan, halusinogen, dan opioid beserta contoh senyawa kimianya, serta memahami pentingnya kehati-hatian saat menghadapi produk yang berpotensi menimbulkan ketergantungan.",
        en: "You are expected to explain the definition of addictive substances and psychotropics, distinguish their scope, classify psychoactive substances into stimulants, depressants, hallucinogens, and opioids with their chemical compound examples, and understand the importance of caution when facing products that may cause dependency.",
      },
      checkpoints: [
        {
          id: "Menjelaskan definisi zat adiktif, psikotropika, dan narkotika secara ilmiah dengan tepat.",
          en: "Explain the definitions of addictive substances, psychotropics, and narcotics accurately and scientifically.",
        },
        {
          id: "Membedakan konsep toleransi, ketergantungan fisik, ketergantungan psikologis, craving, dan withdrawal.",
          en: "Distinguish tolerance, physical dependency, psychological dependency, craving, and withdrawal.",
        },
        {
          id: "Mengidentifikasi perbedaan narkotika dan psikotropika berdasarkan dasar hukum di Indonesia.",
          en: "Identify the difference between narcotics and psychotropics based on Indonesian law.",
        },
        {
          id: "Mengklasifikasikan zat adiktif ke dalam kelompok stimulan, depresan, halusinogen, dan opioid beserta contoh senyawa kimianya.",
          en: "Classify addictive substances into stimulant, depressant, hallucinogen, and opioid groups along with their chemical compound examples.",
        },
        {
          id: "Menghubungkan mekanisme kerja zat (agonis, antagonis, blok reuptake) dengan jenis efek yang ditimbulkan.",
          en: "Connect a substance's mechanism of action (agonist, antagonist, reuptake blocker) with the type of effect it produces.",
        },
        {
          id: "Mengintegrasikan lima tujuan maqāṣid asy-syarī'ah sebagai dalil ilmiah dan syar'i pelarangan zat adiktif.",
          en: "Integrate the five objectives of maqāṣid asy-syarī'ah as the scientific and religious basis for prohibiting addictive substances.",
        },
        {
          id: "Menerapkan kaidah fikih (lā ḍarara, sadd adz-dzarī'ah, ṭayyibāt vs khabā'ith) dalam menilai produk konsumsi.",
          en: "Apply fiqh principles (lā ḍarara, sadd adz-dzarī'ah, ṭayyibāt vs khabā'ith) when evaluating consumer products.",
        },
        {
          id: "Membaca dan menganalisis kandungan zat adiktif tersembunyi pada label produk sehari-hari (literasi halal).",
          en: "Read and analyze hidden addictive substances on everyday product labels (halal literacy).",
        },
      ],
    },
    {
      key: "material",
      title: {
        id: "Materi Inti Kimia",
        en: "Core Chemistry Material",
      },
      body: {
        id: "Pelajari konsep dasar zat adiktif dan psikotropika, klasifikasi zat psikoaktif ke dalam stimulan, depresan, halusinogen, dan opioid, siklus adiksi, dasar hukumnya di Indonesia, serta bagaimana zat bekerja di dalam tubuh melalui delapan tab berikut.",
        en: "Study the basic concepts of addictive substances and psychotropics, the classification of psychoactive substances into stimulants, depressants, hallucinogens, and opioids, the addiction cycle, the Indonesian legal basis, and how substances work in the body through the eight tabs below.",
      },
      tabs: [
        {
          id: "konsep-dasar",
          label: { id: "Konsep Dasar", en: "Basic Concepts" },
          body: {
            id: "Zat adiktif adalah zat atau bahan kimia yang apabila dikonsumsi dapat menyebabkan ketergantungan (adiksi) fisik maupun psikologis, toleransi, serta gejala putus zat (withdrawal) ketika penggunaannya dihentikan. Psikotropika adalah zat atau obat (alamiah maupun sintetis, bukan narkotika) yang berkhasiat psikoaktif melalui pengaruh selektif pada susunan saraf pusat (SSP), sehingga menyebabkan perubahan khas pada aktivitas mental, persepsi, suasana hati, kesadaran, dan perilaku.",
            en: "Addictive substances are chemicals that, when consumed, can cause physical or psychological dependency, tolerance, and withdrawal symptoms when use is stopped. Psychotropics are substances or drugs (natural or synthetic, not narcotics) that are psychoactive through a selective effect on the central nervous system (CNS), causing distinct changes in mental activity, perception, mood, consciousness, and behavior.",
          },
          table: {
            headers: [
              { id: "Istilah", en: "Term" },
              { id: "Arti Singkat", en: "Short Meaning" },
              { id: "Penjelasan", en: "Explanation" },
            ],
            rows: [
              [
                { id: "Toleransi", en: "Tolerance" },
                { id: "Dosis makin besar", en: "Increasingly larger dose" },
                {
                  id: "Tubuh membutuhkan jumlah yang terus meningkat untuk menghasilkan efek yang sama akibat downregulasi reseptor.",
                  en: "The body needs an increasing amount to produce the same effect due to receptor downregulation.",
                },
              ],
              [
                { id: "Craving", en: "Craving" },
                { id: "Dorongan tak terkendali", en: "Uncontrollable urge" },
                {
                  id: "Desakan psikologis kuat yang mendorong penggunaan ulang, dikendalikan oleh amigdala dan korteks prefrontal yang telah berubah.",
                  en: "A strong psychological urge that drives repeated use, governed by an altered amygdala and prefrontal cortex.",
                },
              ],
              [
                { id: "Withdrawal", en: "Withdrawal" },
                { id: "Gejala Putus Zat", en: "Withdrawal symptoms" },
                {
                  id: "Reaksi fisik dan psikologis tidak nyaman (mual, tremor, kecemasan, depresi) ketika pemakaian dihentikan tiba-tiba.",
                  en: "Uncomfortable physical and psychological reactions (nausea, tremor, anxiety, depression) when use is suddenly stopped.",
                },
              ],
            ],
          },
        },
        {
          id: "stimulan",
          label: { id: "Stimulan", en: "Stimulants" },
          body: {
            id: "Meningkatkan aktivitas susunan saraf pusat dengan menaikkan kadar monoamin (dopamin, norepinefrin, serotonin) — melalui pemacuan pelepasan, penghambatan reuptake, atau inhibisi MAO. Efek: kewaspadaan meningkat, nafsu makan menurun, denyut jantung meningkat, euforia kuat. Waspadai stimulan tersembunyi: efedrin (dari Ephedra/Ma Huang) pada suplemen \"herbal\", pseudoefedrin pada obat flu, dan sibutramin pada produk pelangsing ilegal — semuanya tidak memiliki sertifikasi halal.",
            en: "Increases central nervous system activity by raising monoamine levels (dopamine, norepinephrine, serotonin) — through triggering release, inhibiting reuptake, or MAO inhibition. Effects: increased alertness, reduced appetite, increased heart rate, strong euphoria. Watch for hidden stimulants: ephedrine (from Ephedra/Ma Huang) in \"herbal\" supplements, pseudoephedrine in flu medicine, and sibutramine in illegal slimming products — none of which carry halal certification.",
          },
          table: {
            headers: [
              { id: "Zat", en: "Substance" },
              { id: "Rumus", en: "Formula" },
              { id: "Mekanisme", en: "Mechanism" },
              { id: "Ciri Adiksi", en: "Addiction Traits" },
              { id: "Status Islam", en: "Islamic Status" },
            ],
            rows: [
              [
                { id: "Metamfetamin (sabu)", en: "Methamphetamine" },
                { id: "C₁₀H₁₅N", en: "C₁₀H₁₅N" },
                { id: "↑ Dopamin, NE, 5-HT · pemacuan & blok reuptake", en: "↑ Dopamine, NE, 5-HT · triggered release & reuptake block" },
                { id: "Toleransi cepat, withdrawal berat", en: "Fast tolerance, severe withdrawal" },
                { id: "Haram", en: "Haram" },
              ],
              [
                { id: "Kokain", en: "Cocaine" },
                { id: "C₁₇H₂₁NO₄", en: "C₁₇H₂₁NO₄" },
                { id: "Blok reuptake DAT/NET/SERT", en: "DAT/NET/SERT reuptake blocker" },
                { id: "Craving sangat kuat, relaps tinggi", en: "Very strong craving, high relapse rate" },
                { id: "Haram", en: "Haram" },
              ],
              [
                { id: "Amfetamin", en: "Amphetamine" },
                { id: "C₉H₁₃N", en: "C₉H₁₃N" },
                { id: "↑ Rilis monoamin dari vesikel", en: "↑ Monoamine release from vesicles" },
                { id: "Toleransi, insomnia, paranoia", en: "Tolerance, insomnia, paranoia" },
                { id: "Haram (non-medis)", en: "Haram (non-medical)" },
              ],
              [
                { id: "Nikotin (rokok)", en: "Nicotine (cigarettes)" },
                { id: "C₁₀H₁₄N₂", en: "C₁₀H₁₄N₂" },
                { id: "Agonis reseptor nikotinik asetilkolin", en: "Nicotinic acetylcholine receptor agonist" },
                { id: "Ketergantungan fisik sedang", en: "Moderate physical dependency" },
                { id: "Makruh–haram", en: "Makruh–haram" },
              ],
              [
                { id: "Kafein", en: "Caffeine" },
                { id: "C₈H₁₀N₄O₂", en: "C₈H₁₀N₄O₂" },
                { id: "Antagonis reseptor adenosin", en: "Adenosine receptor antagonist" },
                { id: "Ketergantungan ringan, withdrawal kepala", en: "Mild dependency, headache withdrawal" },
                { id: "Mubah (wajar)", en: "Mubah (in moderation)" },
              ],
            ],
          },
        },
        {
          id: "depresan",
          label: { id: "Depresan", en: "Depressants" },
          body: {
            id: "Menekan aktivitas susunan saraf pusat dengan meningkatkan aktivitas GABA (neurotransmiter inhibitor utama) atau menghambat glutamat (eksitator). Efek: sedasi, relaksasi otot, anti-kecemasan, memperlambat pernapasan — overdosis dapat menyebabkan henti napas. Kombinasi alkohol, benzodiazepin, dan opioid (polifarmasi) adalah penyebab utama kematian overdosis karena efek sinergisnya menekan pusat pernapasan jauh melebihi dosis tunggal masing-masing zat.",
            en: "Suppresses central nervous system activity by increasing GABA activity (the main inhibitory neurotransmitter) or blocking glutamate (excitatory). Effects: sedation, muscle relaxation, anti-anxiety, slowed breathing — overdose can cause respiratory arrest. Combining alcohol, benzodiazepines, and opioids (polypharmacy) is a leading cause of overdose death, since their synergistic effect suppresses the respiratory center far beyond any single substance's dose.",
          },
          table: {
            headers: [
              { id: "Zat", en: "Substance" },
              { id: "Rumus", en: "Formula" },
              { id: "Mekanisme", en: "Mechanism" },
              { id: "Ciri Adiksi", en: "Addiction Traits" },
              { id: "Status Islam", en: "Islamic Status" },
            ],
            rows: [
              [
                { id: "Alkohol (etanol)", en: "Alcohol (ethanol)" },
                { id: "C₂H₅OH", en: "C₂H₅OH" },
                { id: "↑ GABA-A · ↓ NMDA-glutamat", en: "↑ GABA-A · ↓ NMDA-glutamate" },
                { id: "Toleransi cepat, withdrawal fatal (delirium tremens)", en: "Fast tolerance, fatal withdrawal (delirium tremens)" },
                { id: "Haram mutlak", en: "Absolutely haram" },
              ],
              [
                { id: "Benzodiazepin", en: "Benzodiazepines" },
                { id: "Beragam", en: "Various" },
                { id: "Agonis allosterik GABA-A", en: "GABA-A allosteric agonist" },
                { id: "Ketergantungan fisik kuat, withdrawal kejang", en: "Strong physical dependency, seizure withdrawal" },
                { id: "Haram (non-medis)", en: "Haram (non-medical)" },
              ],
              [
                { id: "Barbiturat", en: "Barbiturates" },
                { id: "Beragam", en: "Various" },
                { id: "Potensiasi & aktivasi langsung GABA-A", en: "GABA-A potentiation & direct activation" },
                { id: "Margin keamanan sempit, overdosis mudah", en: "Narrow safety margin, easy to overdose" },
                { id: "Haram (non-medis)", en: "Haram (non-medical)" },
              ],
              [
                { id: "GHB", en: "GHB" },
                { id: "C₄H₈O₃", en: "C₄H₈O₃" },
                { id: "Agonis GHB-R & GABA-B", en: "GHB-R & GABA-B agonist" },
                { id: "Euforia kuat, amnesia, withdrawal berat", en: "Strong euphoria, amnesia, severe withdrawal" },
                { id: "Haram", en: "Haram" },
              ],
            ],
          },
        },
        {
          id: "halusinogen",
          label: { id: "Halusinogen", en: "Hallucinogens" },
          body: {
            id: "Bekerja terutama sebagai agonis parsial reseptor serotonin 5-HT₂A di korteks prefrontal, menyebabkan distorsi persepsi sensoris, halusinasi visual/auditori, perubahan batas diri, dan depersonalisasi. Beberapa juga memengaruhi sistem endocannabinoid (THC) atau antagonisme NMDA (ketamin).",
            en: "Mainly acts as a partial agonist at serotonin 5-HT₂A receptors in the prefrontal cortex, causing sensory perception distortion, visual/auditory hallucinations, altered sense of self, and depersonalization. Some also affect the endocannabinoid system (THC) or act as NMDA antagonists (ketamine).",
          },
          table: {
            headers: [
              { id: "Zat", en: "Substance" },
              { id: "Rumus", en: "Formula" },
              { id: "Mekanisme", en: "Mechanism" },
              { id: "Durasi Efek", en: "Effect Duration" },
              { id: "Status Islam", en: "Islamic Status" },
            ],
            rows: [
              [
                { id: "LSD", en: "LSD" },
                { id: "C₂₀H₂₅N₃O", en: "C₂₀H₂₅N₃O" },
                { id: "Agonis 5-HT₂A & 5-HT₁A", en: "5-HT₂A & 5-HT₁A agonist" },
                { id: "8–12 jam · flashback", en: "8–12 hours · flashbacks" },
                { id: "Haram", en: "Haram" },
              ],
              [
                { id: "Psilosibin (jamur)", en: "Psilocybin (mushrooms)" },
                { id: "C₁₂H₁₇N₂O₄P", en: "C₁₂H₁₇N₂O₄P" },
                { id: "Pro-drug → psilosin, 5-HT₂A", en: "Pro-drug → psilocin, 5-HT₂A" },
                { id: "4–6 jam", en: "4–6 hours" },
                { id: "Haram", en: "Haram" },
              ],
              [
                { id: "Ganja (THC)", en: "Cannabis (THC)" },
                { id: "C₂₁H₃₀O₂", en: "C₂₁H₃₀O₂" },
                { id: "Agonis CB₁/CB₂ endocannabinoid", en: "CB₁/CB₂ endocannabinoid agonist" },
                { id: "2–4 jam · tersimpan di lemak", en: "2–4 hours · stored in fat tissue" },
                { id: "Haram", en: "Haram" },
              ],
              [
                { id: "Ketamin", en: "Ketamine" },
                { id: "C₁₃H₁₆ClNO", en: "C₁₃H₁₆ClNO" },
                { id: "Antagonis NMDA · disosiatif", en: "NMDA antagonist · dissociative" },
                { id: "1–2 jam", en: "1–2 hours" },
                { id: "Haram (non-medis)", en: "Haram (non-medical)" },
              ],
              [
                { id: "MDMA (ekstasi)", en: "MDMA (ecstasy)" },
                { id: "C₁₁H₁₅NO₂", en: "C₁₁H₁₅NO₂" },
                { id: "↑↑ 5-HT · agonis 5-HT₂A", en: "↑↑ 5-HT · 5-HT₂A agonist" },
                { id: "3–5 jam · neurotoksik", en: "3–5 hours · neurotoxic" },
                { id: "Haram", en: "Haram" },
              ],
            ],
          },
        },
        {
          id: "opioid",
          label: { id: "Opioid", en: "Opioids" },
          body: {
            id: "Bekerja pada reseptor opioid endogen μ (mu), κ (kappa), δ (delta) di susunan saraf pusat dan perifer. Aktivasi μ menyebabkan euforia kuat, analgesik, dan depresi pernapasan. Sistem ini secara normal merespons endorfin dan enkefalin alami tubuh — opioid \"membajak\" sistem ini secara masif.",
            en: "Acts on the body's endogenous opioid receptors μ (mu), κ (kappa), δ (delta) in the central and peripheral nervous system. μ activation causes strong euphoria, analgesia, and respiratory depression. This system normally responds to the body's natural endorphins and enkephalins — opioids \"hijack\" this system massively.",
          },
          table: {
            headers: [
              { id: "Zat", en: "Substance" },
              { id: "Sumber", en: "Source" },
              { id: "Potensi Relatif", en: "Relative Potency" },
              { id: "Risiko Utama", en: "Main Risk" },
              { id: "Status Islam", en: "Islamic Status" },
            ],
            rows: [
              [
                { id: "Morfin", en: "Morphine" },
                { id: "Alami (opium)", en: "Natural (opium)" },
                { id: "1× (referensi)", en: "1× (reference)" },
                { id: "Adiksi fisik sangat kuat", en: "Very strong physical addiction" },
                { id: "Haram (non-medis)", en: "Haram (non-medical)" },
              ],
              [
                { id: "Heroin (diasetilmorfin)", en: "Heroin (diacetylmorphine)" },
                { id: "Semi-sintetis", en: "Semi-synthetic" },
                { id: "2–3× morfin", en: "2–3× morphine" },
                { id: "Overdosis, HIV via jarum suntik", en: "Overdose, HIV via needle use" },
                { id: "Haram mutlak", en: "Absolutely haram" },
              ],
              [
                { id: "Oksikodon", en: "Oxycodone" },
                { id: "Semi-sintetis", en: "Semi-synthetic" },
                { id: "1,5× morfin", en: "1.5× morphine" },
                { id: "Epidemi adiksi (AS)", en: "Addiction epidemic (US)" },
                { id: "Haram (non-medis)", en: "Haram (non-medical)" },
              ],
              [
                { id: "Fentanil", en: "Fentanyl" },
                { id: "Sintetis", en: "Synthetic" },
                { id: "100× morfin", en: "100× morphine" },
                { id: "Overdosis sangat mudah, dosis sangat kecil", en: "Very easy overdose, very small doses" },
                { id: "Haram (non-medis)", en: "Haram (non-medical)" },
              ],
              [
                { id: "Kodein", en: "Codeine" },
                { id: "Alami", en: "Natural" },
                { id: "0,1× morfin", en: "0.1× morphine" },
                { id: "Rendah · pro-drug morfin", en: "Low · morphine pro-drug" },
                { id: "Boleh (resep dokter)", en: "Permitted (by prescription)" },
              ],
            ],
          },
        },
        {
          id: "siklus-adiksi",
          label: { id: "Siklus Adiksi", en: "Addiction Cycle" },
          body: {
            id: "Adiksi berkembang melalui siklus berulang dari konsumsi pertama hingga ketergantungan penuh, melibatkan perubahan bertahap pada kadar dopamin dan kendali diri.",
            en: "Addiction develops through a repeating cycle from first use to full dependency, involving gradual changes in dopamine levels and self-control.",
          },
          quote: {
            arabic: "إِنَّ النَّفْسَ لَأَمَّارَةٌ بِالسُّوءِ إِلَّا مَا رَحِمَ رَبِّي",
            translation: {
              id: "Sesungguhnya nafsu itu selalu mendorong kepada keburukan, kecuali nafsu yang diberi rahmat oleh Tuhanku.",
              en: "Indeed, the soul is a persistent inciter of evil, except those upon whom my Lord has mercy.",
            },
            source: "QS. Yūsuf [12]: 53 — relevan dengan konsep craving dan siklus adiksi",
          },
          table: {
            headers: [
              { id: "Fase", en: "Phase" },
              { id: "Nama", en: "Name" },
              { id: "Penjelasan", en: "Explanation" },
            ],
            rows: [
              [
                { id: "Fase 1", en: "Phase 1" },
                { id: "Intoksikasi / binge", en: "Intoxication / binge" },
                {
                  id: "Aktivasi sistem reward → euforia. Korteks prefrontal (pengendalian diri) ditekan. Dopamin melonjak jauh di atas normal.",
                  en: "Reward system activation → euphoria. The prefrontal cortex (self-control) is suppressed. Dopamine spikes far above normal.",
                },
              ],
              [
                { id: "Fase 2", en: "Phase 2" },
                { id: "Withdrawal / afek negatif", en: "Withdrawal / negative affect" },
                {
                  id: "Kadar dopamin anjlok di bawah normal → disforia, kecemasan, insomnia, nyeri. Tubuh \"berhutang\" kepada zat.",
                  en: "Dopamine falls below normal → dysphoria, anxiety, insomnia, pain. The body is \"in debt\" to the substance.",
                },
              ],
              [
                { id: "Fase 3", en: "Phase 3" },
                { id: "Preokupasi / antisipasi", en: "Preoccupation / anticipation" },
                {
                  id: "Craving kuat muncul. Memori terkait zat mengaktifkan amigdala → relaps. Siklus berulang dan memperburuk kerusakan otak.",
                  en: "Strong craving emerges. Substance-related memories activate the amygdala → relapse. The cycle repeats and worsens brain damage.",
                },
              ],
            ],
          },
        },
        {
          id: "dasar-hukum",
          label: { id: "Dasar Hukum", en: "Legal Basis" },
          body: {
            id: "Zat adiktif dan psikotropika di Indonesia diatur oleh tiga undang-undang utama dengan konsekuensi pidana berbeda. Narkotika (UU No. 35/2009) terutama bekerja pada reseptor opioid dengan efek analgesik dan euforia kuat, sedangkan psikotropika (UU No. 5/1997) bekerja lebih luas pada susunan saraf pusat — dopamin, serotonin, GABA, glutamat — dan lebih difokuskan pada efek mental dan perilaku.",
            en: "Addictive substances and psychotropics in Indonesia are regulated by three main laws with different criminal consequences. Narcotics (Law No. 35/2009) mainly act on opioid receptors with strong analgesic and euphoric effects, while psychotropics (Law No. 5/1997) act more broadly on the central nervous system — dopamine, serotonin, GABA, glutamate — focusing more on mental and behavioral effects.",
          },
          table: {
            headers: [
              { id: "Kategori", en: "Category" },
              { id: "Dasar Hukum", en: "Legal Basis" },
              { id: "Contoh Zat", en: "Example Substances" },
              { id: "Potensi Bahaya", en: "Risk Level" },
            ],
            rows: [
              [
                { id: "Narkotika Gol. I", en: "Narcotics Class I" },
                { id: "UU No. 35/2009", en: "Law No. 35/2009" },
                { id: "Heroin, kokain, ganja", en: "Heroin, cocaine, cannabis" },
                { id: "Sangat tinggi · tidak boleh untuk terapi", en: "Very high · not for therapeutic use" },
              ],
              [
                { id: "Narkotika Gol. II", en: "Narcotics Class II" },
                { id: "UU No. 35/2009", en: "Law No. 35/2009" },
                { id: "Morfin, petidin", en: "Morphine, pethidine" },
                { id: "Tinggi · medis sangat terbatas", en: "High · very limited medical use" },
              ],
              [
                { id: "Narkotika Gol. III", en: "Narcotics Class III" },
                { id: "UU No. 35/2009", en: "Law No. 35/2009" },
                { id: "Kodein, buprenorfin", en: "Codeine, buprenorphine" },
                { id: "Sedang · dengan resep dokter", en: "Moderate · with prescription" },
              ],
              [
                { id: "Psikotropika Gol. I", en: "Psychotropics Class I" },
                { id: "UU No. 5/1997", en: "Law No. 5/1997" },
                { id: "MDMA, LSD", en: "MDMA, LSD" },
                { id: "Sangat tinggi", en: "Very high" },
              ],
              [
                { id: "Psikotropika Gol. II", en: "Psychotropics Class II" },
                { id: "UU No. 5/1997", en: "Law No. 5/1997" },
                { id: "Amfetamin, metamfetamin", en: "Amphetamine, methamphetamine" },
                { id: "Tinggi", en: "High" },
              ],
              [
                { id: "Psikotropika Gol. III–IV", en: "Psychotropics Class III–IV" },
                { id: "UU No. 5/1997", en: "Law No. 5/1997" },
                { id: "Benzodiazepin, barbiturat", en: "Benzodiazepines, barbiturates" },
                { id: "Sedang · penggunaan medis", en: "Moderate · medical use" },
              ],
              [
                { id: "Zat adiktif lain", en: "Other addictive substances" },
                { id: "UU No. 36/2009", en: "Law No. 36/2009" },
                { id: "Nikotin, alkohol, kafein", en: "Nicotine, alcohol, caffeine" },
                { id: "Rendah–sedang · legal bersyarat", en: "Low–moderate · conditionally legal" },
              ],
            ],
          },
        },
        {
          id: "farmakokinetik",
          label: { id: "Farmakokinetik", en: "Pharmacokinetics" },
          body: {
            id: "ADME menjelaskan apa yang tubuh lakukan terhadap suatu zat sejak masuk hingga dikeluarkan kembali. Cara zat masuk ke tubuh sangat menentukan seberapa cepat dan seberapa kuat efeknya dirasakan — semakin cepat onset-nya, semakin besar potensi adiksinya. Farmakodinamika menjelaskan apa yang zat lakukan terhadap tubuh, terutama melalui interaksinya dengan reseptor di susunan saraf pusat.",
            en: "ADME explains what the body does to a substance from entry to elimination. How a substance enters the body strongly determines how fast and how strongly its effect is felt — the faster the onset, the greater its addiction potential. Pharmacodynamics explains what a substance does to the body, mainly through its interaction with receptors in the central nervous system.",
          },
          table: {
            headers: [
              { id: "Tahap ADME", en: "ADME Stage" },
              { id: "Penjelasan", en: "Explanation" },
            ],
            rows: [
              [
                { id: "A — Absorpsi", en: "A — Absorption" },
                {
                  id: "Cara masuk menentukan kecepatan efek (onset): inhalasi/IV dalam hitungan detik, sublingual 5–10 menit, oral 30–90 menit. Onset yang cepat memperkuat asosiasi reward di otak sehingga potensi adiksi lebih besar.",
                  en: "The route of entry determines onset speed: inhalation/IV within seconds, sublingual 5–10 minutes, oral 30–90 minutes. A fast onset strengthens the brain's reward association, increasing addiction potential.",
                },
              ],
              [
                { id: "D — Distribusi", en: "D — Distribution" },
                {
                  id: "Zat lipofilik (THC, heroin, alkohol) menembus sawar darah-otak lebih mudah sehingga efeknya pada susunan saraf pusat lebih kuat. THC tersimpan di jaringan lemak hingga berminggu-minggu — dasar tes urin narkoba.",
                  en: "Lipophilic substances (THC, heroin, alcohol) cross the blood-brain barrier more easily, producing stronger central nervous system effects. THC is stored in fat tissue for weeks — the basis of drug urine testing.",
                },
              ],
              [
                { id: "M — Metabolisme", en: "M — Metabolism" },
                {
                  id: "Hati adalah organ utama metabolisme. Kodein diubah menjadi morfin (metabolit aktif); kombinasi alkohol dan parasetamol dapat bersifat hepatotoksik. Enzim CYP450 membuat kecepatan metabolisme berbeda antarindividu.",
                  en: "The liver is the main metabolic organ. Codeine is converted into morphine (an active metabolite); combining alcohol and paracetamol can be hepatotoxic. The CYP450 enzyme makes metabolism speed vary between individuals.",
                },
              ],
              [
                { id: "E — Ekskresi", en: "E — Excretion" },
                {
                  id: "Ginjal membuang metabolit melalui urin. Jendela deteksi berbeda-beda: alkohol 12–24 jam, metamfetamin 2–4 hari, ganja (THC) 3–30 hari karena tersimpan di jaringan lemak.",
                  en: "The kidneys eliminate metabolites through urine. Detection windows vary: alcohol 12–24 hours, methamphetamine 2–4 days, cannabis (THC) 3–30 days because it is stored in fat tissue.",
                },
              ],
              [
                { id: "Mekanisme reseptor", en: "Receptor mechanism" },
                {
                  id: "Agonis penuh mengaktifkan reseptor sepenuhnya (morfin pada reseptor μ-opioid); agonis parsial mengaktifkan sebagian (LSD, buprenorfin); antagonis memblokir tanpa aktivasi (nalokson); blok reuptake menghambat transporter neurotransmiter (kokain); pelepas paksa memaksa pelepasan neurotransmiter (amfetamin, MDMA).",
                  en: "A full agonist fully activates the receptor (morphine on μ-opioid receptors); a partial agonist activates it partially (LSD, buprenorphine); an antagonist blocks without activating (naloxone); a reuptake blocker inhibits the neurotransmitter transporter (cocaine); a forced releaser forces neurotransmitter release (amphetamine, MDMA).",
                },
              ],
            ],
          },
          quote: {
            arabic: "مَا أَسْكَرَ كَثِيرُهُ فَقَلِيلُهُ حَرَامٌ",
            translation: {
              id: "Sesuatu yang memabukkan dalam jumlah banyak, maka sedikitnya pun haram.",
              en: "Whatever intoxicates in large amounts, its small amount is also forbidden.",
            },
            source: "HR. Abu Dawud no. 3681 & at-Tirmidzi no. 1865 — toleransi farmakologis (kebutuhan dosis yang terus meningkat) adalah bukti ilmiah dari kaidah ini",
          },
        },
      ],
    },
    {
      key: "visual",
      title: {
        id: "Visualisasi",
        en: "Visualization",
      },
      body: {
        id: "Jelajahi struktur 3D dari zat-zat yang dibahas pada tabel klasifikasi di atas. Pilih salah satu zat untuk melihat model molekulnya secara interaktif.",
        en: "Explore the 3D structures of the substances covered in the classification tables above. Pick a substance to view its molecule interactively.",
      },
      molecules: [
        {
          key: "sabu",
          label: { id: "Metamfetamin (sabu)", en: "Methamphetamine" },
          pubchemCid: 10836,
          description: {
            id: "C₁₀H₁₅N · Mekanisme: ↑ dopamin, NE, 5-HT — pemacuan pelepasan & blok reuptake. Ciri adiksi: toleransi cepat, withdrawal berat. Status Islam: Haram.",
            en: "C₁₀H₁₅N · Mechanism: ↑ dopamine, NE, 5-HT — triggered release & reuptake block. Addiction traits: fast tolerance, severe withdrawal. Islamic status: Haram.",
          },
        },
        {
          key: "kokain",
          label: { id: "Kokain", en: "Cocaine" },
          pubchemCid: 446220,
          description: {
            id: "C₁₇H₂₁NO₄ · Mekanisme: blok reuptake DAT/NET/SERT. Ciri adiksi: craving sangat kuat, relaps tinggi. Status Islam: Haram.",
            en: "C₁₇H₂₁NO₄ · Mechanism: DAT/NET/SERT reuptake blocker. Addiction traits: very strong craving, high relapse rate. Islamic status: Haram.",
          },
        },
        {
          key: "amfetamin",
          label: { id: "Amfetamin", en: "Amphetamine" },
          pubchemCid: 3007,
          description: {
            id: "C₉H₁₃N · Mekanisme: ↑ rilis monoamin dari vesikel. Ciri adiksi: toleransi, insomnia, paranoia. Status Islam: Haram (non-medis).",
            en: "C₉H₁₃N · Mechanism: ↑ monoamine release from vesicles. Addiction traits: tolerance, insomnia, paranoia. Islamic status: Haram (non-medical).",
          },
        },
        {
          key: "nikotin",
          label: { id: "Nikotin", en: "Nicotine" },
          pubchemCid: 89594,
          description: {
            id: "C₁₀H₁₄N₂ · Mekanisme: agonis reseptor nikotinik asetilkolin. Ciri adiksi: ketergantungan fisik sedang. Status Islam: Makruh–haram.",
            en: "C₁₀H₁₄N₂ · Mechanism: nicotinic acetylcholine receptor agonist. Addiction traits: moderate physical dependency. Islamic status: Makruh–haram.",
          },
        },
        {
          key: "kafein",
          label: { id: "Kafein", en: "Caffeine" },
          pubchemCid: 2519,
          description: {
            id: "C₈H₁₀N₄O₂ · Mekanisme: antagonis reseptor adenosin. Ciri adiksi: ketergantungan ringan, withdrawal kepala. Status Islam: Mubah (wajar).",
            en: "C₈H₁₀N₄O₂ · Mechanism: adenosine receptor antagonist. Addiction traits: mild dependency, headache withdrawal. Islamic status: Mubah (permissible).",
          },
        },
        {
          key: "ghb",
          label: { id: "GHB", en: "GHB" },
          pubchemCid: 10413,
          description: {
            id: "C₄H₈O₃ · Mekanisme: agonis GHB-R & GABA-B. Ciri adiksi: euforia kuat, amnesia, withdrawal berat. Status Islam: Haram.",
            en: "C₄H₈O₃ · Mechanism: GHB-R & GABA-B agonist. Addiction traits: strong euphoria, amnesia, severe withdrawal. Islamic status: Haram.",
          },
        },
        {
          key: "lsd",
          label: { id: "LSD", en: "LSD" },
          pubchemCid: 5761,
          description: {
            id: "C₂₀H₂₅N₃O · Mekanisme: agonis 5-HT₂A & 5-HT₁A. Durasi efek: 8–12 jam, dapat memicu flashback. Status Islam: Haram.",
            en: "C₂₀H₂₅N₃O · Mechanism: 5-HT₂A & 5-HT₁A agonist. Effect duration: 8–12 hours, can trigger flashbacks. Islamic status: Haram.",
          },
        },
        {
          key: "psilosibin",
          label: { id: "Psilosibin", en: "Psilocybin" },
          pubchemCid: 10624,
          description: {
            id: "C₁₂H₁₇N₂O₄P · Mekanisme: pro-drug → psilosin, agonis 5-HT₂A. Durasi efek: 4–6 jam. Status Islam: Haram.",
            en: "C₁₂H₁₇N₂O₄P · Mechanism: pro-drug → psilocin, 5-HT₂A agonist. Effect duration: 4–6 hours. Islamic status: Haram.",
          },
        },
        {
          key: "ganja",
          label: { id: "Ganja (THC)", en: "Cannabis (THC)" },
          pubchemCid: 16078,
          description: {
            id: "C₂₁H₃₀O₂ · Mekanisme: agonis CB₁/CB₂ endocannabinoid. Durasi efek: 2–4 jam, tersimpan di jaringan lemak. Status Islam: Haram.",
            en: "C₂₁H₃₀O₂ · Mechanism: CB₁/CB₂ endocannabinoid agonist. Effect duration: 2–4 hours, stored in fat tissue. Islamic status: Haram.",
          },
        },
        {
          key: "ketamin",
          label: { id: "Ketamin", en: "Ketamine" },
          pubchemCid: 3821,
          description: {
            id: "C₁₃H₁₆ClNO · Mekanisme: antagonis NMDA, bersifat disosiatif. Durasi efek: 1–2 jam. Status Islam: Haram (non-medis).",
            en: "C₁₃H₁₆ClNO · Mechanism: NMDA antagonist, dissociative. Effect duration: 1–2 hours. Islamic status: Haram (non-medical).",
          },
        },
        {
          key: "mdma",
          label: { id: "MDMA (ekstasi)", en: "MDMA (ecstasy)" },
          pubchemCid: 1615,
          description: {
            id: "C₁₁H₁₅NO₂ · Mekanisme: ↑↑ serotonin, agonis 5-HT₂A. Durasi efek: 3–5 jam, bersifat neurotoksik. Status Islam: Haram.",
            en: "C₁₁H₁₅NO₂ · Mechanism: ↑↑ serotonin, 5-HT₂A agonist. Effect duration: 3–5 hours, neurotoxic. Islamic status: Haram.",
          },
        },
      ],
      dopamineChart: {
        title: {
          id: "Bandingkan kadar dopamin berbagai zat (% di atas baseline normal)",
          en: "Compare dopamine levels across substances (% above normal baseline)",
        },
        items: [
          {
            key: "normal",
            label: { id: "Normal", en: "Normal" },
            widthPercent: 12,
            color: "#059669",
            resultLabel: { id: "Baseline", en: "Baseline" },
            description: {
              id: "Kondisi baseline normal — cukup untuk motivasi dan fokus sehari-hari tanpa efek samping. Ini adalah kadar dopamin yang seharusnya dipertahankan.",
              en: "Normal baseline condition — enough for everyday motivation and focus without side effects. This is the dopamine level that should be maintained.",
            },
          },
          {
            key: "kafein",
            label: { id: "Kafein", en: "Caffeine" },
            widthPercent: 32,
            color: "#059669",
            resultLabel: { id: "+40%", en: "+40%" },
            description: {
              id: "Kafein: antagonis adenosin → meningkatkan dopamin moderat (~+40%). Withdrawal ringan berupa sakit kepala. Hukum: mubah dalam jumlah wajar.",
              en: "Caffeine: an adenosine antagonist → moderately raises dopamine (~+40%). Mild withdrawal in the form of headaches. Ruling: mubah (permissible) in reasonable amounts.",
            },
          },
          {
            key: "nikotin",
            label: { id: "Nikotin", en: "Nicotine" },
            widthPercent: 55,
            color: "#d97706",
            resultLabel: { id: "+100%", en: "+100%" },
            description: {
              id: "Nikotin: agonis nikotinik → dopamin ~+100%. Ketergantungan fisik sedang. Risiko kanker paru, penyakit jantung jangka panjang sangat tinggi. Hukum: makruh–haram.",
              en: "Nicotine: a nicotinic agonist → dopamine ~+100%. Moderate physical dependency. Very high long-term risk of lung cancer and heart disease. Ruling: makruh–haram.",
            },
          },
          {
            key: "kokain",
            label: { id: "Kokain", en: "Cocaine" },
            widthPercent: 82,
            color: "#dc2626",
            resultLabel: { id: "+350%", en: "+350%" },
            description: {
              id: "Kokain: blok reuptake DAT/NET/SERT → lonjakan dopamin +350%. Craving sangat kuat, relaps tinggi. Toksik jantung bahkan pada dosis pertama. Hukum: haram.",
              en: "Cocaine: blocks DAT/NET/SERT reuptake → a dopamine surge of +350%. Very strong craving, high relapse rate. Cardiotoxic even on first use. Ruling: haram.",
            },
          },
          {
            key: "sabu",
            label: { id: "Sabu", en: "Methamphetamine" },
            widthPercent: 95,
            color: "#991b1b",
            resultLabel: { id: "+500%", en: "+500%" },
            description: {
              id: "Metamfetamin (sabu): blok reuptake + pacu pelepasan masif → dopamin +500%. Kerusakan dopaminergik permanen, psikosis. Hukum: haram.",
              en: "Methamphetamine: reuptake block plus massive forced release → dopamine +500%. Permanent dopaminergic damage, psychosis. Ruling: haram.",
            },
          },
          {
            key: "heroin",
            label: { id: "Heroin", en: "Heroin" },
            widthPercent: 92,
            color: "#991b1b",
            resultLabel: { id: "+480%", en: "+480%" },
            description: {
              id: "Heroin: aktivasi μ-opioid masif → lonjakan dopamin +480% dalam detik (IV). Overdosis dari dosis sangat kecil. Hukum: haram mutlak.",
              en: "Heroin: massive μ-opioid activation → a dopamine surge of +480% within seconds (IV). Overdose from a very small dose. Ruling: absolutely haram.",
            },
          },
        ],
      },
    },
    {
      key: "value",
      title: {
        id: "Panel Nilai Islam",
        en: "Islamic Values Panel",
      },
      body: {
        id: "Menjaga akal dan jiwa termasuk tujuan utama syariat (maqāṣid asy-syarī'ah). Memahami pengertian zat adiktif membantu seseorang menghindari hal yang merusak kemampuan berpikir, mengurangi kendali diri, dan membahayakan kesehatan. Kemampuan membedakan jenis zat dan status hukumnya — dari mubah, makruh, hingga haram — turut membantu seseorang menjaga diri dari kebiasaan yang merusak akal dan membuka jalan pada perilaku yang tidak bertanggung jawab.",
        en: "Protecting the mind and soul is among the key objectives of syariah (maqāṣid asy-syarī'ah). Understanding addictive substances helps a person avoid what harms thinking ability, reduces self-control, and endangers health. The ability to distinguish substance types and their legal status — from permissible, to disliked, to forbidden — also helps a person guard against habits that damage the mind and lead to irresponsible behavior.",
      },
      table: {
        headers: [
          { id: "Nilai", en: "Value" },
          { id: "Arti", en: "Meaning" },
          { id: "Penjelasan", en: "Explanation" },
        ],
        rows: [
          [
            { id: "Hifzh al-'Aql", en: "Hifzh al-'Aql" },
            { id: "Menjaga akal", en: "Protecting the mind" },
            {
              id: "Alasan utama haramnya khamr. Zat psikoaktif merusak fungsi kognitif, memori, dan pengambilan keputusan.",
              en: "The main reason khamr is forbidden. Psychoactive substances damage cognitive function, memory, and decision-making.",
            },
          ],
          [
            { id: "Hifzh an-Nafs", en: "Hifzh an-Nafs" },
            { id: "Menjaga jiwa", en: "Protecting the soul/life" },
            {
              id: "Overdosis & bunuh diri akibat adiksi melanggar kewajiban menjaga nyawa diri sendiri.",
              en: "Overdose and suicide caused by addiction violate the obligation to protect one's own life.",
            },
          ],
          [
            { id: "Hifzh ad-Dīn", en: "Hifzh ad-Dīn" },
            { id: "Menjaga agama", en: "Protecting religion" },
            {
              id: "Mabuk dan adiksi merusak kesadaran dan menjauhkan seseorang dari ibadah serta taklif syar'i.",
              en: "Intoxication and addiction damage awareness and distance a person from worship and religious duty.",
            },
          ],
          [
            { id: "Hifzh an-Nasl", en: "Hifzh an-Nasl" },
            { id: "Menjaga keturunan", en: "Protecting lineage" },
            {
              id: "Dampak teratogenik (janin cacat), disfungsi reproduksi, keluarga hancur akibat adiksi.",
              en: "Teratogenic effects (birth defects), reproductive dysfunction, and broken families due to addiction.",
            },
          ],
          [
            { id: "Hifzh al-Māl", en: "Hifzh al-Māl" },
            { id: "Menjaga harta", en: "Protecting wealth" },
            {
              id: "Adiksi menghancurkan produktivitas dan menyebabkan kerugian ekonomi individu, keluarga, negara.",
              en: "Addiction destroys productivity and causes economic loss for individuals, families, and the state.",
            },
          ],
        ],
      },
      quotes: [
        {
          arabic: "كُلُّ مُسْكِرٍ خَمْرٌ وَكُلُّ خَمْرٍ حَرَامٌ",
          translation: {
            id: "Setiap yang memabukkan adalah khamr, dan setiap khamr adalah haram.",
            en: "Every intoxicant is khamr, and every khamr is forbidden.",
          },
          source: "HR. Muslim no. 2003, dari Ibnu Umar radhiyallahu 'anhuma",
        },
        {
          arabic: "لَا ضَرَرَ وَلَا ضِرَارَ",
          translation: {
            id: "Tidak boleh ada bahaya yang ditimbulkan kepada diri sendiri maupun kepada orang lain.",
            en: "There shall be no harming of oneself nor of others.",
          },
          source: "HR. Ibnu Mājah no. 2341, hadis hasan",
        },
        {
          arabic: "مَا أَسْكَرَ كَثِيرُهُ فَقَلِيلُهُ حَرَامٌ",
          translation: {
            id: "Sesuatu yang memabukkan dalam jumlah banyak, maka sedikitnya pun haram.",
            en: "Whatever intoxicates in large amounts, its small amount is also forbidden.",
          },
          source: "HR. Abu Dawud no. 3681 & at-Tirmidzi no. 1865, hasan sahih",
        },
        {
          arabic: "وَلَا تُلْقُوا بِأَيْدِيكُمْ إِلَى التَّهْلُكَةِ",
          translation: {
            id: "Dan janganlah kamu jatuhkan dirimu ke dalam kebinasaan.",
            en: "And do not throw yourselves into destruction.",
          },
          source: "QS. Al-Baqarah [2]: 195",
        },
      ],
    },
    {
      key: "halal",
      title: {
        id: "Panel Literasi Halal",
        en: "Halal Literacy Panel",
      },
      body: {
        id: "Terdaftar di BPOM tidak sama dengan halal. BPOM menjamin keamanan kimia dan mikrobiologi; MUI menjamin kehalalan berdasarkan standar syariah. Sebuah produk dapat lolos BPOM namun tetap mengandung bahan haram atau syubhat — inilah dasar pentingnya literasi halal dalam memilih produk konsumsi. Suatu produk tidak cukup dinilai dari kemasan atau popularitasnya: kandungan, efek, dan potensi penyalahgunaan harus menjadi pertimbangan sebelum memutuskan untuk mengonsumsi, termasuk mengenali stimulan tersembunyi berlabel \"herbal alami\" yang sebenarnya tidak memiliki sertifikasi halal.",
        en: "Being registered with BPOM (Indonesia's food and drug agency) is not the same as being halal. BPOM guarantees chemical and microbiological safety; MUI (halal authority) certifies halal status based on syariah standards. A product can pass BPOM review yet still contain haram or syubhat (doubtful) ingredients — this is why halal literacy matters when choosing consumer products. A product cannot be judged only by its packaging or popularity: its ingredients, effects, and potential for misuse must be considered before deciding to consume it, including recognizing hidden stimulants labeled \"all-natural herbal\" that actually lack halal certification.",
      },
      table: {
        headers: [
          { id: "Kaidah", en: "Principle" },
          { id: "Arti", en: "Meaning" },
          { id: "Penjelasan", en: "Explanation" },
        ],
        rows: [
          [
            { id: "Sadd adz-Dzarī'ah", en: "Sadd adz-Dzarī'ah" },
            { id: "Menutup jalan keharaman", en: "Blocking the path to sin" },
            {
              id: "Menjauhi lingkungan, teman, dan situasi yang mendekatkan kepada zat terlarang — meski belum tentu melakukan.",
              en: "Avoiding environments, friends, and situations that lead toward prohibited substances — even before actually using them.",
            },
          ],
          [
            { id: "Syubhat", en: "Syubhat" },
            { id: "Prinsip kehati-hatian", en: "Precautionary principle" },
            {
              id: "Jika status halal/haram meragukan, sikap wara' (tinggalkan) lebih utama. Contoh: taurin tanpa sertifikasi MUI.",
              en: "If halal/haram status is doubtful, caution (avoiding it) is preferred. Example: taurine without MUI certification.",
            },
          ],
          [
            { id: "Darūrah", en: "Darūrah" },
            { id: "Pengecualian darurat", en: "Emergency exception" },
            {
              id: "Opioid/benzodiazepin boleh digunakan dalam kondisi medis darurat, tanpa alternatif halal, dosis minimal, atas resep dokter.",
              en: "Opioids/benzodiazepines may be used in medical emergencies, when no halal alternative exists, at minimal dose, and by prescription.",
            },
          ],
        ],
      },
      checkpoints: [
        {
          id: "Apakah produk aman bagi tubuh?",
          en: "Is the product safe for the body?",
        },
        {
          id: "Apakah ada risiko ketergantungan atau penyalahgunaan?",
          en: "Is there a risk of dependency or misuse?",
        },
        {
          id: "Apakah kandungannya sudah bersertifikasi halal MUI, bukan hanya terdaftar BPOM?",
          en: "Is the content MUI halal-certified, not just BPOM-registered?",
        },
      ],
    },
    {
      key: "exercise",
      title: {
        id: "Latihan Cepat",
        en: "Quick Practice",
      },
      body: {
        id: "Jawablah perbedaan pokok antara zat adiktif dan psikotropika, kelompokkan beberapa contoh zat ke dalam kategori yang tepat, dan jelaskan alasan mengapa mempelajari ruang lingkup serta klasifikasi keduanya penting bagi remaja.",
        en: "Answer the key difference between addictive substances and psychotropics, group several substance examples into the correct categories, and explain why learning their scope and classification is important for teenagers.",
      },
      checkpoints: [
        {
          id: "Tuliskan definisi singkat zat adiktif.",
          en: "Write a short definition of addictive substances.",
        },
        {
          id: "Jelaskan mengapa psikotropika perlu dipahami sejak awal.",
          en: "Explain why psychotropics need to be understood from the beginning.",
        },
        {
          id: "Sebutkan satu contoh zat stimulan dan satu contoh zat depresan.",
          en: "Name one stimulant and one depressant example.",
        },
        {
          id: "Tuliskan dua ciri awal adiksi.",
          en: "Write two early signs of addiction.",
        },
      ],
      questions: [
        {
          id: "m1q1",
          prompt: {
            id: "Zat adiktif adalah zat yang...",
            en: "Addictive substances are substances that...",
          },
          options: [
            { value: "a", label: { id: "Hanya memengaruhi rasa makanan", en: "Only affect food taste" } },
            { value: "b", label: { id: "Memengaruhi sistem saraf dan dapat menimbulkan ketergantungan", en: "Affect the nervous system and may cause dependency" } },
            { value: "c", label: { id: "Selalu berbahaya meski hanya dipakai sekali", en: "Are always harmful even with one use" } },
            { value: "d", label: { id: "Hanya ditemukan di lingkungan laboratorium", en: "Are found only in laboratories" } },
          ],
          correct: "b",
        },
        {
          id: "m1q2",
          prompt: {
            id: "Psikotropika berbeda dari zat adiktif umum karena...",
            en: "Psychotropics differ from general addictive substances because they...",
          },
          options: [
            { value: "a", label: { id: "Tidak menimbulkan ketergantungan sama sekali", en: "Do not cause dependency at all" } },
            { value: "b", label: { id: "Hanya memengaruhi organ hati", en: "Only affect the liver" } },
            { value: "c", label: { id: "Bekerja pada susunan saraf pusat dan mengubah aktivitas mental, perasaan, atau perilaku", en: "Act on the central nervous system and alter mental activity, feelings, or behavior" } },
            { value: "d", label: { id: "Lebih aman daripada rokok biasa", en: "Are safer than regular cigarettes" } },
          ],
          correct: "c",
        },
        {
          id: "m1q3",
          prompt: {
            id: "Literasi halal dalam konteks zat adiktif berarti...",
            en: "Halal literacy in the context of addictive substances means...",
          },
          options: [
            { value: "a", label: { id: "Hanya memeriksa logo halal pada kemasan produk", en: "Only checking the halal logo on product packaging" } },
            { value: "b", label: { id: "Membeli produk yang paling murah di pasaran", en: "Buying the cheapest product on the market" } },
            { value: "c", label: { id: "Mengikuti rekomendasi teman tanpa memeriksa kandungan", en: "Following friend recommendations without checking ingredients" } },
            { value: "d", label: { id: "Menilai aspek tayyib, keamanan, manfaat, dan potensi mudarat suatu produk", en: "Assessing the tayyib aspect, safety, benefit, and potential harm of a product" } },
          ],
          correct: "d",
        },
        {
          id: "m2q1",
          prompt: {
            id: "Nikotin termasuk golongan zat...",
            en: "Nicotine belongs to the category of...",
          },
          options: [
            { value: "a", label: { id: "Depresan saraf pusat", en: "Central nervous system depressant" } },
            { value: "b", label: { id: "Halusinogen", en: "Hallucinogen" } },
            { value: "c", label: { id: "Stimulan", en: "Stimulant" } },
            { value: "d", label: { id: "Sedatif", en: "Sedative" } },
          ],
          correct: "c",
        },
        {
          id: "m2q2",
          prompt: {
            id: "Tanda awal adiksi yang paling umum adalah...",
            en: "The most common early sign of addiction is...",
          },
          options: [
            { value: "a", label: { id: "Pola tidur yang lebih teratur dari sebelumnya", en: "A more regular sleep pattern than before" } },
            { value: "b", label: { id: "Keinginan kuat untuk menggunakan lagi disertai meningkatnya toleransi", en: "A strong urge to use again accompanied by increasing tolerance" } },
            { value: "c", label: { id: "Nafsu makan meningkat tanpa penggunaan zat apapun", en: "Increased appetite without any substance use" } },
            { value: "d", label: { id: "Peningkatan kemampuan berkonsentrasi", en: "Improved ability to concentrate" } },
          ],
          correct: "b",
        },
        {
          id: "m2q3",
          prompt: {
            id: "Dalam literasi halal, menilai risiko adiksi suatu produk berarti mempertimbangkan...",
            en: "In halal literacy, assessing a product's addiction risk means considering...",
          },
          options: [
            { value: "a", label: { id: "Harga dan popularitas produk di pasaran", en: "Product price and market popularity" } },
            { value: "b", label: { id: "Warna dan desain kemasan produk", en: "Product color and packaging design" } },
            { value: "c", label: { id: "Kandungan, efek, dan potensi penyalahgunaannya", en: "Its ingredients, effects, and potential for misuse" } },
            { value: "d", label: { id: "Reputasi merek di media sosial", en: "Brand reputation on social media" } },
          ],
          correct: "c",
        },
      ],
    },
  ],
  M2: [
    {
      key: "stimulus",
      title: {
        id: "Stimulus",
        en: "Stimulus",
      },
      body: {
        id: "Sebagian zat membuat seseorang merasa senang sesaat, lalu ingin mengulanginya lagi. Lama-kelamaan muncul craving, kebutuhan dosis lebih besar, dan rasa tidak nyaman ketika penggunaan dihentikan. Apa yang sebenarnya terjadi pada \"jalur kesenangan\" di otak saat ini berulang kali dibajak oleh suatu zat?",
        en: "Some substances make a person feel pleasure for a moment and then want to repeat it again. Over time craving appears, larger doses are needed, and discomfort emerges when use is stopped. What actually happens to the brain's \"pleasure pathway\" when it is repeatedly hijacked by a substance?",
      },
    },
    {
      key: "goal",
      title: {
        id: "Tujuan Belajar + Indikator Literasi Halal",
        en: "Learning Goals + Halal Literacy Indicators",
      },
      body: {
        id: "Kamu diharapkan memahami jalur mesolimbik (VTA → nukleus accumbens) dan konsep dopamin, craving, tolerance, dan withdrawal untuk menjelaskan mengapa perilaku adiktif sulit dihentikan.",
        en: "You are expected to understand the mesolimbic pathway (VTA → nucleus accumbens) and the concepts of dopamine, craving, tolerance, and withdrawal to explain why addictive behavior is difficult to stop.",
      },
    },
    {
      key: "material",
      title: {
        id: "Materi Inti Kimia",
        en: "Core Chemistry Material",
      },
      body: {
        id: "Sistem reward otak melibatkan jalur dopaminergik dari area tegmental ventral (VTA) menuju nukleus accumbens (NAc). Secara normal, jalur ini memotivasi perilaku bertahan hidup seperti makan dan reproduksi. Zat adiktif \"membajak\" sistem ini dengan menginduksi lonjakan dopamin jauh melebihi rangsangan alami. Adiksi bukan sekadar pilihan moral, melainkan gangguan neurobiologis yang mengubah struktur dan fungsi otak melalui tiga fase siklus berikut.",
        en: "The brain's reward system involves a dopaminergic pathway from the ventral tegmental area (VTA) to the nucleus accumbens (NAc). Normally, this pathway motivates survival behaviors such as eating and reproduction. Addictive substances \"hijack\" this system by inducing dopamine surges far beyond natural stimuli. Addiction is not merely a moral choice, but a neurobiological disorder that alters the brain's structure and function through the three-phase cycle below.",
      },
      table: {
        headers: [
          { id: "Fase", en: "Phase" },
          { id: "Nama", en: "Name" },
          { id: "Penjelasan", en: "Explanation" },
        ],
        rows: [
          [
            { id: "Fase 1", en: "Phase 1" },
            { id: "Intoksikasi / Binge", en: "Intoxication / Binge" },
            {
              id: "Aktivasi sistem reward berlebihan → euforia. Korteks prefrontal (kendali diri) ditekan.",
              en: "Excessive reward system activation → euphoria. The prefrontal cortex (self-control) is suppressed.",
            },
          ],
          [
            { id: "Fase 2", en: "Phase 2" },
            { id: "Withdrawal / Afek Negatif", en: "Withdrawal / Negative Affect" },
            {
              id: "Kadar dopamin turun drastis di bawah normal → disforia, kecemasan, depresi, insomnia.",
              en: "Dopamine levels drop drastically below normal → dysphoria, anxiety, depression, insomnia.",
            },
          ],
          [
            { id: "Fase 3", en: "Phase 3" },
            { id: "Preokupasi / Antisipasi", en: "Preoccupation / Anticipation" },
            {
              id: "Craving kuat, dikendalikan amigdala & korteks prefrontal yang rusak → relaps.",
              en: "Strong craving, driven by the amygdala and a damaged prefrontal cortex → relapse.",
            },
          ],
        ],
      },
    },
    {
      key: "visual",
      title: {
        id: "Visualisasi",
        en: "Visualization",
      },
      body: {
        id: "Struktur 3D dopamin berikut adalah neurotransmiter utama pada jalur mesolimbik (VTA → nukleus accumbens) yang bertanggung jawab atas sensasi senang. Bayangkan jalur ini sebagai animasi: pada penggunaan zat, lonjakan dopamin jauh melampaui rangsangan alami seperti makan atau berolahraga.",
        en: "The 3D dopamine structure below is the key neurotransmitter in the mesolimbic pathway (VTA → nucleus accumbens) responsible for pleasurable sensation. Picture this pathway as an animation: with substance use, the dopamine surge far exceeds natural stimuli like eating or exercise.",
      },
    },
    {
      key: "value",
      title: {
        id: "Panel Nilai Islam",
        en: "Islamic Values Panel",
      },
      body: {
        id: "Pemahaman tentang sistem reward otak mengingatkan bahwa kenikmatan sesaat tidak selalu membawa kebaikan. Menjaga akal berarti juga menahan diri dari sesuatu yang perlahan merusak kendali dan kebebasan memilih. Craving adalah manifestasi neurobiologis dari nafsu yang disebutkan dalam ayat berikut — dorongan yang melemahkan kendali diri jika tidak dijaga dengan rahmat dan kesadaran.",
        en: "Understanding the brain reward system reminds us that short-term pleasure does not always bring goodness. Protecting the mind also means restraining oneself from things that slowly damage control and freedom of choice. Craving is the neurobiological manifestation of the soul's inclination described in the verse below — a drive that weakens self-control unless guarded by mercy and awareness.",
      },
      quotes: [
        {
          arabic: "إِنَّ النَّفْسَ لَأَمَّارَةٌ بِالسُّوءِ إِلَّا مَا رَحِمَ رَبِّي",
          translation: {
            id: "Sesungguhnya nafsu itu selalu mendorong kepada keburukan, kecuali nafsu yang diberi rahmat oleh Tuhanku.",
            en: "Indeed, the soul is a persistent inciter of evil, except those upon whom my Lord has mercy.",
          },
          source: "QS. Yūsuf [12]: 53 — relevan dengan konsep craving dan pengendalian diri",
        },
      ],
    },
    {
      key: "halal",
      title: {
        id: "Panel Literasi Halal",
        en: "Halal Literacy Panel",
      },
      body: {
        id: "Produk yang menimbulkan craving, tolerance, dan withdrawal perlu dikaji dari sisi mudaratnya. Literasi halal membantu siswa melihat bahwa pilihan aman harus mempertimbangkan dampak biologis dan sosial sekaligus.",
        en: "Products that trigger craving, tolerance, and withdrawal need to be assessed from the perspective of harm. Halal literacy helps students see that safe choices must consider both biological and social impact.",
      },
    },
    {
      key: "exercise",
      title: {
        id: "Latihan Cepat",
        en: "Quick Practice",
      },
      body: {
        id: "Jelaskan fungsi dopamin dalam sistem reward otak, lalu bedakan craving, tolerance, dan withdrawal dengan contoh sederhana dalam perilaku adiktif.",
        en: "Explain dopamine’s role in the brain reward system, then distinguish craving, tolerance, and withdrawal with simple examples in addictive behavior.",
      },
      checkpoints: [
        {
          id: "Mengapa craving dapat mendorong seseorang mengulang penggunaan zat?",
          en: "Why can craving push a person to repeat substance use?",
        },
        {
          id: "Apa tanda umum withdrawal?",
          en: "What is a common sign of withdrawal?",
        },
      ],
      questions: [
        {
          id: "m2q1",
          prompt: {
            id: "Dopamin dalam sistem reward otak berfungsi sebagai...",
            en: "Dopamine in the brain reward system functions as...",
          },
          options: [
            { value: "a", label: { id: "Hormon yang mengatur tekanan darah dan detak jantung", en: "A hormone that regulates blood pressure and heart rate" } },
            { value: "b", label: { id: "Neurotransmiter yang memberi sensasi senang saat dilepaskan", en: "A neurotransmitter that creates a feeling of pleasure when released" } },
            { value: "c", label: { id: "Protein yang menghambat semua aktivitas otak", en: "A protein that inhibits all brain activity" } },
            { value: "d", label: { id: "Enzim yang membantu proses pencernaan makanan", en: "An enzyme that aids in digesting food" } },
          ],
          correct: "b",
        },
        {
          id: "m2q2",
          prompt: {
            id: "Tolerance pada penggunaan zat terjadi ketika...",
            en: "Tolerance in substance use occurs when...",
          },
          options: [
            { value: "a", label: { id: "Tubuh bereaksi negatif saat penggunaan zat dihentikan", en: "The body reacts negatively when substance use is stopped" } },
            { value: "b", label: { id: "Seseorang pertama kali merasakan efek suatu zat baru", en: "A person first feels the effect of a new substance" } },
            { value: "c", label: { id: "Otak menyesuaikan responsnya sehingga dibutuhkan dosis lebih besar untuk efek yang sama", en: "The brain adjusts its response so a larger dose is needed for the same effect" } },
            { value: "d", label: { id: "Keinginan kuat yang mendorong seseorang menggunakan lagi", en: "A strong urge that pushes a person to use again" } },
          ],
          correct: "c",
        },
        {
          id: "m2q3",
          prompt: {
            id: "Withdrawal terjadi ketika...",
            en: "Withdrawal occurs when...",
          },
          options: [
            { value: "a", label: { id: "Seseorang menggunakan zat untuk pertama kalinya", en: "A person uses a substance for the first time" } },
            { value: "b", label: { id: "Kadar dopamin meningkat tajam setelah penggunaan zat", en: "Dopamine levels spike sharply after substance use" } },
            { value: "c", label: { id: "Seseorang mulai menambah dosis secara bertahap", en: "A person gradually increases the dose" } },
            { value: "d", label: { id: "Penggunaan zat dihentikan dan tubuh bereaksi negatif", en: "Substance use is stopped and the body reacts negatively" } },
          ],
          correct: "d",
        },
      ],
    },
  ],
  M3: [
    {
      key: "stimulus",
      title: {
        id: "Stimulus",
        en: "Stimulus",
      },
      body: {
        id: "Seorang pengguna narkoba jangka panjang terlihat menua lebih cepat, sering sakit, dan mengalami gangguan memori parah. Di sisi lain, bayi yang lahir dari ibu pecandu heroin mengalami gejala withdrawal sejak hari pertama kelahiran. Organ apa saja yang paling terdampak? Seberapa parah? Apakah kerusakan ini bisa pulih?",
        en: "A long-term drug user appears to age faster, gets sick often, and suffers severe memory impairment. Meanwhile, a baby born to a heroin-addicted mother shows withdrawal symptoms from the first day of life. Which organs are most affected? How severe is the damage? Can it heal?",
      },
    },
    {
      key: "goal",
      title: {
        id: "Tujuan Belajar + Indikator Literasi Halal",
        en: "Learning Goals + Halal Literacy Indicators",
      },
      body: {
        id: "Kamu diharapkan mampu mengidentifikasi dampak zat adiktif pada organ-organ utama serta menganalisis timeline kerusakan dan tingkat reversibilitasnya, lalu menghubungkan hifzh an-nafs (menjaga jiwa) dengan kewajiban ilmiah menjaga kesehatan organ tubuh.",
        en: "You are expected to identify addictive substance effects on major organs and analyze the damage timeline and its reversibility, then connect hifzh an-nafs (protecting life) with the scientific duty to protect organ health.",
      },
    },
    {
      key: "material",
      title: {
        id: "Materi Inti Kimia",
        en: "Core Chemistry Material",
      },
      body: {
        id: "Setiap organ memiliki kerentanan berbeda terhadap zat adiktif. Pelajari peta dampak pada organ utama serta timeline kerusakan dari akut hingga permanen melalui dua tab berikut.",
        en: "Each organ has a different vulnerability to addictive substances. Study the impact map on major organs and the damage timeline from acute to permanent, through the two tabs below.",
      },
      tabs: [
        {
          id: "peta-organ",
          label: { id: "Peta Organ", en: "Organ Map" },
          body: {
            id: "Semakin lama dan intens paparan suatu zat, semakin besar pula kemungkinan kerusakan bersifat permanen dan tidak bisa dipulihkan.",
            en: "The longer and more intense the exposure to a substance, the greater the likelihood that the damage becomes permanent and irreversible.",
          },
          table: {
            headers: [
              { id: "Organ", en: "Organ" },
              { id: "Dampak Utama", en: "Main Impact" },
            ],
            rows: [
              [
                { id: "Otak", en: "Brain" },
                { id: "Atrofi korteks prefrontal, kerusakan dopaminergik, gangguan memori & kognitif jangka panjang.", en: "Prefrontal cortex atrophy, dopaminergic damage, long-term memory and cognitive impairment." },
              ],
              [
                { id: "Jantung", en: "Heart" },
                { id: "Aritmia, kardiomiopati, hipertensi, risiko serangan jantung (stimulan & kokain).", en: "Arrhythmia, cardiomyopathy, hypertension, heart attack risk (stimulants & cocaine)." },
              ],
              [
                { id: "Paru-paru", en: "Lungs" },
                { id: "PPOK, kanker paru, pneumonia aspirasi (opioid), kerusakan alveolar (inhalasi).", en: "COPD, lung cancer, aspiration pneumonia (opioids), alveolar damage (inhalation)." },
              ],
              [
                { id: "Hati", en: "Liver" },
                { id: "Sirosis (alkohol), hepatitis (jarum suntik), steatohepatitis, gagal hati akut.", en: "Cirrhosis (alcohol), hepatitis (needle use), steatohepatitis, acute liver failure." },
              ],
              [
                { id: "Ginjal", en: "Kidneys" },
                { id: "Nefropati, gagal ginjal akut (rhabdomiolisis akibat stimulan), infeksi.", en: "Nephropathy, acute kidney failure (rhabdomyolysis from stimulants), infection." },
              ],
              [
                { id: "Reproduksi", en: "Reproductive system" },
                { id: "Disfungsi seksual, ketidakseimbangan hormon, risiko janin cacat (teratogen).", en: "Sexual dysfunction, hormonal imbalance, risk of birth defects (teratogenic)." },
              ],
            ],
          },
        },
        {
          id: "timeline",
          label: { id: "Timeline Kerusakan", en: "Damage Timeline" },
          body: {
            id: "Kerusakan yang muncul dalam hitungan jam bisa fatal seketika, sedangkan kerusakan yang terbentuk selama bertahun-tahun cenderung permanen dan sulit dipulihkan.",
            en: "Damage that appears within hours can be instantly fatal, while damage built up over years tends to be permanent and hard to reverse.",
          },
          table: {
            headers: [
              { id: "Rentang Waktu", en: "Time Range" },
              { id: "Perubahan Patologis", en: "Pathological Change" },
              { id: "Reversibilitas", en: "Reversibility" },
            ],
            rows: [
              [
                { id: "Jam–hari (akut)", en: "Hours–days (acute)" },
                { id: "Intoksikasi, overdosis, aritmia akut.", en: "Intoxication, overdose, acute arrhythmia." },
                { id: "Berpotensi fatal", en: "Potentially fatal" },
              ],
              [
                { id: "Minggu–bulan", en: "Weeks–months" },
                { id: "Toleransi, withdrawal fisik, penurunan kognitif awal.", en: "Tolerance, physical withdrawal, early cognitive decline." },
                { id: "Sebagian reversibel", en: "Partially reversible" },
              ],
              [
                { id: "Bulan–tahun", en: "Months–years" },
                { id: "Atrofi otak, sirosis, kardiomiopati, psikosis.", en: "Brain atrophy, cirrhosis, cardiomyopathy, psychosis." },
                { id: "Sulit/tidak reversibel", en: "Difficult/not reversible" },
              ],
              [
                { id: "Paparan janin", en: "Fetal exposure" },
                { id: "Sindrom bayi baru lahir (NAS), cacat lahir.", en: "Neonatal abstinence syndrome (NAS), birth defects." },
                { id: "Dampak seumur hidup", en: "Lifelong impact" },
              ],
            ],
          },
        },
      ],
    },
    {
      key: "visual",
      title: {
        id: "Visualisasi",
        en: "Visualization",
      },
      body: {
        id: "Struktur 3D morfin berikut adalah contoh opioid yang menembus plasenta dan dapat menyebabkan sindrom adiksi neonatal (NAS) pada bayi yang lahir dari ibu pengguna.",
        en: "The 3D morphine structure below is an example of an opioid that crosses the placenta and can cause neonatal abstinence syndrome (NAS) in babies born to users.",
      },
    },
    {
      key: "value",
      title: {
        id: "Panel Nilai Islam",
        en: "Islamic Values Panel",
      },
      body: {
        id: "Tubuh adalah amanah yang harus dijaga. Kerusakan organ yang tidak dapat dipulihkan — terutama otak dan hati — adalah bentuk membunuh diri sendiri secara perlahan yang dilarang dalam ayat berikut.",
        en: "The body is a trust that must be protected. Irreversible organ damage — especially to the brain and liver — is a form of slowly killing oneself, which the verse below prohibits.",
      },
      quotes: [
        {
          arabic: "وَلَا تَقْتُلُوا أَنفُسَكُمْ ۚ إِنَّ اللَّهَ كَانَ بِكُمْ رَحِيمًا",
          translation: {
            id: "Dan janganlah kamu membunuh dirimu sendiri. Sungguh, Allah Maha Penyayang kepadamu.",
            en: "And do not kill yourselves. Indeed, God is ever merciful to you.",
          },
          source: "QS. An-Nisā' [4]: 29",
        },
      ],
    },
    {
      key: "halal",
      title: {
        id: "Panel Literasi Halal",
        en: "Halal Literacy Panel",
      },
      body: {
        id: "Konsep halal-tayyib menuntun siswa menilai keamanan produk dari dampaknya pada tubuh. Jika suatu zat berpotensi merusak organ secara permanen, maka aspek mudarat harus menjadi pertimbangan utama, bukan hanya legalitasnya.",
        en: "The halal-tayyib concept guides students to assess product safety through its effects on the body. If a substance can permanently damage organs, the aspect of harm must be the primary consideration, not just its legality.",
      },
    },
    {
      key: "exercise",
      title: {
        id: "Latihan Cepat",
        en: "Quick Practice",
      },
      body: {
        id: "Hubungkan masing-masing organ utama dengan dampak yang mungkin terjadi akibat penggunaan zat adiktif, lalu bedakan mana dampak jangka pendek dan mana yang jangka panjang.",
        en: "Match each major organ with possible effects caused by addictive substance use, then distinguish which are short-term and which are long-term effects.",
      },
      checkpoints: [
        {
          id: "Sebutkan satu dampak pada paru-paru.",
          en: "Mention one effect on the lungs.",
        },
        {
          id: "Mengapa hati berperan penting saat zat masuk ke tubuh?",
          en: "Why does the liver play an important role when substances enter the body?",
        },
      ],
      questions: [
        {
          id: "m3q1",
          prompt: {
            id: "Dampak zat adiktif pada paru-paru terutama berupa...",
            en: "The primary impact of addictive substances on the lungs is...",
          },
          options: [
            { value: "a", label: { id: "Peningkatan kapasitas menyerap oksigen secara permanen", en: "A permanent increase in oxygen absorption capacity" } },
            { value: "b", label: { id: "Gangguan pertukaran gas yang dapat merusak jaringan paru-paru", en: "Disrupted gas exchange that can damage lung tissue" } },
            { value: "c", label: { id: "Penurunan tekanan darah hingga batas normal", en: "A drop in blood pressure to normal levels" } },
            { value: "d", label: { id: "Tidak ada dampak karena paru-paru dilindungi oleh lendir", en: "No impact because the lungs are protected by mucus" } },
          ],
          correct: "b",
        },
        {
          id: "m3q2",
          prompt: {
            id: "Hati bekerja lebih keras saat zat adiktif masuk ke tubuh karena...",
            en: "The liver works harder when addictive substances enter the body because it...",
          },
          options: [
            { value: "a", label: { id: "Hati harus memproduksi lebih banyak sel darah merah", en: "Must produce more red blood cells" } },
            { value: "b", label: { id: "Hati bertanggung jawab atas metabolisme dan detoksifikasi zat", en: "Is responsible for metabolizing and detoxifying substances" } },
            { value: "c", label: { id: "Hati menyimpan zat adiktif sebagai cadangan energi", en: "Stores addictive substances as energy reserves" } },
            { value: "d", label: { id: "Hati mengirimkan sinyal ke otak tentang rasa lapar", en: "Sends signals to the brain about hunger" } },
          ],
          correct: "b",
        },
        {
          id: "m3q3",
          prompt: {
            id: "Perbedaan efek jangka pendek dan jangka panjang zat adiktif adalah...",
            en: "The difference between short-term and long-term effects of addictive substances is...",
          },
          options: [
            { value: "a", label: { id: "Efek jangka pendek jauh lebih berbahaya dari jangka panjang", en: "Short-term effects are far more dangerous than long-term ones" } },
            { value: "b", label: { id: "Keduanya tidak memiliki perbedaan yang signifikan", en: "Both have no significant difference" } },
            { value: "c", label: { id: "Efek jangka pendek bersifat segera seperti perubahan detak jantung, sedangkan jangka panjang mencakup kerusakan organ yang bertahap", en: "Short-term effects are immediate such as heart rate changes, while long-term effects include gradual organ damage" } },
            { value: "d", label: { id: "Efek jangka panjang hanya terjadi pada orang lanjut usia", en: "Long-term effects only occur in the elderly" } },
          ],
          correct: "c",
        },
      ],
    },
  ],
  M4: [
    {
      key: "stimulus",
      title: {
        id: "Stimulus",
        en: "Stimulus",
      },
      body: {
        id: "Banyak produk beredar dengan label yang menarik, tetapi tidak semua konsumen memahami arti komposisi, red flags, atau potensi risiko di baliknya. Literasi halal adalah kemampuan membaca, memahami, dan mengevaluasi informasi tentang kehalalan dan keamanan produk, termasuk mengidentifikasi zat adiktif yang tersembunyi dalam produk sehari-hari.",
        en: "Many products circulate with attractive labels, but not all consumers understand the meaning of ingredients, red flags, or potential risks behind them. Halal literacy is the ability to read, understand, and evaluate information about a product's halal status and safety, including identifying addictive substances hidden in everyday products.",
      },
    },
    {
      key: "goal",
      title: {
        id: "Tujuan Belajar + Indikator Literasi Halal",
        en: "Learning Goals + Halal Literacy Indicators",
      },
      body: {
        id: "Kamu diharapkan mampu membaca label, mengenali red flags, memverifikasi kehalalan, dan mengambil keputusan konsumsi yang bijak, bertanggung jawab, serta sesuai prinsip halal-tayyib.",
        en: "You are expected to read labels, recognize red flags, verify halal status, and make wise, responsible consumption decisions in line with halal-tayyib principles.",
      },
      checkpoints: [
        {
          id: "Membaca label: memahami daftar bahan, nomor E-code, dan nama kimia tersembunyi pada kemasan produk.",
          en: "Reading labels: understanding ingredient lists, E-codes, and hidden chemical names on product packaging.",
        },
        {
          id: "Mengenali red flags: mengidentifikasi klaim berlebihan (\"langsung langsing\", \"tidak mengantuk 24 jam\") sebagai tanda kemungkinan zat terlarang.",
          en: "Recognizing red flags: identifying exaggerated claims (\"instant slimming\", \"no drowsiness for 24 hours\") as signs of possible prohibited substances.",
        },
        {
          id: "Verifikasi halal: memeriksa logo MUI, nomor registrasi BPOM, dan sumber bahan baku produk konsumsi.",
          en: "Halal verification: checking the MUI logo, BPOM registration number, and raw material sources of a consumer product.",
        },
        {
          id: "Konsumsi bijak: prinsip israf (berlebihan) berlaku pula untuk kafein dan zat legal — konsumsi wajar dan tidak berlebihan.",
          en: "Wise consumption: the principle of israf (excess) also applies to caffeine and legal substances — consume reasonably and without excess.",
        },
      ],
    },
    {
      key: "material",
      title: {
        id: "Materi Inti Kimia",
        en: "Core Chemistry Material",
      },
      body: {
        id: "Pelajari empat dimensi literasi halal serta contoh red flags nyata pada label produk melalui dua tab berikut.",
        en: "Study the four dimensions of halal literacy and real examples of label red flags through the two tabs below.",
      },
      tabs: [
        {
          id: "dimensi",
          label: { id: "Dimensi Literasi Halal", en: "Halal Literacy Dimensions" },
          body: {
            id: "Literasi halal mencakup empat dimensi yang saling melengkapi, mulai dari membaca label hingga mengambil keputusan konsumsi yang bijak.",
            en: "Halal literacy covers four complementary dimensions, from reading labels to making wise consumption decisions.",
          },
          table: {
            headers: [
              { id: "Dimensi", en: "Dimension" },
              { id: "Penjelasan", en: "Explanation" },
            ],
            rows: [
              [
                { id: "Membaca label", en: "Reading labels" },
                { id: "Memahami daftar bahan, nomor E-code, dan nama kimia tersembunyi pada kemasan produk.", en: "Understanding ingredient lists, E-codes, and hidden chemical names on product packaging." },
              ],
              [
                { id: "Mengenali red flags", en: "Recognizing red flags" },
                { id: "Identifikasi klaim berlebihan (\"langsung langsing\", \"tidak mengantuk 24 jam\") sebagai tanda kemungkinan zat terlarang.", en: "Identifying exaggerated claims (\"instant slimming\", \"no drowsiness for 24 hours\") as signs of possible prohibited substances." },
              ],
              [
                { id: "Verifikasi halal", en: "Halal verification" },
                { id: "Memeriksa logo MUI, nomor registrasi BPOM, dan sumber bahan baku produk konsumsi.", en: "Checking the MUI logo, BPOM registration number, and raw material sources of the product." },
              ],
              [
                { id: "Konsumsi bijak", en: "Wise consumption" },
                { id: "Prinsip israf (berlebihan) berlaku pula untuk kafein dan zat legal — konsumsi wajar dan tidak berlebihan.", en: "The principle of israf (excess) also applies to caffeine and legal substances — consume reasonably and without excess." },
              ],
            ],
          },
        },
        {
          id: "red-flags",
          label: { id: "Red Flags Label", en: "Label Red Flags" },
          body: {
            id: "Sejumlah bahan sering muncul di label dengan nama yang terdengar aman atau \"herbal\", padahal secara ilmiah tergolong stimulan, depresan, atau berisiko tinggi.",
            en: "Several ingredients often appear on labels under names that sound safe or \"herbal\", even though they are scientifically classified as stimulants, depressants, or high-risk substances.",
          },
          table: {
            headers: [
              { id: "Nama pada Label", en: "Label Name" },
              { id: "Nama Ilmiah", en: "Scientific Name" },
              { id: "Kategori", en: "Category" },
              { id: "Risiko", en: "Risk" },
            ],
            rows: [
              [
                { id: "Efedra / Ma Huang", en: "Ephedra / Ma Huang" },
                { id: "Efedrin C₁₀H₁₅NO", en: "Ephedrine C₁₀H₁₅NO" },
                { id: "Stimulan", en: "Stimulant" },
                { id: "Jantung, adiksi", en: "Heart risk, addiction" },
              ],
              [
                { id: "Spirulina + \"energi instan\"", en: "Spirulina + \"instant energy\"" },
                { id: "Adulterasi stimulan", en: "Adulterated stimulant" },
                { id: "Campuran ilegal", en: "Illegal mixture" },
                { id: "Haram / tidak halal", en: "Haram / not halal" },
              ],
              [
                { id: "Kratom / Mitragyna", en: "Kratom / Mitragyna" },
                { id: "Mitraginin C₂₃H₃₀N₂O₄", en: "Mitragynine C₂₃H₃₀N₂O₄" },
                { id: "Menyerupai opioid", en: "Opioid-like" },
                { id: "Adiksi, depresi napas", en: "Addiction, respiratory depression" },
              ],
              [
                { id: "Kava-kava", en: "Kava-kava" },
                { id: "Kavain C₁₄H₁₄O₃", en: "Kavain C₁₄H₁₄O₃" },
                { id: "Depresan", en: "Depressant" },
                { id: "Hepatotoksik", en: "Hepatotoxic" },
              ],
              [
                { id: "Alcohol (flavoring)", en: "Alcohol (flavoring)" },
                { id: "Etanol C₂H₅OH", en: "Ethanol C₂H₅OH" },
                { id: "Depresan / Haram", en: "Depressant / Haram" },
                { id: "Haram jika ≥0,5%", en: "Haram if ≥0.5%" },
              ],
              [
                { id: "Propilen glikol", en: "Propylene glycol" },
                { id: "C₃H₈O₂", en: "C₃H₈O₂" },
                { id: "Pelarut (e-liquid)", en: "Solvent (e-liquid)" },
                { id: "Risiko inhalasi", en: "Inhalation risk" },
              ],
            ],
          },
        },
      ],
    },
    {
      key: "visual",
      title: {
        id: "Visualisasi",
        en: "Visualization",
      },
      body: {
        id: "Struktur 3D etanol berikut adalah salah satu red flag paling umum: sering muncul di label sebagai \"alcohol (flavoring)\" dan tetap berstatus haram meski kadarnya kecil.",
        en: "The 3D ethanol structure below is one of the most common red flags: it often appears on labels as \"alcohol (flavoring)\" and remains haram even in small amounts.",
      },
    },
    {
      key: "value",
      title: {
        id: "Panel Nilai Islam",
        en: "Islamic Values Panel",
      },
      body: {
        id: "Sikap hati-hati dalam memilih produk merupakan bentuk tanggung jawab terhadap diri sendiri. Nilai Islam mendorong manusia memilih yang tayyib (baik) dan menjauhi yang khabā'ith (buruk), sebagaimana disebutkan dalam ayat berikut.",
        en: "Being careful in choosing products is a form of responsibility toward oneself. Islamic values encourage people to choose what is tayyib (good) and avoid what is khabā'ith (bad), as stated in the verse below.",
      },
      quotes: [
        {
          arabic: "وَيُحِلُّ لَهُمُ الطَّيِّبَاتِ وَيُحَرِّمُ عَلَيْهِمُ الْخَبَائِثَ",
          translation: {
            id: "Dan (Nabi) menghalalkan bagi mereka segala yang baik (ṭayyibāt) dan mengharamkan bagi mereka segala yang buruk (khabā'ith).",
            en: "And he (the Prophet) makes lawful for them all that is good (ṭayyibāt) and prohibits for them all that is bad (khabā'ith).",
          },
          source: "QS. Al-A'rāf [7]: 157",
        },
      ],
    },
    {
      key: "halal",
      title: {
        id: "Panel Literasi Halal",
        en: "Halal Literacy Panel",
      },
      body: {
        id: "Empat kaidah fikih berikut menjadi dasar menilai kehalalan dan keamanan produk konsumsi sehari-hari.",
        en: "The four fiqh principles below form the basis for assessing the halal status and safety of everyday consumer products.",
      },
      table: {
        headers: [
          { id: "Kaidah", en: "Principle" },
          { id: "Penjelasan", en: "Explanation" },
        ],
        rows: [
          [
            { id: "Al-aṣlu fī al-asyyā' al-ibāḥah", en: "Al-aṣlu fī al-asyyā' al-ibāḥah" },
            { id: "Hukum asal segala sesuatu adalah mubah, sampai ada dalil yang mengharamkan.", en: "The default ruling for anything is permissible, until there is evidence that forbids it." },
          ],
          [
            { id: "Mā uskira kathīruhu fa qalīluhu ḥarām", en: "Mā uskira kathīruhu fa qalīluhu ḥarām" },
            { id: "Sesuatu yang memabukkan dalam jumlah banyak, maka sedikitnya pun haram.", en: "Whatever intoxicates in large amounts, its small amount is also forbidden." },
          ],
          [
            { id: "Ad-ḍarūrāt tubīḥu al-maḥẓūrāt", en: "Ad-ḍarūrāt tubīḥu al-maḥẓūrāt" },
            { id: "Darurat (medis) membolehkan yang terlarang, dengan syarat: tidak ada alternatif halal, dosis minimal, rekomendasi dokter.", en: "Necessity (medical) permits the prohibited, on condition that there is no halal alternative, the dose is minimal, and a doctor recommends it." },
          ],
          [
            { id: "Sadd adz-Dzarī'ah", en: "Sadd adz-Dzarī'ah" },
            { id: "Menutup jalan menuju keharaman: menjauhi lingkungan dan situasi yang mendekatkan kepada zat terlarang.", en: "Blocking the path to sin: avoiding environments and situations that lead toward prohibited substances." },
          ],
        ],
      },
      checkpoints: [
        {
          id: "Diri: taqwa sebagai benteng pertama — dzikir dan shalat malam terbukti mengurangi aktivasi amigdala (stres kronis = pemicu relaps).",
          en: "Self: taqwa as the first line of defense — remembrance and night prayer have been shown to reduce amygdala activation (chronic stress = relapse trigger).",
        },
        {
          id: "Keluarga: melatih komunikasi asertif untuk menolak tawaran dengan tegas, hormat, dan tanpa merasa bersalah.",
          en: "Family: practicing assertive communication to firmly and respectfully decline offers without feeling guilty.",
        },
        {
          id: "Masyarakat: berperan aktif melaporkan peredaran narkoba dan mendukung program rehabilitasi berbasis komunitas.",
          en: "Community: actively participating in reporting drug circulation and supporting community-based rehabilitation programs.",
        },
      ],
    },
    {
      key: "exercise",
      title: {
        id: "Latihan Cepat",
        en: "Quick Practice",
      },
      body: {
        id: "Analisis sebuah label produk sederhana, identifikasi bagian pentingnya, lalu simpulkan apakah produk tersebut aman dan layak dipilih berdasarkan prinsip halal-tayyib dan keselamatan konsumsi.",
        en: "Analyze a simple product label, identify its important parts, then conclude whether the product is safe and suitable based on halal-tayyib principles and consumption safety.",
      },
      checkpoints: [
        {
          id: "Apa informasi pertama yang harus diperiksa pada label?",
          en: "What is the first information to check on a label?",
        },
        {
          id: "Mengapa red flags penting dalam keputusan konsumsi?",
          en: "Why are red flags important in consumption decisions?",
        },
      ],
      questions: [
        {
          id: "m4q1",
          prompt: {
            id: "Red flag pada label produk yang harus diwaspadai adalah...",
            en: "Red flags on a product label to watch out for include...",
          },
          options: [
            { value: "a", label: { id: "Logo merek yang menarik dan desain kemasan premium", en: "An attractive brand logo and premium packaging design" } },
            { value: "b", label: { id: "Harga yang tercantum lebih mahal dari produk sejenis", en: "A listed price higher than similar products" } },
            { value: "c", label: { id: "Peringatan kesehatan, kandungan berisiko, atau informasi yang tidak jelas", en: "Health warnings, risky ingredients, or unclear information" } },
            { value: "d", label: { id: "Ukuran tulisan yang kecil pada bagian belakang kemasan", en: "Small text size on the back of the packaging" } },
          ],
          correct: "c",
        },
        {
          id: "m4q2",
          prompt: {
            id: "Prinsip halal-tayyib dalam memilih produk berarti...",
            en: "The halal-tayyib principle in choosing products means...",
          },
          options: [
            { value: "a", label: { id: "Hanya membeli produk yang dijual di toko islami", en: "Only buying products sold in Islamic stores" } },
            { value: "b", label: { id: "Memilih produk paling murah yang tersedia", en: "Choosing the cheapest product available" } },
            { value: "c", label: { id: "Menilai produk dari sisi kehalalan, keamanan, manfaat, dan potensi mudaratnya", en: "Evaluating a product based on its halal status, safety, benefit, and potential harm" } },
            { value: "d", label: { id: "Mengikuti pilihan influencer yang dikenal di media sosial", en: "Following the choices of well-known influencers on social media" } },
          ],
          correct: "c",
        },
        {
          id: "m4q3",
          prompt: {
            id: "Informasi pertama yang penting diperiksa pada label produk adalah...",
            en: "The first important information to check on a product label is...",
          },
          options: [
            { value: "a", label: { id: "Nama merek dan logo perusahaan", en: "The brand name and company logo" } },
            { value: "b", label: { id: "Diskon dan promosi yang sedang berlaku", en: "Current discounts and promotions" } },
            { value: "c", label: { id: "Komposisi, izin edar, dan peringatan kesehatan", en: "Ingredients, distribution license, and health warnings" } },
            { value: "d", label: { id: "Tanggal kadaluarsa saja tanpa memperhatikan komposisi", en: "Expiration date only, without checking ingredients" } },
          ],
          correct: "c",
        },
      ],
    },
  ],
  M5: [
    {
      key: "stimulus",
      title: {
        id: "Stimulus",
        en: "Stimulus",
      },
      body: {
        id: "Seorang teman mengajak mencoba rokok, vape, obat tertentu, atau pil dengan alasan agar terlihat berani atau dianggap kompak. Situasi seperti ini menuntut penilaian cepat, aman, dan asertif.",
        en: "A friend invites someone to try cigarettes, vape, certain drugs, or pills to look brave or fit in. Situations like this require quick, safe, and assertive judgment.",
      },
    },
    {
      key: "goal",
      title: {
        id: "Tujuan Belajar + Indikator Literasi Halal",
        en: "Learning Goals + Halal Literacy Indicators",
      },
      body: {
        id: "Kamu diharapkan mampu menganalisis studi kasus, mengenali risiko, dan menyusun strategi menolak ajakan secara tegas namun santun.",
        en: "You are expected to analyze case studies, recognize risks, and develop strategies to refuse invitations firmly yet politely.",
      },
    },
    {
      key: "material",
      title: {
        id: "Materi Inti Kimia",
        en: "Core Chemistry Material",
      },
      body: {
        id: "Studi kasus menghubungkan konsep yang telah dipelajari: jenis zat, cara kerja di tubuh, dampak organ, serta risiko adiksi. Dari sini siswa belajar bahwa keputusan menolak bukan sekadar sikap sosial, tetapi juga hasil penalaran ilmiah dan moral.",
        en: "Case studies connect the concepts already learned: substance types, how they work in the body, organ impact, and addiction risk. From this, students learn that refusing is not only a social attitude, but also the result of scientific and moral reasoning.",
      },
    },
    {
      key: "visual",
      title: {
        id: "Visualisasi",
        en: "Visualization",
      },
      body: {
        id: "Visualisasi menampilkan cabang respons: menolak tegas-santun, ragu, atau ikut. Setiap pilihan menunjukkan konsekuensi yang berbeda pada kesehatan, hubungan sosial, dan keselamatan diri.",
        en: "The visualization shows response branches: refusing firmly and politely, hesitating, or joining. Each choice shows different consequences for health, social relationships, and personal safety.",
      },
    },
    {
      key: "value",
      title: {
        id: "Panel Nilai Islam",
        en: "Islamic Values Panel",
      },
      body: {
        id: "Menolak ajakan yang berbahaya adalah bentuk menjaga akal, jiwa, dan martabat diri. Asertif bukan berarti kasar, tetapi mampu berkata tidak dengan jelas dan bertanggung jawab.",
        en: "Refusing harmful invitations is a way of protecting the mind, soul, and personal dignity. Being assertive does not mean being rude, but being able to say no clearly and responsibly.",
      },
    },
    {
      key: "halal",
      title: {
        id: "Panel Literasi Halal",
        en: "Halal Literacy Panel",
      },
      body: {
        id: "Literasi halal pada tahap ini berarti mampu menimbang manfaat dan mudarat dalam situasi nyata. Pilihan yang benar tidak hanya bergantung pada pengetahuan, tetapi juga keberanian menerapkan nilai yang telah dipahami.",
        en: "Halal literacy at this stage means being able to weigh benefit and harm in real situations. The right choice depends not only on knowledge, but also on the courage to apply the values that have been understood.",
      },
    },
    {
      key: "exercise",
      title: {
        id: "Latihan Cepat",
        en: "Quick Practice",
      },
      body: {
        id: "Bacalah satu skenario ajakan, identifikasi risikonya, lalu susun kalimat penolakan yang tegas dan santun serta rencana dukungan jika tekanan dari teman terus berlanjut.",
        en: "Read one invitation scenario, identify the risks, then compose a firm and polite refusal statement along with a support plan if peer pressure continues.",
      },
      checkpoints: [
        {
          id: "Tuliskan satu contoh kalimat penolakan yang asertif.",
          en: "Write one example of an assertive refusal statement.",
        },
        {
          id: "Sebutkan langkah dukungan yang bisa dilakukan setelah menolak.",
          en: "Mention one support step that can be taken after refusing.",
        },
      ],
      questions: [
        {
          id: "m5q1",
          prompt: {
            id: "Ketika diajak mencoba zat terlarang, respons paling tepat adalah...",
            en: "When invited to try a prohibited substance, the most appropriate response is to...",
          },
          options: [
            { value: "a", label: { id: "Mengikuti agar tidak dianggap berbeda dari teman", en: "Go along so as not to seem different from friends" } },
            { value: "b", label: { id: "Diam dan berpura-pura tidak mendengar ajakan", en: "Stay silent and pretend not to hear the invitation" } },
            { value: "c", label: { id: "Menolak dengan tegas dan santun disertai alasan yang jelas", en: "Refuse firmly and politely with a clear reason" } },
            { value: "d", label: { id: "Mencoba sedikit terlebih dahulu untuk memastikan keamanannya", en: "Try a small amount first to check its safety" } },
          ],
          correct: "c",
        },
        {
          id: "m5q2",
          prompt: {
            id: "Asertif dalam konteks menolak ajakan berarti...",
            en: "Being assertive when refusing an invitation means...",
          },
          options: [
            { value: "a", label: { id: "Bersikap agresif dan marah kepada orang yang mengajak", en: "Being aggressive and angry toward the person who invited" } },
            { value: "b", label: { id: "Diam dan menghindar tanpa berkata apapun", en: "Staying silent and avoiding without saying anything" } },
            { value: "c", label: { id: "Mampu berkata tidak dengan jelas dan bertanggung jawab tanpa menyakiti orang lain", en: "Being able to say no clearly and responsibly without hurting others" } },
            { value: "d", label: { id: "Selalu mengikuti keinginan teman demi menjaga keharmonisan", en: "Always following friends' wishes to maintain harmony" } },
          ],
          correct: "c",
        },
        {
          id: "m5q3",
          prompt: {
            id: "Dasar ilmiah untuk menolak ajakan mencoba zat adiktif mencakup pengetahuan tentang...",
            en: "The scientific basis for refusing an invitation to try addictive substances includes knowledge of...",
          },
          options: [
            { value: "a", label: { id: "Pendapat senior yang lebih berpengalaman di lingkungan sekitar", en: "The opinions of more experienced seniors in the environment" } },
            { value: "b", label: { id: "Perasaan tidak suka terhadap bau atau tampilan zat tersebut", en: "A personal dislike of the substance's smell or appearance" } },
            { value: "c", label: { id: "Jenis zat, cara kerja di tubuh, dampak organ, dan risiko adiksi", en: "Substance types, how they work in the body, organ impact, and addiction risk" } },
            { value: "d", label: { id: "Larangan dari orang tua tanpa penjelasan ilmiah", en: "Parental prohibition without scientific explanation" } },
          ],
          correct: "c",
        },
      ],
    },
  ],
};

export function pick(locale: Locale, text: LocalizedText): string {
  return locale === "id" ? text.id : text.en;
}

export function getDefaultModuleProgress(): ModuleProgressMap {
  return {
    M1: 0,
    M2: 0,
    M3: 0,
    M4: 0,
    M5: 0,
  };
}

export function sanitizeModuleProgress(
  input: unknown
): ModuleProgressMap {
  const base = getDefaultModuleProgress();
  if (!input || typeof input !== "object") return base;

  for (const code of Object.keys(base) as ModuleCode[]) {
    const value = (input as Record<string, unknown>)[code];
    if (typeof value !== "number" || !Number.isFinite(value)) continue;
    base[code] = Math.min(100, Math.max(0, Math.round(value)));
  }

  return base;
}
