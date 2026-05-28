export const madrasah = {
  intro:
    "Baitul Quran wa Assunnah Madrasah is a residential and day Islamic school in South Jatrabari, Dhaka. Founded in 2021, it preserves the classical Dars-e-Nizami chain while running on a modern operational rhythm — small cohorts, formative assessment, written parent reports, and a campus built around tilawah.",
  introBn:
    "বাইতুল কুরআন ওয়াস সুন্নাহ মাদরাসা — ঢাকার দক্ষিণ যাত্রাবাড়ীতে একটি আবাসিক ও ডে-কেয়ার ইসলামি প্রতিষ্ঠান। ২০২১ সালে প্রতিষ্ঠিত — এটি শাস্ত্রীয় দরসে নিজামি ধারাকে সংরক্ষণ করে আধুনিক ব্যবস্থাপনার সাথে: ছোট দল, নিয়মিত মূল্যায়ন, লিখিত অভিভাবক রিপোর্ট, এবং তিলাওয়াত-কেন্দ্রিক ক্যাম্পাস।",

  mission:
    "To raise ideal, self-reliant, and virtuous generations whose hearts are anchored to the Quran and Sunnah and whose minds are equipped for contemporary responsibility — in the home, the masjid, and the world of work.",
  missionBn:
    "এমন এক প্রজন্ম গড়ে তোলা — যাঁদের হৃদয় কুরআন ও সুন্নাহে দৃঢ়, যাঁদের মন সমকালীন দায়িত্বের জন্য প্রস্তুত — ঘরে, মসজিদে, কর্মক্ষেত্রে।",

  divisions: [
    {
      key: "nurani",
      name: "Nurani",
      nameBn: "নুরানী",
      ages: "Ages 4–7",
      summary:
        "Foundation in Arabic letters, articulation (makhraj), and the earliest stages of Quranic reading. Built around storytelling, songless rhythm, and gentle daily revision.",
      track: [
        "Hurof, makhraj, harakat",
        "Qaida (Noorani)",
        "Short surahs with translation",
        "Akhlaq stories and basic adab",
      ],
    },
    {
      key: "nazera",
      name: "Nazera",
      nameBn: "নাজেরা",
      ages: "Ages 6+",
      summary:
        "Tajwid-correct, fluent Quran recitation from the mushaf. Students read the entire Quran with their teacher at a deliberate pace, building lifetime habit before lifetime fluency.",
      track: [
        "Full tajwid rules",
        "Whole-Quran reading with teacher",
        "Salah-related surah revision",
        "Beginning Bengali, English, math",
      ],
    },
    {
      key: "hifz",
      name: "Hifz",
      nameBn: "হিফয",
      ages: "Ages 7+",
      summary:
        "Full memorization of the 30 ajza' with daily, weekly, and monthly revision routines. Hifz students live on a tilawah-shaped day and are tracked for both retention and character.",
      track: [
        "Sabaq · sabqi · manzil",
        "Tajwid review with mu'allim",
        "Quarterly external mumtahin",
        "Akhlaq and adab evaluation",
      ],
    },
    {
      key: "kitab",
      name: "Kitab",
      nameBn: "কিতাব বিভাগ",
      ages: "Ages 10+",
      summary:
        "Classical Dars-e-Nizami chain — Arabic grammar and morphology, balagha, mantiq, usul al-fiqh, fiqh, hadith, tafsir — read one text, one teacher at a time.",
      track: [
        "Nahw · sarf · balagha",
        "Fiqh and usul al-fiqh",
        "Hadith with isnad introduction",
        "Tafsir of selected suwar",
      ],
    },
  ],

  approach: [
    {
      title: "Small cohorts",
      body:
        "Enrollment is capped per teacher. Tilawah is heard, not just received. Mistakes are corrected the day they appear, not the week.",
    },
    {
      title: "Written parent reports",
      body:
        "Every parent receives a written report on each cycle: sabaq, sabqi, akhlaq notes, parent action items. The home and the madrasah teach the same child.",
    },
    {
      title: "Residential + day options",
      body:
        "Residential program with nutritious meals and structured rest. A day program for families nearby. Friday and evening sessions for students in conventional school.",
    },
    {
      title: "Adab tracking",
      body:
        "Akhlaq, sidq, amanah, and adab are tracked the same way a curriculum is tracked. The institution owns this; it is not left to chance.",
    },
  ],

  facilities: [
    "Residential dormitory with nutritious meals",
    "Library of classical Islamic texts",
    "CCTV-monitored campus and prayer space",
    "On-site mu'allims and resident administrative staff",
    "Monthly hifdh review with external mumtahin",
  ],

  admissions: {
    summary:
      "Admission interviews are held throughout the year as seats open. Parents meet the porichalok, the child is assessed for the appropriate division, and the family agrees to a written parent commitment alongside the student commitment.",
    summaryBn:
      "সারা বছরই আসন খালি হওয়ার সাথে সাথে ভর্তি সাক্ষাৎকার নেওয়া হয়। অভিভাবকেরা পরিচালকের সাথে দেখা করেন, ছাত্রকে যথাযথ বিভাগে মূল্যায়ন করা হয়, এবং অভিভাবক ও ছাত্র উভয়েই লিখিত প্রতিশ্রুতিতে স্বাক্ষর করেন।",
    process: [
      {
        step: "01",
        title: "Initial inquiry",
        body:
          "Reach out by WhatsApp or visit during weekday hours. Bring the student. The first conversation is a meeting, not an exam.",
      },
      {
        step: "02",
        title: "Placement assessment",
        body:
          "A short, unhurried assessment with a mu'allim places the student in Nurani, Nazera, Hifz, or Kitab. We place by readiness, not by age alone.",
      },
      {
        step: "03",
        title: "Parent meeting",
        body:
          "We discuss your child's spiritual goals, learning history, and home rhythm. The parent commitment is read together and signed.",
      },
      {
        step: "04",
        title: "Enrollment",
        body:
          "Books, uniform, and residential intake (if applicable). The first thirty days are an orientation period with daily light-touch feedback.",
      },
    ],
  },
} as const;
