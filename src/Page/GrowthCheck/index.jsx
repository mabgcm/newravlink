import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLanguage, useLangPath } from "../../Components/Context/LanguageContext";
import "./growth-check.css";

const copy = {
  en: {
    metaTitle: "Free Small Business Growth Check | Rav Link Inc.",
    metaDescription: "Answer 9 quick questions and discover the marketing priority holding your business back.",
    eyebrow: "Free 3-minute assessment",
    title: "What is actually holding back your marketing?",
    intro: "Answer a few practical questions. We’ll identify the one area your business should prioritize before spending more on marketing.",
    trust: ["No sales call required", "Instant first diagnosis", "Built for small businesses"],
    start: "Start my Growth Check",
    back: "Back",
    next: "Next",
    resultButton: "See my result",
    question: "Question",
    of: "of",
    choose: "Choose one answer to continue.",
    resultEyebrow: "Your initial assessment",
    basedOn: "Based on your answers",
    why: "What your answers indicate",
    firstMove: "Your first move",
    avoid: "Avoid for now",
    restart: "Retake the check",
    paidEyebrow: "Want a human review?",
    paidTitle: "Turn this diagnosis into a clear action plan.",
    paidBody: "Rav Link will review your website, Google presence and customer journey, then meet with you for 20 minutes to clarify your first three actions.",
    paidItems: ["Expert review of your online presence", "Your top 3 priorities in order", "20-minute one-to-one review", "$29 credited if you continue with Rav Link"],
    price: "$29 CAD",
    priceNote: "one-time",
    cta: "Request my detailed Growth Check",
    ctaNote: "We’ll confirm the review and payment details before booking.",
  },
  tr: {
    metaTitle: "Ücretsiz Küçük İşletme Büyüme Analizi | Rav Link Inc.",
    metaDescription: "9 kısa soruyu yanıtlayın ve işletmenizin pazarlamadaki gerçek önceliğini öğrenin.",
    eyebrow: "Ücretsiz 3 dakikalık analiz",
    title: "Pazarlamanızın büyümesini gerçekten ne engelliyor?",
    intro: "Birkaç pratik soruyu yanıtlayın. Pazarlamaya daha fazla para harcamadan önce işletmenizin odaklanması gereken alanı belirleyelim.",
    trust: ["Satış görüşmesi zorunlu değil", "Anında ilk teşhis", "Küçük işletmeler için hazırlandı"],
    start: "Büyüme analizimi başlat",
    back: "Geri",
    next: "İleri",
    resultButton: "Sonucumu gör",
    question: "Soru",
    of: "/",
    choose: "Devam etmek için bir cevap seçin.",
    resultEyebrow: "İlk teşhisiniz",
    basedOn: "Cevaplarınıza göre",
    why: "Cevaplarınız ne gösteriyor?",
    firstMove: "İlk adımınız",
    avoid: "Şimdilik kaçının",
    restart: "Analizi tekrar yap",
    paidEyebrow: "Uzman değerlendirmesi ister misiniz?",
    paidTitle: "Bu teşhisi net bir aksiyon planına dönüştürün.",
    paidBody: "Rav Link web sitenizi, Google görünürlüğünüzü ve müşteri yolculuğunuzu inceler; ardından ilk üç adımınızı netleştirmek için sizinle 20 dakika görüşür.",
    paidItems: ["Dijital varlığınızın uzman tarafından incelenmesi", "Öncelik sırasına göre ilk 3 adım", "20 dakikalık birebir değerlendirme", "Rav Link ile devam ederseniz 29 CAD hizmetten düşülür"],
    price: "29 CAD",
    priceNote: "tek seferlik",
    cta: "Detaylı Growth Check talep et",
    ctaNote: "Randevudan önce değerlendirme ve ödeme detaylarını teyit edeceğiz.",
  },
};

const questions = {
  en: [
    ["goal", "What result matters most in the next 90 days?", ["More calls or messages", "More quote or appointment requests", "Better-quality customers", "Convert more existing enquiries"]],
    ["source", "Where do most new customers come from today?", ["Referrals", "Google Search or Maps", "Social media", "Paid ads", "There is no consistent source", "We do not track it"]],
    ["google", "How visible are you when people search for your service locally?", ["We appear near the top", "We appear sometimes", "We have a profile but it is weak", "We do not have a Google Business Profile", "I have never checked"]],
    ["presence", "What does a potential customer find when they research you?", ["A current, professional website", "An old or basic website", "Only social media or a Google profile", "Very little current information"]],
    ["conversion", "How clearly can visitors take the next step?", ["We get consistent calls or forms", "There is a call-to-action but few respond", "Contact details exist but the path is unclear", "There is no clear next step"]],
    ["followup", "What happens after a new enquiry arrives?", ["We respond quickly and follow up", "We reply but follow-up is inconsistent", "Some enquiries get missed", "Most enquiries are low quality", "We do not get enough enquiries"]],
    ["tracking", "How well can you tell which marketing creates customers?", ["We track leads and sales by source", "We track some results", "We only look at sales", "We do not track it"]],
    ["capacity", "How much new-customer capacity do you have?", ["We can take on more now", "We have limited capacity", "We only want specific customers", "We are currently full"]],
    ["budget", "What is a realistic monthly marketing investment for the next 3 months?", ["No budget right now", "Under $500", "$500–$1,500", "$1,500–$3,000", "Over $3,000", "I need to know what is needed first"]],
  ],
  tr: [
    ["goal", "Önümüzdeki 90 günde hangi sonuç sizin için daha önemli?", ["Daha fazla telefon veya mesaj", "Daha fazla teklif ya da randevu talebi", "Daha nitelikli müşteriler", "Mevcut talepleri daha iyi satışa dönüştürmek"]],
    ["source", "Yeni müşterileriniz bugün çoğunlukla nereden geliyor?", ["Tavsiye ve çevre", "Google araması veya Google Maps", "Sosyal medya", "Ücretli reklamlar", "Düzenli bir kaynak yok", "Takip etmiyoruz"]],
    ["google", "Hizmetiniz bölgenizde arandığında ne kadar görünürsünüz?", ["İlk sonuçlarda çıkıyoruz", "Bazen görünüyoruz", "Profilimiz var ama zayıf", "Google Business profilimiz yok", "Hiç kontrol etmedim"]],
    ["presence", "Potansiyel müşteri sizi araştırdığında ne buluyor?", ["Güncel ve profesyonel bir web sitesi", "Eski veya basit bir web sitesi", "Yalnızca sosyal medya ya da Google profili", "Çok az güncel bilgi"]],
    ["conversion", "Ziyaretçiler bir sonraki adımı ne kadar kolay atabiliyor?", ["Düzenli telefon veya form talebi alıyoruz", "Yönlendirme var ama az kişi dönüş yapıyor", "İletişim bilgileri var fakat yol net değil", "Net bir sonraki adım yok"]],
    ["followup", "Yeni bir talep geldiğinde sonrasında ne oluyor?", ["Hızlı yanıtlıyor ve takip ediyoruz", "Yanıtlıyoruz ama takip düzensiz", "Bazı talepler kaçıyor", "Taleplerin çoğu düşük kaliteli", "Yeterince talep gelmiyor"]],
    ["tracking", "Hangi pazarlama kanalının müşteri getirdiğini ne kadar iyi biliyorsunuz?", ["Kaynak bazında müşteri talebi ve satış takibi yapıyoruz", "Bazı sonuçları takip ediyoruz", "Yalnızca satışlara bakıyoruz", "Takip etmiyoruz"]],
    ["capacity", "Yeni müşteri kapasiteniz nedir?", ["Hemen daha fazla müşteri alabiliriz", "Sınırlı kapasitemiz var", "Yalnızca belirli müşterileri istiyoruz", "Şu anda kapasitemiz dolu"]],
    ["budget", "Önümüzdeki 3 ay için gerçekçi aylık pazarlama yatırımınız nedir?", ["Şu anda bütçe yok", "500 CAD altı", "500–1.500 CAD", "1.500–3.000 CAD", "3.000 CAD üzeri", "Önce ne gerektiğini öğrenmeliyim"]],
  ],
};

const diagnoses = {
  visibility: {
    en: { title: "Your priority is Google visibility", body: "You have room for new customers, but your business is not consistently visible when local buyers are actively searching.", reasons: ["Your customer flow depends too heavily on referrals or is inconsistent.", "Your Google presence is missing, weak or unverified.", "You have capacity to serve more customers."], move: "Strengthen your Google Business Profile, reviews and local service visibility.", avoid: "Increasing ad spend before your local foundation is measurable." },
    tr: { title: "Önceliğiniz Google görünürlüğü", body: "Yeni müşterilere yeriniz var ancak işletmeniz, yerel müşteriler hizmetinizi aktif olarak ararken düzenli biçimde görünmüyor.", reasons: ["Müşteri akışınız tavsiyelere fazla bağlı veya düzensiz.", "Google varlığınız eksik, zayıf ya da kontrol edilmemiş.", "Daha fazla müşteriye hizmet verecek kapasiteniz var."], move: "Google Business profilinizi, yorumlarınızı ve yerel hizmet görünürlüğünüzü güçlendirin.", avoid: "Yerel temeliniz ölçülebilir hale gelmeden reklam bütçesini artırmak." },
  },
  foundation: {
    en: { title: "Build trust before buying traffic", body: "Potential customers cannot quickly find enough proof, clarity or a professional path to choose your business.", reasons: ["Your website or online presence is incomplete.", "The next step is unclear to visitors.", "Paid traffic would arrive before the trust foundation is ready."], move: "Clarify your offer, proof and contact path on a focused website.", avoid: "Paying for more visitors before the experience can convert them." },
    tr: { title: "Trafik satın almadan önce güven oluşturun", body: "Potansiyel müşteriler işletmenizi seçmek için yeterli güven unsurunu, netliği veya profesyonel yönlendirmeyi hızla bulamıyor.", reasons: ["Web siteniz veya dijital varlığınız eksik.", "Ziyaretçiler için sonraki adım net değil.", "Ücretli trafik, güven altyapısı hazır olmadan gelecektir."], move: "Hizmetinizi, güven unsurlarınızı ve iletişim yolunu odaklı bir web sitesinde netleştirin.", avoid: "Dönüşüm sağlayamayan bir deneyime daha fazla ziyaretçi yönlendirmek." },
  },
  conversion: {
    en: { title: "Your priority is conversion", body: "People can find you, but too few take the next step. The immediate opportunity is improving the journey from interest to enquiry.", reasons: ["Your visibility is stronger than your enquiry flow.", "Calls-to-action or follow-up are inconsistent.", "More traffic would amplify the same leak."], move: "Simplify the quote, booking or call path and track every enquiry.", avoid: "Treating traffic volume as the main problem." },
    tr: { title: "Önceliğiniz dönüşüm sistemi", body: "İnsanlar sizi bulabiliyor ancak çok azı sonraki adımı atıyor. İlk fırsat, ilgiyi talebe dönüştüren yolu iyileştirmek.", reasons: ["Görünürlüğünüz talep akışınızdan daha güçlü.", "Yönlendirme veya takip süreci düzensiz.", "Daha fazla trafik aynı kaybı büyütür."], move: "Teklif, randevu veya arama yolunu basitleştirin ve her talebi takip edin.", avoid: "Ana sorunun yalnızca trafik miktarı olduğunu düşünmek." },
  },
  quality: {
    en: { title: "You need better leads, not more leads", body: "Your constraint is lead quality or capacity. Increasing volume now could create more noise instead of profitable growth.", reasons: ["You only want certain customers or capacity is limited.", "Current enquiries are often a poor fit.", "Qualification needs to happen before the sales conversation."], move: "Tighten your positioning, qualification questions and service expectations.", avoid: "Launching broad campaigns optimized only for lead volume." },
    tr: { title: "Daha fazla değil, daha nitelikli talep gerekiyor", body: "Darboğazınız müşteri talebinin kalitesi veya mevcut kapasiteniz. Şimdi hacmi artırmak, kârlı büyüme yerine daha fazla karmaşa yaratabilir.", reasons: ["Yalnızca belirli müşterileri istiyor veya sınırlı kapasiteyle çalışıyorsunuz.", "Mevcut talepler çoğu zaman işletmenize uygun değil.", "Müşteri elemesi satış görüşmesinden önce yapılmalı."], move: "Konumlandırmanızı, eleme sorularınızı ve hizmet beklentilerini netleştirin.", avoid: "Yalnızca talep sayısına odaklanan geniş reklam kampanyaları." },
  },
  tracking: {
    en: { title: "Measure before you scale", body: "You may already have useful marketing activity, but you cannot confidently see which source creates real customers.", reasons: ["Lead sources are not tracked consistently.", "Marketing decisions rely on impressions rather than outcomes.", "More spend would increase uncertainty."], move: "Connect calls, forms and sales to their original marketing source.", avoid: "Scaling a channel before knowing its customer acquisition result." },
    tr: { title: "Büyütmeden önce ölçün", body: "Faydalı pazarlama çalışmalarınız olabilir ancak hangi kaynağın gerçek müşteri oluşturduğunu güvenle göremiyorsunuz.", reasons: ["Müşteri talebi kaynakları düzenli takip edilmiyor.", "Kararlar sonuçlardan çok tahminlere dayanıyor.", "Daha fazla harcama belirsizliği artırır."], move: "Telefon, form ve satışları geldikleri pazarlama kaynağıyla eşleştirin.", avoid: "Müşteri kazanma sonucunu bilmeden bir kanalı büyütmek." },
  },
};

function getDiagnosis(a) {
  if (a.capacity >= 2 || a.followup === 3) return "quality";
  if (a.presence >= 1 && a.conversion >= 1) return "foundation";
  if (a.tracking >= 2 && (a.source === 3 || a.source >= 4)) return "tracking";
  if (a.google >= 2 && a.capacity <= 1) return "visibility";
  if (a.conversion >= 1 || a.followup === 1 || a.followup === 2) return "conversion";
  if (a.tracking >= 2) return "tracking";
  return "visibility";
}

export default function GrowthCheckPage() {
  const { language } = useLanguage();
  const langPath = useLangPath();
  const c = copy[language];
  const q = questions[language];
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(false);
  const result = useMemo(() => diagnoses[getDiagnosis(answers)][language], [answers, language]);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: language === "tr" ? "Rav Link Büyüme Analizi" : "Rav Link Growth Check",
    url: `https://ravlink.ca${langPath("/growth-check")}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: language,
    description: c.metaDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CAD",
    },
    provider: {
      "@type": "Organization",
      name: "Rav Link Inc.",
      url: "https://ravlink.ca",
    },
  };

  const select = (value) => {
    setAnswers((prev) => ({ ...prev, [q[index][0]]: value }));
    setError(false);
  };

  const advance = () => {
    if (answers[q[index][0]] === undefined) return setError(true);
    if (index === q.length - 1) {
      setComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else setIndex((value) => value + 1);
  };

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setComplete(false);
    setStarted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const preserveGrowthCheck = () => {
    sessionStorage.setItem(
      "ravlinkGrowthCheck",
      JSON.stringify({
        language,
        diagnosis: getDiagnosis(answers),
        answers,
      }),
    );
  };

  return (
    <>
      <Helmet>
        <title>{c.metaTitle}</title>
        <meta name="description" content={c.metaDescription} />
        <link rel="canonical" href={`https://ravlink.ca${langPath("/growth-check")}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <main className="growth-check-page">
        {!started ? (
          <section className="growth-check-hero">
            <div className="growth-check-orb growth-check-orb-one" />
            <div className="growth-check-orb growth-check-orb-two" />
            <div className="hero-container growth-check-hero-inner">
              <div className="growth-check-kicker"><i className="fa-regular fa-circle-dot" /> {c.eyebrow}</div>
              <h1>{c.title}</h1>
              <p>{c.intro}</p>
              <button className="btn btn-accent growth-check-start" onClick={() => setStarted(true)}>
                <span className="btn-title">{c.start}</span>
                <span className="icon-circle"><i className="fa-solid fa-arrow-right" /></span>
              </button>
              <div className="growth-check-trust">
                {c.trust.map((item) => <span key={item}><i className="fa-solid fa-check" /> {item}</span>)}
              </div>
            </div>
          </section>
        ) : !complete ? (
          <section className="growth-check-quiz">
            <div className="hero-container growth-check-quiz-inner">
              <div className="growth-check-progress-copy"><span>{c.question} {index + 1} {c.of} {q.length}</span><span>{Math.round(((index + 1) / q.length) * 100)}%</span></div>
              <div className="growth-check-progress"><span style={{ width: `${((index + 1) / q.length) * 100}%` }} /></div>
              <div className="growth-check-card">
                <p className="growth-check-question-number">{String(index + 1).padStart(2, "0")}</p>
                <h2>{q[index][1]}</h2>
                <div className="growth-check-options">
                  {q[index][2].map((option, optionIndex) => (
                    <button key={option} type="button" className={answers[q[index][0]] === optionIndex ? "is-selected" : ""} onClick={() => select(optionIndex)}>
                      {option}<i className="fa-solid fa-check" />
                    </button>
                  ))}
                </div>
                {error && <p className="growth-check-error">{c.choose}</p>}
                <div className="growth-check-actions">
                  <button className="growth-check-back" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}>{c.back}</button>
                  <button className="btn btn-accent" onClick={advance}><span className="btn-title">{index === q.length - 1 ? c.resultButton : c.next}</span></button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="growth-check-results">
            <div className="hero-container">
              <div className="growth-check-result-grid">
                <article className="growth-check-result-card">
                  <div className="growth-check-kicker"><i className="fa-solid fa-chart-line" /> {c.resultEyebrow}</div>
                  <p className="growth-check-based">{c.basedOn}</p>
                  <h1>{result.title}</h1>
                  <p className="growth-check-result-body">{result.body}</p>
                  <div className="growth-check-insight">
                    <h3>{c.why}</h3>
                    <ul>{result.reasons.map((reason) => <li key={reason}><i className="fa-solid fa-check" />{reason}</li>)}</ul>
                  </div>
                  <div className="growth-check-guidance">
                    <div><span>{c.firstMove}</span><p>{result.move}</p></div>
                    <div className="is-avoid"><span>{c.avoid}</span><p>{result.avoid}</p></div>
                  </div>
                  <button className="growth-check-restart" onClick={restart}><i className="fa-solid fa-rotate-left" /> {c.restart}</button>
                </article>
                <aside className="growth-check-offer">
                  <div className="growth-check-kicker"><i className="fa-regular fa-circle-dot" /> {c.paidEyebrow}</div>
                  <h2>{c.paidTitle}</h2>
                  <p>{c.paidBody}</p>
                  <ul>{c.paidItems.map((item) => <li key={item}><i className="fa-solid fa-check" />{item}</li>)}</ul>
                  <div className="growth-check-price"><strong>{c.price}</strong><span>{c.priceNote}</span></div>
                  <Link className="btn btn-accent" onClick={preserveGrowthCheck} to={`${langPath("/contact")}?growthCheck=${getDiagnosis(answers)}`}>
                    <span className="btn-title">{c.cta}</span>
                    <span className="icon-circle"><i className="fa-solid fa-arrow-right" /></span>
                  </Link>
                  <small>{c.ctaNote}</small>
                </aside>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
