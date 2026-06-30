import type { LocalizedText, ModuleCode } from "./module-data";

export type Reference = {
  id: string;
  title: string;
  author: string;
  source: string;
  year: number;
  url?: string;
  category: "buku" | "jurnal" | "website" | "regulasi";
};

export type GlossaryTerm = {
  id: string;
  term: string;
  termEn: string;
  definition: LocalizedText;
  module?: ModuleCode;
};

export const references: Reference[] = [
  {
    id: "r1",
    category: "website",
    title: "Data Penyalahgunaan Narkoba di Indonesia",
    author: "Badan Narkotika Nasional (BNN)",
    source: "bnn.go.id",
    year: 2023,
    url: "https://bnn.go.id",
  },
  {
    id: "r2",
    category: "regulasi",
    title: "Pedoman Penatalaksanaan Ketergantungan NAPZA",
    author: "Kementerian Kesehatan Republik Indonesia",
    source: "Kemenkes RI",
    year: 2021,
  },
  {
    id: "r3",
    category: "website",
    title: "International Standards for Drug Use Prevention (2nd ed.)",
    author: "World Health Organization (WHO)",
    source: "who.int",
    year: 2018,
    url: "https://www.who.int/publications/i/item/978924151417-8",
  },
  {
    id: "r4",
    category: "website",
    title: "Drugs, Brains, and Behavior: The Science of Addiction",
    author: "National Institute on Drug Abuse (NIDA)",
    source: "nida.nih.gov",
    year: 2020,
    url: "https://nida.nih.gov/publications/drugs-brains-behavior-science-addiction",
  },
  {
    id: "r5",
    category: "buku",
    title: "Goodman & Gilman's The Pharmacological Basis of Therapeutics (14th ed.)",
    author: "Brunton L, Knollmann B (eds.)",
    source: "McGraw-Hill Education",
    year: 2022,
  },
  {
    id: "r6",
    category: "website",
    title: "PubChem — Open Chemistry Database",
    author: "National Center for Biotechnology Information (NCBI)",
    source: "pubchem.ncbi.nlm.nih.gov",
    year: 2024,
    url: "https://pubchem.ncbi.nlm.nih.gov",
  },
  {
    id: "r7",
    category: "regulasi",
    title: "Fatwa MUI No. 53 Tahun 2014 tentang Hukum Rokok",
    author: "Majelis Ulama Indonesia (MUI)",
    source: "halalmui.org",
    year: 2014,
    url: "https://halalmui.org",
  },
  {
    id: "r8",
    category: "regulasi",
    title: "Undang-Undang No. 35 Tahun 2009 tentang Narkotika",
    author: "Pemerintah Republik Indonesia",
    source: "peraturan.bpk.go.id",
    year: 2009,
    url: "https://peraturan.bpk.go.id",
  },
  {
    id: "r9",
    category: "buku",
    title: "Essential Psychopharmacology: Neuroscientific Basis and Practical Applications (5th ed.)",
    author: "Stahl SM",
    source: "Cambridge University Press",
    year: 2021,
  },
  {
    id: "r10",
    category: "jurnal",
    title: "Neurobiology of Addiction: A Neurocircuitry Analysis",
    author: "Koob GF, Volkow ND",
    source: "The Lancet Psychiatry, 3(8), 760–773",
    year: 2016,
    url: "https://doi.org/10.1016/S2215-0366(16)00104-8",
  },
  {
    id: "r11",
    category: "jurnal",
    title: "The Neurobiology of Slow-Onset Stimulant Drugs",
    author: "Volkow ND et al.",
    source: "Pharmacology & Therapeutics, 221",
    year: 2021,
    url: "https://doi.org/10.1016/j.pharmthera.2020.107785",
  },
  {
    id: "r12",
    category: "website",
    title: "Pedoman Literasi Obat untuk Masyarakat",
    author: "Badan Pengawas Obat dan Makanan (BPOM) RI",
    source: "bpom.go.id",
    year: 2022,
    url: "https://www.bpom.go.id",
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "g-absorpsi",
    term: "Absorpsi",
    termEn: "Absorption",
    module: "M3",
    definition: {
      id: "Proses penyerapan zat dari tempat masuknya (mulut, paru-paru, kulit) ke dalam aliran darah.",
      en: "The process by which a substance moves from its entry point (mouth, lungs, skin) into the bloodstream.",
    },
  },
  {
    id: "g-adiksi",
    term: "Adiksi",
    termEn: "Addiction",
    module: "M2",
    definition: {
      id: "Ketergantungan fisik dan/atau psikologis terhadap suatu zat atau perilaku, ditandai dengan craving, kehilangan kendali, dan penggunaan meski ada dampak negatif.",
      en: "Physical and/or psychological dependence on a substance or behavior, marked by craving, loss of control, and continued use despite negative consequences.",
    },
  },
  {
    id: "g-asertif",
    term: "Asertif",
    termEn: "Assertive",
    module: "M7",
    definition: {
      id: "Kemampuan mengungkapkan pendapat, kebutuhan, atau penolakan secara jelas, jujur, dan bertanggung jawab tanpa menyakiti orang lain.",
      en: "The ability to express opinions, needs, or refusals clearly, honestly, and responsibly without hurting others.",
    },
  },
  {
    id: "g-craving",
    term: "Craving",
    termEn: "Craving",
    module: "M4",
    definition: {
      id: "Keinginan kuat dan mendesak untuk menggunakan zat adiktif kembali, dipicu oleh perubahan kimia di otak akibat paparan sebelumnya.",
      en: "A strong and urgent urge to use an addictive substance again, triggered by chemical changes in the brain from prior exposure.",
    },
  },
  {
    id: "g-depresan",
    term: "Depresan",
    termEn: "Depressant",
    module: "M2",
    definition: {
      id: "Golongan zat yang memperlambat aktivitas sistem saraf pusat, mengurangi fungsi otak dan tubuh, contohnya alkohol dan benzodiazepin.",
      en: "A class of substances that slow down central nervous system activity, reducing brain and body function. Examples include alcohol and benzodiazepines.",
    },
  },
  {
    id: "g-distribusi",
    term: "Distribusi",
    termEn: "Distribution",
    module: "M3",
    definition: {
      id: "Proses penyebaran zat dari aliran darah ke berbagai jaringan, organ, dan cairan tubuh setelah diabsorpsi.",
      en: "The process of a substance spreading from the bloodstream to various tissues, organs, and body fluids after absorption.",
    },
  },
  {
    id: "g-dopamin",
    term: "Dopamin",
    termEn: "Dopamine",
    module: "M4",
    definition: {
      id: "Neurotransmiter yang berperan utama dalam sistem reward otak, memberi sensasi senang dan memotivasi pengulangan perilaku yang dianggap menyenangkan.",
      en: "A neurotransmitter that plays a key role in the brain's reward system, creating feelings of pleasure and motivating repeated behavior.",
    },
  },
  {
    id: "g-ekskresi",
    term: "Ekskresi",
    termEn: "Excretion",
    module: "M3",
    definition: {
      id: "Proses pengeluaran zat atau sisa metabolismenya dari tubuh, terutama melalui ginjal (urin), hati (empedu), dan paru-paru.",
      en: "The process of removing a substance or its metabolic by-products from the body, mainly through the kidneys (urine), liver (bile), and lungs.",
    },
  },
  {
    id: "g-farmakodinamika",
    term: "Farmakodinamika",
    termEn: "Pharmacodynamics",
    module: "M3",
    definition: {
      id: "Cabang ilmu yang mempelajari apa yang dilakukan zat terhadap tubuh: bagaimana zat berinteraksi dengan reseptor, menimbulkan efek, dan memengaruhi fungsi organ.",
      en: "The branch of science that studies what a substance does to the body: how it interacts with receptors, produces effects, and influences organ function.",
    },
  },
  {
    id: "g-farmakokinetik",
    term: "Farmakokinetik",
    termEn: "Pharmacokinetics",
    module: "M3",
    definition: {
      id: "Cabang ilmu yang mempelajari apa yang dilakukan tubuh terhadap zat, mencakup absorpsi, distribusi, metabolisme, dan ekskresi (ADME).",
      en: "The branch of science that studies what the body does to a substance, covering absorption, distribution, metabolism, and excretion (ADME).",
    },
  },
  {
    id: "g-halal",
    term: "Halal",
    termEn: "Halal",
    module: "M6",
    definition: {
      id: "Segala sesuatu yang diizinkan dan tidak dilarang menurut hukum Islam untuk dikonsumsi atau digunakan.",
      en: "Everything that is permitted and not prohibited under Islamic law for consumption or use.",
    },
  },
  {
    id: "g-halal-tayyib",
    term: "Halal-Tayyib",
    termEn: "Halal-Tayyib",
    module: "M6",
    definition: {
      id: "Konsep gabungan dalam Islam yang mensyaratkan sesuatu tidak hanya halal secara hukum, tetapi juga baik, bersih, aman, dan bermanfaat bagi kesehatan.",
      en: "A combined Islamic concept requiring something to be not only legally halal, but also good, clean, safe, and beneficial to health.",
    },
  },
  {
    id: "g-halusinogen",
    term: "Halusinogen",
    termEn: "Hallucinogen",
    module: "M2",
    definition: {
      id: "Golongan zat yang menyebabkan perubahan persepsi, pikiran, dan perasaan yang tidak mencerminkan kenyataan, seperti melihat atau mendengar sesuatu yang tidak ada.",
      en: "A class of substances that cause perceptual, thought, and emotional changes that do not reflect reality, such as seeing or hearing things that aren't there.",
    },
  },
  {
    id: "g-literasi-halal",
    term: "Literasi Halal",
    termEn: "Halal Literacy",
    module: "M6",
    definition: {
      id: "Kemampuan membaca, memahami, dan mengevaluasi produk dari perspektif halal-tayyib, mencakup kemampuan membaca label, mengenali red flags, dan mempertimbangkan mudarat.",
      en: "The ability to read, understand, and evaluate products from a halal-tayyib perspective, including reading labels, recognizing red flags, and weighing potential harm.",
    },
  },
  {
    id: "g-maslahah",
    term: "Maslahah",
    termEn: "Maslahah (Benefit)",
    module: "M6",
    definition: {
      id: "Konsep dalam hukum Islam yang merujuk pada manfaat, kebaikan, atau kepentingan umum yang menjadi dasar pertimbangan dalam pengambilan keputusan.",
      en: "An Islamic legal concept referring to benefit, goodness, or public interest that serves as a basis for decision-making.",
    },
  },
  {
    id: "g-metabolisme",
    term: "Metabolisme",
    termEn: "Metabolism",
    module: "M3",
    definition: {
      id: "Proses kimia penguraian atau transformasi zat di dalam tubuh, terutama oleh enzim hati, mengubah zat aktif menjadi bentuk yang lebih mudah dikeluarkan.",
      en: "The chemical process of breaking down or transforming a substance in the body, primarily by liver enzymes, converting it into a form more easily eliminated.",
    },
  },
  {
    id: "g-mudarat",
    term: "Mudarat",
    termEn: "Mudarat (Harm)",
    module: "M6",
    definition: {
      id: "Bahaya, kerugian, atau dampak negatif yang ditimbulkan oleh suatu tindakan atau konsumsi, menjadi pertimbangan utama dalam prinsip literasi halal.",
      en: "Harm, loss, or negative impact caused by an action or consumption, serving as a key consideration in halal literacy principles.",
    },
  },
  {
    id: "g-neurotransmiter",
    term: "Neurotransmiter",
    termEn: "Neurotransmitter",
    module: "M4",
    definition: {
      id: "Senyawa kimia yang menghantarkan sinyal dari satu sel saraf ke sel saraf lain atau ke sel otot, berperan penting dalam komunikasi antar sel di otak.",
      en: "A chemical compound that transmits signals from one nerve cell to another or to muscle cells, playing a key role in intercellular communication in the brain.",
    },
  },
  {
    id: "g-psikotropika",
    term: "Psikotropika",
    termEn: "Psychotropic",
    module: "M1",
    definition: {
      id: "Zat atau obat yang bekerja pada susunan saraf pusat dan mengubah aktivitas mental, perasaan, atau perilaku, termasuk dalam regulasi khusus di Indonesia.",
      en: "A substance or drug that acts on the central nervous system and alters mental activity, feelings, or behavior, subject to special regulation in Indonesia.",
    },
  },
  {
    id: "g-red-flag",
    term: "Red Flag",
    termEn: "Red Flag",
    module: "M6",
    definition: {
      id: "Tanda peringatan atau indikator risiko pada label atau produk yang menunjukkan potensi bahaya, kandungan berbahaya, atau informasi yang mencurigakan.",
      en: "A warning sign or risk indicator on a label or product suggesting potential danger, harmful content, or suspicious information.",
    },
  },
  {
    id: "g-stimulan",
    term: "Stimulan",
    termEn: "Stimulant",
    module: "M2",
    definition: {
      id: "Golongan zat yang meningkatkan aktivitas sistem saraf pusat, mempercepat proses tubuh dan mental, seperti kafein, nikotin, dan amfetamin.",
      en: "A class of substances that increase central nervous system activity, speeding up body and mental processes. Examples include caffeine, nicotine, and amphetamines.",
    },
  },
  {
    id: "g-sistem-reward",
    term: "Sistem Reward Otak",
    termEn: "Brain Reward System",
    module: "M4",
    definition: {
      id: "Jaringan struktur otak yang memproses pengalaman menyenangkan dan memotivasi perilaku dengan melepaskan dopamin, berperan sentral dalam mekanisme adiksi.",
      en: "A network of brain structures that processes pleasurable experiences and motivates behavior by releasing dopamine, playing a central role in addiction.",
    },
  },
  {
    id: "g-tayyib",
    term: "Tayyib",
    termEn: "Tayyib",
    module: "M6",
    definition: {
      id: "Berarti baik, bersih, aman, dan tidak membahayakan; merupakan syarat tambahan di luar kehalalan dalam memilih produk atau zat untuk dikonsumsi.",
      en: "Means good, clean, safe, and not harmful; an additional requirement beyond halal status when choosing products or substances for consumption.",
    },
  },
  {
    id: "g-toleransi",
    term: "Toleransi",
    termEn: "Tolerance",
    module: "M4",
    definition: {
      id: "Kondisi di mana tubuh menyesuaikan diri terhadap paparan zat berulang sehingga dibutuhkan dosis yang lebih besar untuk menghasilkan efek yang sama.",
      en: "A condition where the body adapts to repeated substance exposure, requiring a larger dose to produce the same effect.",
    },
  },
  {
    id: "g-withdrawal",
    term: "Withdrawal",
    termEn: "Withdrawal",
    module: "M4",
    definition: {
      id: "Kumpulan gejala fisik dan psikologis tidak menyenangkan yang muncul saat penggunaan zat adiktif dikurangi atau dihentikan secara tiba-tiba.",
      en: "A set of unpleasant physical and psychological symptoms that appear when the use of an addictive substance is reduced or abruptly stopped.",
    },
  },
  {
    id: "g-zat-adiktif",
    term: "Zat Adiktif",
    termEn: "Addictive Substance",
    module: "M1",
    definition: {
      id: "Zat yang dapat memengaruhi sistem saraf pusat dan menimbulkan ketergantungan fisik maupun psikologis pada penggunanya.",
      en: "A substance that can affect the central nervous system and cause physical and/or psychological dependence in its users.",
    },
  },
];
