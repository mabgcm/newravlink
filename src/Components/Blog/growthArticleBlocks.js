const imageRoot = "/assets/images/";

const sections = {
  en: [
    "Organic search and modern SEO",
    "Website performance, UX, and conversion optimization",
    "Content marketing and topical authority",
    "Measurement, attribution, KPIs, and ROI",
    "A practical 90‑day growth roadmap",
  ],
  tr: [
    "Organik arama ve modern SEO",
    "Web sitesi performansı, kullanıcı deneyimi ve dönüşüm optimizasyonu",
    "İçerik pazarlaması ve konu otoritesi",
    "Ölçüm, atıf, KPI'lar ve ROI",
    "Pratik bir 90 günlük büyüme yol haritası",
  ],
};

const photos = [
  ["blog-digital-growth-strategy", 801,
    "Digital marketing team reviewing business growth strategies and performance charts",
    "Dijital pazarlama ekibi büyüme stratejilerini ve performans grafiklerini inceliyor",
    "Connect acquisition, conversion, and business economics.",
    "Müşteri kazanımını, dönüşümü ve işletme ekonomisini birlikte planlayın."],
  ["blog-seo-analytics-dashboard", 675,
    "Digital marketing analytics dashboard used to measure SEO and search performance",
    "SEO ve arama performansını ölçmek için kullanılan dijital pazarlama analitik paneli",
    "Use search and engagement data to guide your SEO priorities.",
    "SEO önceliklerini arama ve etkileşim verilerine göre belirleyin."],
  ["blog-ux-conversion-review", 675,
    "Business team reviewing digital customer experience across devices",
    "İş ekibi farklı cihazlarda dijital müşteri deneyimini inceliyor",
    "Make the next step clear on every device.",
    "Her cihazda sonraki adımı netleştirin."],
  ["blog-content-social-analytics", 657,
    "Social media analytics dashboard displaying digital marketing performance",
    "Dijital pazarlama performansını gösteren sosyal medya analitik paneli",
    "Build useful content, then learn from audience engagement.",
    "Faydalı içerikler üretin ve kitlenizin etkileşiminden öğrenin."],
  ["blog-marketing-roi-analytics", 800,
    "Laptop displaying an ecommerce tracking website in a shared workspace",
    "Ortak çalışma alanında e-ticaret takip web sitesini gösteren dizüstü bilgisayar",
    "Connect tracking to business outcomes when evaluating marketing ROI.",
    "Pazarlama ROI'sini değerlendirirken takibi işletme sonuçlarıyla ilişkilendirin."],
  ["blog-90-day-growth-roadmap", 1800,
    "Marketing strategy planning session using a whiteboard and project notes",
    "Beyaz tahta ve proje notlarıyla pazarlama stratejisi planlama oturumu",
    "Turn your priorities into a focused 90-day implementation plan.",
    "Önceliklerinizi odaklı bir 90 günlük uygulama planına dönüştürün."],
];

function figure(index, language) {
  const [filename, height, altEn, altTr, captionEn, captionTr] = photos[index];
  const portrait = height > 1200;
  return {
    type: "figure",
    src: `${imageRoot}${filename}.webp`,
    srcSet: `${imageRoot}${filename}-600.webp 600w, ${imageRoot}${filename}.webp 1200w`,
    sizes: portrait
      ? "(max-width: 600px) calc(100vw - 48px), 347px"
      : "(max-width: 767px) calc(100vw - 48px), (max-width: 991px) 680px, 760px",
    width: 1200,
    height,
    portrait,
    alt: language === "tr" ? altTr : altEn,
    caption: language === "tr" ? captionTr : captionEn,
  };
}

function comparison(language) {
  const isTurkish = language === "tr";
  const rows = isTurkish ? [
    ["SEO", "Arama niyetine uygun görünürlük", "Uzun vadeli, sürekli", "Organik kaynaklı kaliteli lead'ler"],
    ["Ücretli reklamlar", "Teklifleri test etmek ve müşteri kazanmak", "Daha hızlı geri bildirim, sürekli test", "Kaliteli lead'ler ve kazanılan gelir"],
    ["İçerik pazarlaması", "Güven ve konu otoritesi oluşturmak", "Zamanla büyüyen içerik kütüphanesi", "İçerik kaynaklı lead'ler ve aksiyonlar"],
    ["E-posta pazarlaması", "Lead'leri geliştirmek ve müşterileri elde tutmak", "Sürekli takip", "CRM'de lead ilerlemesi ve kazanılan işler"],
    ["Dönüşüm optimizasyonu", "Mevcut ziyaretçilerin aksiyon almasını kolaylaştırmak", "Sürekli iyileştirme", "Öncelikli sayfaların dönüşüm oranı"],
  ] : [
    ["SEO", "Visibility aligned with search intent", "Long-term, ongoing", "Qualified leads from organic search"],
    ["Paid advertising", "Test offers and acquire customers", "Faster feedback, continued testing", "Qualified leads and closed revenue"],
    ["Content marketing", "Build trust and topical authority", "An expanding library over time", "Content-driven leads and key actions"],
    ["Email marketing", "Nurture leads and retain customers", "Ongoing follow-up", "Lead progression and won deals in the CRM"],
    ["Conversion optimization", "Help existing visitors take action", "Continuous improvement", "Conversion rates on priority pages"],
  ];
  return {
    type: "comparison-table",
    caption: isTurkish ? "Büyüme kanallarına genel bakış" : "Growth channels at a glance",
    columns: isTurkish
      ? ["Strateji", "Ana amaç", "Zaman yaklaşımı", "Ölçüm KPI'ı"]
      : ["Strategy", "Primary objective", "Typical time horizon", "Measurement KPI"],
    rows: rows.map(([strategy, objective, horizon, kpi]) => ({ strategy, objective, horizon, kpi })),
  };
}

// Enrich only the 2027 article. Original paragraphs and roadmap recommendations
// are moved into styled blocks without rewriting or duplicating their wording.
export function enhanceGrowthArticleBlocks(blocks, language) {
  const locale = language?.startsWith("tr") ? "tr" : "en";
  const headings = sections[locale];
  const result = [];
  let section = "";
  const takeawaySections = [headings[1], headings[3]];
  const phases = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (block.type === "h2") {
      if (block.text === headings[0]) result.push(figure(0, locale));
      if (block.text === headings[3]) result.push(comparison(locale));
      section = block.text;
    }

    if (section === headings[4] && block.type === "h3" && blocks[index + 1]?.type === "ul") {
      phases.push({ title: block.text, items: blocks[index + 1].items });
      index += 1;
      if (phases.length === 3) result.push({ type: "roadmap-grid", phases });
      continue;
    }

    const lastInSection = block.type === "p" && blocks[index + 1]?.type === "h2";
    const introductionTakeaway = block.type === "ul" && block.items[0]?.startsWith(
      locale === "tr" ? "Öngörülebilir müşteri kazanımı:" : "Predictable acquisition:",
    );
    if (introductionTakeaway || (lastInSection && takeawaySections.includes(section))) {
      result.push({ ...block, type: "takeaway", title: locale === "tr" ? "Temel çıkarım" : "Key takeaway" });
    } else {
      result.push({ ...block, headingTag: block.type === "h2" ? "h2" : block.type === "h3" ? "h3" : undefined });
    }

    // Each section's first paragraph explains the topic before its photograph.
    if (block.type === "p" && blocks[index - 1]?.type === "h2") {
      const photoIndex = headings.indexOf(section);
      if (photoIndex >= 0) result.push(figure(photoIndex + 1, locale));
    }
  }
  return result;
}
