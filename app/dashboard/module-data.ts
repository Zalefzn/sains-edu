export type Locale = "id" | "en";
export type Level = "dasar" | "sedang" | "lanjut";
export type ModuleCode = "M1" | "M2" | "M3" | "M4" | "M5" | "M6" | "M7";
export type LocalizedText = { id: string; en: string };
export type ModuleItem = {
  code: ModuleCode;
  title: LocalizedText;
  summary: LocalizedText;
  prompt: LocalizedText;
  pubchemCid?: number;
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
};

export type ModuleProgressMap = Record<ModuleCode, number>;

export const modules: ModuleItem[] = [
  {
    code: "M1",
    pubchemCid: 89594, // Nicotine
    title: {
      id: "Pengertian dan ruang lingkup zat adiktif dan psikotropika",
      en: "Definition and scope of addictive substances and psychotropics",
    },
    summary: {
      id: "Mengenal definisi, contoh umum, dan ruang lingkup zat adiktif serta psikotropika dalam kehidupan sehari-hari.",
      en: "Learn the definition, common examples, and scope of addictive substances and psychotropics in daily life.",
    },
    prompt: {
      id: "Mengapa memahami pengertian dan ruang lingkup zat adiktif penting untuk menjaga diri dan membuat keputusan yang aman?",
      en: "Why is understanding the definition and scope of addictive substances important for self-protection and safe decision making?",
    },
  },
  {
    code: "M2",
    pubchemCid: 2519, // Caffeine
    title: {
      id: "Klasifikasi, contoh, dan ciri adiksi",
      en: "Classification, examples, and signs of addiction",
    },
    summary: {
      id: "Membedakan jenis zat, contoh penggunaan, dan tanda awal adiksi.",
      en: "Differentiate substance types, examples of use, and early signs of addiction.",
    },
    prompt: {
      id: "Bagaimana membedakan jenis zat adiktif dan mengenali ciri awal adiksi?",
      en: "How do we distinguish addictive substance types and identify early signs of addiction?",
    },
  },
  {
    code: "M3",
    pubchemCid: 702, // Ethanol
    title: {
      id: "Mekanisme kimia di tubuh (farmakokinetik dan farmakodinamika)",
      en: "Chemical mechanisms in the body (pharmacokinetics and pharmacodynamics)",
    },
    summary: {
      id: "Memahami bagaimana zat masuk, tersebar, dan bekerja di dalam tubuh.",
      en: "Understand how substances enter, spread, and act in the body.",
    },
    prompt: {
      id: "Apa dampak memahami farmakokinetik dan farmakodinamika terhadap literasi sains?",
      en: "How does understanding pharmacokinetics and pharmacodynamics improve science literacy?",
    },
  },
  {
    code: "M4",
    pubchemCid: 681, // Dopamine
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
    code: "M5",
    pubchemCid: 5288826, // Morphine
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
    code: "M6",
    pubchemCid: 702, // Ethanol (halal literacy context)
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
    code: "M7",
    pubchemCid: 10836, // Methamphetamine
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
  dasar: ["M1", "M2", "M5", "M6"],
  sedang: ["M2", "M3", "M4", "M5", "M6"],
  lanjut: ["M3", "M4", "M6", "M7"],
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
        id: "Di sekitar remaja terdapat rokok, vape, obat penenang, minuman berenergi, dan produk lain yang sering dianggap biasa. Tidak semua orang memahami mana yang termasuk zat adiktif, mana yang tergolong psikotropika, dan apa akibatnya bila digunakan tanpa pengetahuan yang benar.",
        en: "Around teenagers there are cigarettes, vapes, sedatives, energy drinks, and other products often seen as ordinary. Not everyone understands which are addictive substances, which are psychotropics, and what happens when they are used without proper knowledge.",
      },
    },
    {
      key: "goal",
      title: {
        id: "Tujuan Belajar + Indikator Literasi Halal",
        en: "Learning Goals + Halal Literacy Indicators",
      },
      body: {
        id: "Kamu diharapkan mampu menjelaskan pengertian zat adiktif dan psikotropika, membedakan ruang lingkup keduanya, serta memahami pentingnya kehati-hatian saat menghadapi produk yang berpotensi menimbulkan ketergantungan.",
        en: "You are expected to explain the definition of addictive substances and psychotropics, distinguish their scope, and understand the importance of caution when facing products that may cause dependency.",
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
        id: "Pelajari konsep dasar zat adiktif dan psikotropika, siklus adiksi, dasar hukumnya di Indonesia, serta bagaimana zat bekerja di dalam tubuh melalui empat tab berikut.",
        en: "Study the basic concepts of addictive substances and psychotropics, the addiction cycle, the Indonesian legal basis, and how substances work in the body through the four tabs below.",
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
        id: "Struktur 3D nikotin berikut adalah salah satu contoh \"zat adiktif lain\" yang diatur UU No. 36/2009 — legal namun berstatus makruh–haram karena mengandung risiko ketergantungan.",
        en: "The 3D structure below is nicotine, an example of an \"other addictive substance\" regulated under Law No. 36/2009 — legal, but makruh–haram in status due to its dependency risk.",
      },
    },
    {
      key: "value",
      title: {
        id: "Panel Nilai Islam",
        en: "Islamic Values Panel",
      },
      body: {
        id: "Menjaga akal dan jiwa termasuk tujuan utama syariat (maqāṣid asy-syarī'ah). Memahami pengertian zat adiktif membantu seseorang menghindari hal yang merusak kemampuan berpikir, mengurangi kendali diri, dan membahayakan kesehatan.",
        en: "Protecting the mind and soul is among the key objectives of syariah (maqāṣid asy-syarī'ah). Understanding addictive substances helps a person avoid what harms thinking ability, reduces self-control, and endangers health.",
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
        id: "Terdaftar di BPOM tidak sama dengan halal. BPOM menjamin keamanan kimia dan mikrobiologi; MUI menjamin kehalalan berdasarkan standar syariah. Sebuah produk dapat lolos BPOM namun tetap mengandung bahan haram atau syubhat — inilah dasar pentingnya literasi halal dalam memilih produk konsumsi.",
        en: "Being registered with BPOM (Indonesia's food and drug agency) is not the same as being halal. BPOM guarantees chemical and microbiological safety; MUI (halal authority) certifies halal status based on syariah standards. A product can pass BPOM review yet still contain haram or syubhat (doubtful) ingredients — this is why halal literacy matters when choosing consumer products.",
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
        id: "Jawablah perbedaan pokok antara zat adiktif dan psikotropika, sebutkan contoh yang sering ditemui, dan jelaskan alasan mengapa mempelajari ruang lingkup keduanya penting bagi remaja.",
        en: "Answer the key difference between addictive substances and psychotropics, mention common examples, and explain why learning their scope is important for teenagers.",
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
        id: "Dua produk dapat terlihat mirip, tetapi kandungan dan risikonya berbeda. Ada produk yang menimbulkan efek stimulan, ada yang menekan sistem saraf, dan ada pula yang menimbulkan gejala adiksi bila digunakan terus-menerus.",
        en: "Two products may look similar, but their content and risks are different. Some are stimulants, some depress the nervous system, and some can trigger addiction symptoms when used continuously.",
      },
    },
    {
      key: "goal",
      title: {
        id: "Tujuan Belajar + Indikator Literasi Halal",
        en: "Learning Goals + Halal Literacy Indicators",
      },
      body: {
        id: "Kamu diharapkan mampu mengklasifikasikan zat adiktif, menyebutkan contohnya, dan mengenali ciri adiksi agar tidak salah menilai suatu produk atau perilaku konsumsi.",
        en: "You are expected to classify addictive substances, name examples, and recognize the signs of addiction so you do not misjudge a product or consumption behavior.",
      },
    },
    {
      key: "material",
      title: {
        id: "Materi Inti Kimia",
        en: "Core Chemistry Material",
      },
      body: {
        id: "Zat adiktif dapat diklasifikasikan berdasarkan asal, efek, dan bentuk pemakaian. Contohnya meliputi nikotin, alkohol, kafein, dan zat terlarang tertentu. Ciri adiksi dapat dikenali dari keinginan kuat untuk menggunakan lagi, toleransi meningkat, dan kesulitan berhenti.",
        en: "Addictive substances can be classified by origin, effect, and form of use. Examples include nicotine, alcohol, caffeine, and certain illicit drugs. Signs of addiction include a strong urge to use again, increased tolerance, and difficulty stopping.",
      },
    },
    {
      key: "visual",
      title: {
        id: "Visualisasi",
        en: "Visualization",
      },
      body: {
        id: "Visualisasi memperlihatkan tabel klasifikasi yang membandingkan contoh zat, efek dominan, bentuk penggunaan, serta tanda awal yang menunjukkan seseorang mulai mengalami adiksi.",
        en: "The visualization shows a classification table comparing examples of substances, dominant effects, forms of use, and early signs that indicate a person is beginning to experience addiction.",
      },
    },
    {
      key: "value",
      title: {
        id: "Panel Nilai Islam",
        en: "Islamic Values Panel",
      },
      body: {
        id: "Kemampuan membedakan jenis zat dan ciri adiksi membantu seseorang menjaga diri dari kebiasaan yang merusak akal, merugikan tubuh, dan membuka jalan pada perilaku yang tidak bertanggung jawab.",
        en: "The ability to distinguish substance types and addiction signs helps a person protect themselves from habits that harm the mind, damage the body, and open the way to irresponsible behavior.",
      },
    },
    {
      key: "halal",
      title: {
        id: "Panel Literasi Halal",
        en: "Halal Literacy Panel",
      },
      body: {
        id: "Dalam literasi halal, siswa belajar bahwa suatu produk tidak cukup dinilai dari kemasan atau popularitasnya. Kandungan, efek, dan potensi penyalahgunaan harus menjadi pertimbangan sebelum memutuskan untuk mengonsumsi.",
        en: "In halal literacy, students learn that a product cannot be judged only by packaging or popularity. Its ingredients, effects, and potential misuse must be considered before deciding to consume it.",
      },
    },
    {
      key: "exercise",
      title: {
        id: "Latihan Cepat",
        en: "Quick Practice",
      },
      body: {
        id: "Kelompokkan beberapa contoh zat ke dalam kategori yang tepat, lalu identifikasi tanda awal adiksi yang dapat terlihat pada seseorang dalam kehidupan sehari-hari.",
        en: "Group several examples of substances into the correct categories, then identify early signs of addiction that may be seen in someone’s daily life.",
      },
      checkpoints: [
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
  M3: [
    {
      key: "stimulus",
      title: {
        id: "Stimulus",
        en: "Stimulus",
      },
      body: {
        id: "Saat suatu zat masuk ke tubuh, efeknya tidak muncul secara acak. Ada proses penyerapan, penyebaran, perubahan, hingga pengeluaran yang memengaruhi seberapa cepat dan seberapa kuat zat itu bekerja.",
        en: "When a substance enters the body, its effects do not appear randomly. There are stages of absorption, distribution, change, and elimination that affect how quickly and strongly the substance works.",
      },
    },
    {
      key: "goal",
      title: {
        id: "Tujuan Belajar + Indikator Literasi Halal",
        en: "Learning Goals + Halal Literacy Indicators",
      },
      body: {
        id: "Kamu diharapkan memahami farmakokinetik dan farmakodinamika secara sederhana agar dapat menjelaskan bagaimana zat masuk, bekerja, dan memengaruhi tubuh.",
        en: "You are expected to understand pharmacokinetics and pharmacodynamics in a simple way so you can explain how a substance enters, works in, and affects the body.",
      },
    },
    {
      key: "material",
      title: {
        id: "Materi Inti Kimia",
        en: "Core Chemistry Material",
      },
      body: {
        id: "Farmakokinetik membahas apa yang tubuh lakukan terhadap zat: absorpsi, distribusi, metabolisme, dan ekskresi. Farmakodinamika membahas apa yang zat lakukan terhadap tubuh, misalnya memengaruhi reseptor saraf, menimbulkan efek rangsang, tenang, atau perubahan perilaku.",
        en: "Pharmacokinetics explains what the body does to a substance: absorption, distribution, metabolism, and excretion. Pharmacodynamics explains what the substance does to the body, such as affecting nerve receptors, producing stimulation, sedation, or behavior changes.",
      },
    },
    {
      key: "visual",
      title: {
        id: "Visualisasi",
        en: "Visualization",
      },
      body: {
        id: "Visualisasi menggambarkan jalur zat dari titik masuk ke aliran darah, menuju organ target, lalu diproses hati dan dikeluarkan tubuh. Diagram ini membantu siswa memahami mengapa efek zat bisa berbeda pada tiap orang.",
        en: "The visualization shows a substance pathway from entry point to bloodstream, then to target organs, and finally being processed by the liver and removed from the body. This diagram helps students understand why effects can differ between individuals.",
      },
    },
    {
      key: "value",
      title: {
        id: "Panel Nilai Islam",
        en: "Islamic Values Panel",
      },
      body: {
        id: "Memahami mekanisme kerja zat membuat seseorang lebih sadar bahwa tubuh adalah amanah. Setiap zat yang masuk membawa konsekuensi, sehingga keputusan konsumsi harus didasari ilmu dan tanggung jawab.",
        en: "Understanding how substances work helps a person realize that the body is a trust. Every substance entering the body has consequences, so consumption decisions must be based on knowledge and responsibility.",
      },
    },
    {
      key: "halal",
      title: {
        id: "Panel Literasi Halal",
        en: "Halal Literacy Panel",
      },
      body: {
        id: "Literasi halal mendorong siswa untuk mempertanyakan asal zat, prosesnya dalam tubuh, dan dampaknya. Produk yang legal belum tentu tayyib jika berisiko menimbulkan mudarat serius bagi kesehatan.",
        en: "Halal literacy encourages students to question a substance’s origin, its process in the body, and its effects. A legal product is not always tayyib if it carries serious health risks.",
      },
    },
    {
      key: "exercise",
      title: {
        id: "Latihan Cepat",
        en: "Quick Practice",
      },
      body: {
        id: "Jelaskan perbedaan farmakokinetik dan farmakodinamika, lalu uraikan secara singkat perjalanan suatu zat sejak masuk ke tubuh sampai dikeluarkan kembali.",
        en: "Explain the difference between pharmacokinetics and pharmacodynamics, then briefly describe the journey of a substance from entering the body until it is removed again.",
      },
      checkpoints: [
        {
          id: "Apa yang dimaksud absorpsi?",
          en: "What is absorption?",
        },
        {
          id: "Mengapa zat yang sama dapat memberi efek berbeda pada orang yang berbeda?",
          en: "Why can the same substance have different effects on different people?",
        },
      ],
      questions: [
        {
          id: "m3q1",
          prompt: {
            id: "Farmakokinetik membahas...",
            en: "Pharmacokinetics explains...",
          },
          options: [
            { value: "a", label: { id: "Apa yang zat lakukan terhadap tubuh", en: "What the substance does to the body" } },
            { value: "b", label: { id: "Cara membuat senyawa kimia di laboratorium", en: "How to synthesize chemical compounds in the laboratory" } },
            { value: "c", label: { id: "Apa yang tubuh lakukan terhadap zat: absorpsi, distribusi, metabolisme, dan ekskresi", en: "What the body does to the substance: absorption, distribution, metabolism, and excretion" } },
            { value: "d", label: { id: "Dampak psikologis penggunaan obat secara jangka panjang", en: "The psychological effects of long-term drug use" } },
          ],
          correct: "c",
        },
        {
          id: "m3q2",
          prompt: {
            id: "Hati memiliki peran penting dalam farmakokinetik karena...",
            en: "The liver plays an important role in pharmacokinetics because it...",
          },
          options: [
            { value: "a", label: { id: "Hati memproduksi dopamin dan serotonin", en: "Produces dopamine and serotonin" } },
            { value: "b", label: { id: "Hati memproses dan mendetoksifikasi zat yang masuk ke tubuh", en: "Processes and detoxifies substances entering the body" } },
            { value: "c", label: { id: "Hati menyimpan semua zat asing untuk digunakan kemudian", en: "Stores all foreign substances for later use" } },
            { value: "d", label: { id: "Hati mengatur tekanan darah saat zat masuk ke tubuh", en: "Regulates blood pressure when substances enter the body" } },
          ],
          correct: "b",
        },
        {
          id: "m3q3",
          prompt: {
            id: "Mengapa efek zat yang sama dapat berbeda pada setiap orang?",
            en: "Why can the same substance have different effects on different people?",
          },
          options: [
            { value: "a", label: { id: "Karena zat bekerja secara acak tanpa pola yang jelas", en: "Because the substance works randomly with no clear pattern" } },
            { value: "b", label: { id: "Karena warna dan bentuk zat memengaruhi kekuatannya", en: "Because the color and form of the substance affect its potency" } },
            { value: "c", label: { id: "Karena perbedaan metabolisme, usia, berat badan, dan kondisi kesehatan individu", en: "Because of differences in individual metabolism, age, weight, and health condition" } },
            { value: "d", label: { id: "Karena hanya perempuan yang memiliki reseptor aktif di saraf pusat", en: "Because only women have active receptors in the central nervous system" } },
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
        id: "Sebagian zat membuat seseorang merasa senang sesaat, lalu ingin mengulanginya lagi. Lama-kelamaan muncul craving, kebutuhan dosis lebih besar, dan rasa tidak nyaman ketika penggunaan dihentikan.",
        en: "Some substances make a person feel pleasure for a moment and then want to repeat it again. Over time craving appears, larger doses are needed, and discomfort emerges when use is stopped.",
      },
    },
    {
      key: "goal",
      title: {
        id: "Tujuan Belajar + Indikator Literasi Halal",
        en: "Learning Goals + Halal Literacy Indicators",
      },
      body: {
        id: "Kamu diharapkan memahami konsep dopamin, craving, tolerance, dan withdrawal untuk menjelaskan mengapa perilaku adiktif sulit dihentikan.",
        en: "You are expected to understand dopamine, craving, tolerance, and withdrawal to explain why addictive behavior is difficult to stop.",
      },
    },
    {
      key: "material",
      title: {
        id: "Materi Inti Kimia",
        en: "Core Chemistry Material",
      },
      body: {
        id: "Sistem reward otak melibatkan pelepasan dopamin yang memberi sensasi senang. Jika paparan berulang terjadi, otak menyesuaikan responsnya sehingga muncul tolerance. Craving mendorong keinginan kuat untuk memakai lagi, sedangkan withdrawal muncul ketika pemakaian dihentikan dan tubuh bereaksi negatif.",
        en: "The brain reward system involves dopamine release that creates a feeling of pleasure. With repeated exposure, the brain adjusts its response and tolerance appears. Craving drives a strong urge to use again, while withdrawal appears when use stops and the body reacts negatively.",
      },
    },
    {
      key: "visual",
      title: {
        id: "Visualisasi",
        en: "Visualization",
      },
      body: {
        id: "Visualisasi menampilkan perubahan level dopamin sebelum, saat, dan setelah penggunaan zat, sehingga siswa melihat hubungan antara sensasi sesaat, craving, dan penurunan kontrol diri.",
        en: "The visualization displays dopamine level changes before, during, and after substance use, so students can see the connection between short-term pleasure, craving, and reduced self-control.",
      },
    },
    {
      key: "value",
      title: {
        id: "Panel Nilai Islam",
        en: "Islamic Values Panel",
      },
      body: {
        id: "Pemahaman tentang sistem reward otak mengingatkan bahwa kenikmatan sesaat tidak selalu membawa kebaikan. Menjaga akal berarti juga menahan diri dari sesuatu yang perlahan merusak kendali dan kebebasan memilih.",
        en: "Understanding the brain reward system reminds us that short-term pleasure does not always bring goodness. Protecting the mind also means restraining oneself from things that slowly damage control and freedom of choice.",
      },
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
          id: "m4q1",
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
          id: "m4q2",
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
          id: "m4q3",
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
  M5: [
    {
      key: "stimulus",
      title: {
        id: "Stimulus",
        en: "Stimulus",
      },
      body: {
        id: "Efek zat adiktif tidak hanya dirasakan sesaat. Dalam jangka pendek mungkin muncul perubahan detak jantung, konsentrasi, atau napas. Dalam jangka panjang, organ seperti otak, jantung, paru, dan hati dapat mengalami kerusakan.",
        en: "The effects of addictive substances are not only felt briefly. In the short term there may be changes in heart rate, concentration, or breathing. In the long term, organs such as the brain, heart, lungs, and liver can be damaged.",
      },
    },
    {
      key: "goal",
      title: {
        id: "Tujuan Belajar + Indikator Literasi Halal",
        en: "Learning Goals + Halal Literacy Indicators",
      },
      body: {
        id: "Kamu diharapkan mampu menjelaskan dampak zat adiktif pada organ utama dan membedakan efek jangka pendek serta jangka panjangnya.",
        en: "You are expected to explain the effects of addictive substances on major organs and distinguish between short-term and long-term effects.",
      },
    },
    {
      key: "material",
      title: {
        id: "Materi Inti Kimia",
        en: "Core Chemistry Material",
      },
      body: {
        id: "Otak dapat mengalami gangguan fokus dan kontrol diri. Jantung dapat bekerja lebih berat atau tidak teratur. Paru-paru dapat terganggu dalam pertukaran gas, sedangkan hati bekerja lebih keras dalam metabolisme dan detoksifikasi. Timeline efek membantu siswa melihat bahwa dampak dapat bertahap namun serius.",
        en: "The brain may suffer from impaired focus and self-control. The heart may work harder or irregularly. The lungs may experience disrupted gas exchange, while the liver works harder in metabolism and detoxification. The effect timeline helps students see that the damage can be gradual but serious.",
      },
    },
    {
      key: "visual",
      title: {
        id: "Visualisasi",
        en: "Visualization",
      },
      body: {
        id: "Visualisasi organ interaktif membandingkan kondisi sehat dan tidak sehat pada otak, jantung, paru, dan hati, lalu menempatkannya dalam mode timeline dari dampak awal sampai dampak menahun.",
        en: "The interactive organ visualization compares healthy and unhealthy conditions in the brain, heart, lungs, and liver, then places them on a timeline from early effects to long-term damage.",
      },
    },
    {
      key: "value",
      title: {
        id: "Panel Nilai Islam",
        en: "Islamic Values Panel",
      },
      body: {
        id: "Tubuh adalah amanah yang harus dijaga. Mengetahui dampak zat pada organ menumbuhkan kesadaran bahwa keputusan konsumsi yang salah dapat melukai diri sendiri dalam jangka panjang.",
        en: "The body is a trust that must be protected. Knowing the effects of substances on organs builds awareness that poor consumption decisions can harm oneself in the long run.",
      },
    },
    {
      key: "halal",
      title: {
        id: "Panel Literasi Halal",
        en: "Halal Literacy Panel",
      },
      body: {
        id: "Konsep halal-tayyib menuntun siswa menilai keamanan produk dari dampaknya pada tubuh. Jika suatu zat berpotensi merusak organ, maka aspek mudarat harus menjadi pertimbangan utama.",
        en: "The halal-tayyib concept guides students to assess product safety through its effects on the body. If a substance can damage organs, then the aspect of harm must become a primary consideration.",
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
          id: "m5q1",
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
          id: "m5q2",
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
          id: "m5q3",
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
  M6: [
    {
      key: "stimulus",
      title: {
        id: "Stimulus",
        en: "Stimulus",
      },
      body: {
        id: "Banyak produk beredar dengan label yang menarik, tetapi tidak semua konsumen memahami arti komposisi, red flags, atau potensi risiko di baliknya. Keputusan aman memerlukan kemampuan membaca informasi dengan teliti.",
        en: "Many products circulate with attractive labels, but not all consumers understand the meaning of ingredients, red flags, or potential risks behind them. Safe decisions require the ability to read information carefully.",
      },
    },
    {
      key: "goal",
      title: {
        id: "Tujuan Belajar + Indikator Literasi Halal",
        en: "Learning Goals + Halal Literacy Indicators",
      },
      body: {
        id: "Kamu diharapkan mampu membaca label, mengenali tanda bahaya, dan mengambil keputusan konsumsi yang aman, bertanggung jawab, serta sesuai prinsip halal-tayyib.",
        en: "You are expected to read labels, recognize warning signs, and make safe, responsible consumption decisions in line with halal-tayyib principles.",
      },
    },
    {
      key: "material",
      title: {
        id: "Materi Inti Kimia",
        en: "Core Chemistry Material",
      },
      body: {
        id: "Literasi halal mencakup kemampuan membaca komposisi, memahami klaim produk, menilai kandungan aktif, dan mengenali red flags seperti peringatan kesehatan, kandungan berisiko, atau informasi yang tidak jelas. Konsumsi aman membutuhkan gabungan pengetahuan sains dan pertimbangan nilai.",
        en: "Halal literacy includes the ability to read ingredients, understand product claims, assess active compounds, and recognize red flags such as health warnings, risky content, or unclear information. Safe consumption requires both scientific knowledge and value-based consideration.",
      },
    },
    {
      key: "visual",
      title: {
        id: "Visualisasi",
        en: "Visualization",
      },
      body: {
        id: "Visualisasi menampilkan contoh label produk dengan bagian yang harus diperhatikan: komposisi, izin edar, peringatan, petunjuk penggunaan, dan informasi kandungan yang mungkin memengaruhi kesehatan.",
        en: "The visualization displays a sample product label with sections that should be reviewed: ingredients, registration, warnings, usage instructions, and content information that may affect health.",
      },
    },
    {
      key: "value",
      title: {
        id: "Panel Nilai Islam",
        en: "Islamic Values Panel",
      },
      body: {
        id: "Sikap hati-hati dalam memilih produk merupakan bentuk tanggung jawab terhadap diri sendiri. Nilai Islam mendorong manusia memilih yang halal, baik, aman, dan menjauhi hal yang meragukan atau berbahaya.",
        en: "Being careful in choosing products is a form of responsibility toward oneself. Islamic values encourage people to choose what is halal, good, safe, and to avoid what is doubtful or harmful.",
      },
    },
    {
      key: "halal",
      title: {
        id: "Panel Literasi Halal",
        en: "Halal Literacy Panel",
      },
      body: {
        id: "Panel ini menekankan konsep halal-tayyib, maslahah-mudarat, dan kebiasaan cek label sebelum membeli. Siswa dilatih agar tidak mudah percaya pada promosi tanpa membaca informasi penting lebih dahulu.",
        en: "This panel emphasizes halal-tayyib, benefit-versus-harm, and the habit of checking labels before buying. Students are trained not to trust promotions easily without first reading important information.",
      },
      checkpoints: [
        {
          id: "Periksa komposisi produk.",
          en: "Check the product ingredients.",
        },
        {
          id: "Cari peringatan atau red flags.",
          en: "Look for warnings or red flags.",
        },
        {
          id: "Nilai manfaat dan mudarat sebelum membeli.",
          en: "Assess benefits and harms before buying.",
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
          id: "m6q1",
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
          id: "m6q2",
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
          id: "m6q3",
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
  M7: [
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
          id: "m7q1",
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
          id: "m7q2",
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
          id: "m7q3",
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
    M6: 0,
    M7: 0,
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
