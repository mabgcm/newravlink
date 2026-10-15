import React, { useMemo, useState } from "react";
import {
  CONTRACT_TITLE,
  CONTRACT_SUBTITLE,
  CONTRACT_SECTIONS,
  CONTRACT_TITLE_TR,
  CONTRACT_SUBTITLE_TR,
  CONTRACT_SECTIONS_TR,
  SELECTION_CATALOG,
} from "../../../api/_lib/ivory-brite-contract.js";

const ACCENT = "#5b2dff";
const INK = "#17151b";
const MUTED = "#6b6873";

const page = { fontFamily: "Arial,Helvetica,sans-serif", background: "#f5f4f8", minHeight: "100vh", padding: "28px 12px" };
const wrap = { maxWidth: 760, margin: "0 auto" };
const card = { background: "#fff", border: "1px solid #e8e6ed", borderRadius: 16, padding: 24, marginBottom: 16 };
const h2 = { margin: "0 0 6px", fontSize: 20, color: INK };
const sub = { margin: "0 0 16px", fontSize: 14, color: MUTED, lineHeight: 1.55 };
const optRow = (active) => ({
  display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 16px",
  border: `2px solid ${active ? ACCENT : "#e8e6ed"}`, borderRadius: 12, marginBottom: 10,
  cursor: "pointer", background: active ? "#f7f4ff" : "#fff",
});
const pkgGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 };
const input = { width: "100%", boxSizing: "border-box", padding: "10px 12px", fontSize: 14, border: "1px solid #d9d6e2", borderRadius: 8, marginBottom: 10 };
const money = (n) => `$${Number(n).toLocaleString("en-CA")}`;

const STR = {
  en: {
    kicker: "Rav Link Inc. · Proposal",
    heroTitle: "Digital Marketing Proposal",
    heroSub: "Prepared for Ivory Brite · Choose a package or build your own, then accept and send.",
    s1: "1. How would you like to choose?",
    pickPackage: "Pick a package",
    pickPackageSub: "Launch, Growth or Scale — bundled pricing, better value.",
    buildOwn: "Build your own (itemized)",
    buildOwnSub: "Select individual setup and monthly services.",
    s2pkg: "2. Select a package",
    s2pkgSub: "Each package includes the Website Build at the package price shown.",
    s2item: "2. Select services",
    setupH: "One-time setup",
    monthlyH: "Monthly",
    websiteNote: "Website Build is included automatically — $800.",
    website: "Website",
    free: "Free",
    s3addon: "3. Optional add-on",
    socialTitle: "Social Media management",
    socialPrice: "setup $500 + $440/mo",
    socialSub: "Not included in packages; billed at list price.",
    yourSelection: "Your selection",
    nothing: "Nothing selected yet.",
    oneTimeTotal: "One-time total",
    monthlyTotal: "Monthly total",
    pricesNote: "Prices in CAD, HST extra. Ad spend is paid directly by you to the platforms. Payment by Interac e-transfer to info@ravlink.ca.",
    yourDetails: "Your details",
    namePh: "Full name",
    emailPh: "Email address",
    businessPh: "Business name",
    readFull: (t) => `Read the full ${t} (click to expand)`,
    accept: (t) => <>I have read the {t} between Rav Link Inc. and Ivory Brite above. By ticking this box and clicking <strong>Send Selection</strong>, I accept the agreement in full on behalf of Ivory Brite.</>,
    sendBtn: "Send Selection",
    sending: "Sending…",
    tickNote: "Please tick the acceptance box above to enable sending.",
    doneTitle: "Selection received",
    doneText: (name, title) => `Thank you, ${name}. Your selection (${title}) and acceptance of the agreement have been emailed to you and to Rav Link Inc.`,
    errGeneric: "Something went wrong. Please try again.",
    errConn: "Could not reach the server. Please check your connection and try again.",
    errName: "Name is required.",
    errEmail: "A valid email address is required.",
    errEmpty: "Please select at least one service.",
    pkgSetup: (n) => `${n} setup`,
    pkgMonthly: (n) => `${n} monthly`,
    itemizedTitle: "Itemized selection",
    pkgTitle: (n) => `${n} package`,
    setupSuffix: "(setup)",
    monthlySuffix: "(monthly)",
    socialSetupAddon: "Social Media setup (add-on)",
    socialMonthlyAddon: "Social Media management (add-on)",
    websiteBuild: "Website Build",
  },
  tr: {
    kicker: "Rav Link Inc. · Teklif",
    heroTitle: "Dijital Pazarlama Teklifi",
    heroSub: "Ivory Brite için hazırlandı · Bir paket seçin veya kendiniz oluşturun, ardından onaylayıp gönderin.",
    s1: "1. Nasıl seçim yapmak istersiniz?",
    pickPackage: "Paket seçin",
    pickPackageSub: "Launch, Growth veya Scale — paket fiyatlandırması, daha avantajlı.",
    buildOwn: "Kendiniz oluşturun (kalem kalem)",
    buildOwnSub: "Kurulum ve aylık hizmetleri tek tek seçin.",
    s2pkg: "2. Paket seçin",
    s2pkgSub: "Her pakete, gösterilen paket fiyatıyla Web Sitesi Yapımı dahildir.",
    s2item: "2. Hizmetleri seçin",
    setupH: "Tek seferlik kurulum",
    monthlyH: "Aylık",
    websiteNote: "Web Sitesi Yapımı otomatik olarak dahildir — $800.",
    website: "Web sitesi",
    free: "Ücretsiz",
    s3addon: "3. Opsiyonel ek hizmet",
    socialTitle: "Sosyal Medya yönetimi",
    socialPrice: "kurulum $500 + $440/ay",
    socialSub: "Paketlere dahil değildir; liste fiyatından ücretlendirilir.",
    yourSelection: "Seçiminiz",
    nothing: "Henüz seçim yapılmadı.",
    oneTimeTotal: "Tek seferlik toplam",
    monthlyTotal: "Aylık toplam",
    pricesNote: "Fiyatlar CAD cinsindendir, HST hariçtir. Reklam harcaması platformlara doğrudan sizin tarafınızdan ödenir. Ödeme: info@ravlink.ca adresine Interac e-transfer.",
    yourDetails: "Bilgileriniz",
    namePh: "Ad Soyad",
    emailPh: "E-posta adresi",
    businessPh: "İşletme adı",
    readFull: (t) => `${t} sözleşmesinin tamamını okuyun (genişletmek için tıklayın)`,
    accept: (t) => <>Yukarıdaki Rav Link Inc. ile Ivory Brite arasındaki {t} sözleşmesini okudum. Bu kutuyu işaretleyip <strong>Seçimi Gönder</strong> düğmesine tıklayarak sözleşmeyi Ivory Brite adına bütünüyle kabul ediyorum.</>,
    sendBtn: "Seçimi Gönder",
    sending: "Gönderiliyor…",
    tickNote: "Gönderimi etkinleştirmek için lütfen yukarıdaki onay kutusunu işaretleyin.",
    doneTitle: "Seçiminiz alındı",
    doneText: (name, title) => `Teşekkürler, ${name}. Seçiminiz (${title}) ve sözleşme onayınız size ve Rav Link Inc.'e e-postayla gönderildi.`,
    errGeneric: "Bir hata oluştu. Lütfen tekrar deneyin.",
    errConn: "Sunucuya ulaşılamadı. Bağlantınızı kontrol edip tekrar deneyin.",
    errName: "Ad Soyad gereklidir.",
    errEmail: "Geçerli bir e-posta adresi gereklidir.",
    errEmpty: "Lütfen en az bir hizmet seçin.",
    pkgSetup: (n) => `${n} — tek seferlik kurulum`,
    pkgMonthly: (n) => `${n} — aylık`,
    itemizedTitle: "Kalem kalem seçim",
    pkgTitle: (n) => `${n} paketi`,
    setupSuffix: "(kurulum)",
    monthlySuffix: "(aylık)",
    socialSetupAddon: "Sosyal Medya kurulumu (ek hizmet)",
    socialMonthlyAddon: "Sosyal Medya yönetimi (ek hizmet)",
    websiteBuild: "Web Sitesi Yapımı",
  },
};

const tooltipCss = `
.info-i { position: relative; display: inline-flex; vertical-align: middle; }
.info-i .info-dot {
  display: inline-flex; align-items: center; justify-content: center;
  width: 17px; height: 17px; border-radius: 50%;
  background: #ece9fb; color: #5b2dff; font-size: 11px; font-weight: 700;
  cursor: help; font-style: normal; line-height: 1;
}
.info-i .info-bubble {
  visibility: hidden; opacity: 0; transition: opacity .15s;
  position: absolute; z-index: 50; bottom: 135%; left: 50%; transform: translateX(-50%);
  width: 230px; background: #17151b; color: #fff;
  font-size: 12px; line-height: 1.55; font-weight: 400; text-align: left;
  padding: 9px 12px; border-radius: 8px; pointer-events: none;
  box-shadow: 0 8px 24px rgba(0,0,0,.18); white-space: normal;
}
.info-i:hover .info-bubble, .info-i:focus-within .info-bubble { visibility: visible; opacity: 1; }
`;

function Info({ text }) {
  if (!text) return null;
  return (
    <span className="info-i" style={{ marginLeft: 7 }} tabIndex={0}>
      <span className="info-dot" title={text}>i</span>
      <span className="info-bubble">{text}</span>
    </span>
  );
}

function totalsFor(state, lang) {
  const S = STR[lang];
  const L = (item) => (lang === "tr" ? item.labelTr || item.label : item.label);
  let setup = 0;
  let monthly = 0;
  const lines = [];
  if (state.mode === "package") {
    const pkg = SELECTION_CATALOG.packages.find((p) => p.id === state.packageId);
    if (!pkg) return { setup, monthly, lines, title: "" };
    lines.push(`${S.pkgSetup(pkg.name)} — ${money(pkg.setupPrice)}`);
    lines.push(`${S.pkgMonthly(pkg.name)} — ${money(pkg.monthlyPrice)}/mo`);
    setup += pkg.setupPrice;
    monthly += pkg.monthlyPrice;
    const web = SELECTION_CATALOG.website.find((w) => w.id === pkg.websiteId);
    lines.push(`${S.websiteBuild} — ${web.price === 0 ? S.free : money(web.price)}`);
    setup += web.price;
    if (state.socialAddon) {
      lines.push(`${S.socialSetupAddon} — $500`);
      lines.push(`${S.socialMonthlyAddon} — $440/mo`);
      setup += 500;
      monthly += 440;
    }
    return { setup, monthly, lines, title: S.pkgTitle(pkg.name) };
  }
  for (const id of state.setupIds) {
    const item = SELECTION_CATALOG.setup.find((i) => i.id === id);
    if (item) { lines.push(`${L(item)} ${S.setupSuffix} — ${money(item.price)}`); setup += item.price; }
  }
  for (const id of state.monthlyIds) {
    const item = SELECTION_CATALOG.monthly.find((i) => i.id === id);
    if (item) { lines.push(`${L(item)} ${S.monthlySuffix} — ${money(item.price)}/mo`); monthly += item.price; }
  }
  lines.push(`${S.websiteBuild} — $800`);
  setup += 800;
  return { setup, monthly, lines, title: S.itemizedTitle };
}

export default function IvoryBritePage() {
  const [lang, setLang] = useState(() =>
    typeof navigator !== "undefined" && navigator.language && navigator.language.toLowerCase().startsWith("tr") ? "tr" : "en",
  );
  const [mode, setMode] = useState("package");
  const [packageId, setPackageId] = useState("growth");
  const [setupIds, setSetupIds] = useState([]);
  const [monthlyIds, setMonthlyIds] = useState([]);
  const [socialAddon, setSocialAddon] = useState(false);
  const [name, setName] = useState("Nuh Ademler");
  const [email, setEmail] = useState("noahadams916@gmail.com");
  const [business, setBusiness] = useState("Ivory Brite");
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const S = STR[lang];
  const L = (item) => (lang === "tr" ? item.labelTr || item.label : item.label);
  const D = (item) => (lang === "tr" ? item.descTr || item.desc : item.desc);
  const contractTitle = lang === "tr" ? CONTRACT_TITLE_TR : CONTRACT_TITLE;
  const contractSubtitle = lang === "tr" ? CONTRACT_SUBTITLE_TR : CONTRACT_SUBTITLE;
  const contractSections = lang === "tr" ? CONTRACT_SECTIONS_TR : CONTRACT_SECTIONS;

  const state = useMemo(
    () => ({ mode, packageId, setupIds, monthlyIds, socialAddon }),
    [mode, packageId, setupIds, monthlyIds, socialAddon],
  );
  const totals = useMemo(() => totalsFor(state, lang), [state, lang]);
  const canSend =
    accepted &&
    name.trim() &&
    /.+@.+\..+/.test(email) &&
    (mode === "package" ? !!packageId : setupIds.length + monthlyIds.length > 0);

  const toggle = (list, setList, id) =>
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const submit = async () => {
    setStatus("sending");
    setError("");
    if (!name.trim()) { setStatus("error"); setError(S.errName); return; }
    if (!/.+@.+\..+/.test(email)) { setStatus("error"); setError(S.errEmail); return; }
    if (mode === "itemized" && setupIds.length + monthlyIds.length === 0) {
      setStatus("error"); setError(S.errEmpty); return;
    }
    try {
      const res = await fetch("/api/ivory-brite-selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: name.trim(),
          clientEmail: email.trim(),
          businessName: business.trim() || "Ivory Brite",
          mode,
          packageId,
          setupIds,
          monthlyIds,
          socialAddon: mode === "package" ? socialAddon : undefined,
          accepted: true,
          lang,
        }),
      });
      const data = await res.json();
      if (data.ok) setStatus("done");
      else {
        setStatus("error");
        setError(data.message || S.errGeneric);
      }
    } catch {
      setStatus("error");
      setError(S.errConn);
    }
  };

  const langToggle = (
    <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
      {["en", "tr"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            padding: "6px 16px", fontSize: 13, fontWeight: 700, borderRadius: 20,
            border: "1px solid rgba(255,255,255,.5)",
            background: lang === l ? "#fff" : "transparent",
            color: lang === l ? ACCENT : "#fff", cursor: "pointer",
          }}
        >
          {l === "en" ? "English" : "Türkçe"}
        </button>
      ))}
    </div>
  );

  if (status === "done") {
    return (
      <div style={page}>
        <div style={wrap}>
          <div style={{ ...card, textAlign: "center", padding: "48px 24px" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>✓</div>
            <h2 style={h2}>{S.doneTitle}</h2>
            <p style={sub}>{S.doneText(name, totals.title)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={page}>
      <style>{tooltipCss}</style>
      <div style={wrap}>
        <div style={{ ...card, background: ACCENT, border: "none", color: "#fff" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.8, marginBottom: 8 }}>
            {S.kicker}
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 28 }}>{S.heroTitle}</h1>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.92 }}>{S.heroSub}</p>
          {langToggle}
        </div>

        <div style={card}>
          <h2 style={h2}>{S.s1}</h2>
          <div style={optRow(mode === "package")} onClick={() => setMode("package")}>
            <input type="radio" checked={mode === "package"} readOnly style={{ marginTop: 4 }} />
            <div>
              <strong style={{ color: INK }}>{S.pickPackage}</strong>
              <div style={{ fontSize: 13, color: MUTED }}>{S.pickPackageSub}</div>
            </div>
          </div>
          <div style={optRow(mode === "itemized")} onClick={() => setMode("itemized")}>
            <input type="radio" checked={mode === "itemized"} readOnly style={{ marginTop: 4 }} />
            <div>
              <strong style={{ color: INK }}>{S.buildOwn}</strong>
              <div style={{ fontSize: 13, color: MUTED }}>{S.buildOwnSub}</div>
            </div>
          </div>
        </div>

        {mode === "package" ? (
          <div style={card}>
            <h2 style={h2}>{S.s2pkg}</h2>
            <p style={sub}>{S.s2pkgSub}</p>
            <div style={pkgGrid}>
              {SELECTION_CATALOG.packages.map((pkg) => {
                const web = SELECTION_CATALOG.website.find((w) => w.id === pkg.websiteId);
                const active = packageId === pkg.id;
                return (
                  <div key={pkg.id} style={optRow(active)} onClick={() => setPackageId(pkg.id)}>
                    <input type="radio" checked={active} readOnly style={{ marginTop: 4 }} />
                    <div>
                      <strong style={{ color: INK, fontSize: 16 }}>{pkg.name}</strong>
                      <Info text={D(pkg)} />
                      <div style={{ fontSize: 13, color: INK, marginTop: 6 }}>
                        {lang === "tr" ? "Kurulum" : "Setup"} {money(pkg.setupPrice)} + {money(pkg.monthlyPrice)}/mo
                      </div>
                      <div style={{ fontSize: 13, color: MUTED }}>
                        {S.website}: {web.price === 0 ? S.free : money(web.price)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={card}>
            <h2 style={h2}>{S.s2item}</h2>
            <p style={{ ...sub, fontWeight: 700, marginBottom: 8 }}>{S.setupH}</p>
            {SELECTION_CATALOG.setup.map((item) => (
              <label key={item.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f0eef4", fontSize: 14, color: INK, cursor: "pointer" }}>
                <input type="checkbox" checked={setupIds.includes(item.id)} onChange={() => toggle(setupIds, setSetupIds, item.id)} />
                <span style={{ flex: 1 }}>{L(item)}<Info text={D(item)} /></span>
                <strong>{money(item.price)}</strong>
              </label>
            ))}
            <p style={{ ...sub, fontWeight: 700, margin: "16px 0 8px" }}>{S.monthlyH}</p>
            {SELECTION_CATALOG.monthly.map((item) => (
              <label key={item.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f0eef4", fontSize: 14, color: INK, cursor: "pointer" }}>
                <input type="checkbox" checked={monthlyIds.includes(item.id)} onChange={() => toggle(monthlyIds, setMonthlyIds, item.id)} />
                <span style={{ flex: 1 }}>{L(item)}<Info text={D(item)} /></span>
                <strong>{money(item.price)}/mo</strong>
              </label>
            ))}
            <p style={{ fontSize: 13, color: MUTED, marginTop: 12 }}>
              {S.websiteNote}
              <Info text={D(SELECTION_CATALOG.website.find((w) => w.id === "web-itemized"))} />
            </p>
          </div>
        )}

        {mode === "package" && (
          <div style={card}>
            <h2 style={h2}>{S.s3addon}</h2>
            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: INK, cursor: "pointer" }}>
              <input type="checkbox" checked={socialAddon} onChange={(e) => setSocialAddon(e.target.checked)} style={{ marginTop: 3 }} />
              <span>
                <strong>{S.socialTitle}</strong>
                <Info text={D(SELECTION_CATALOG.monthly.find((i) => i.id === "social-mo"))} />
                {" "}— {S.socialPrice}
                <div style={{ fontSize: 13, color: MUTED }}>{S.socialSub}</div>
              </span>
            </label>
          </div>
        )}

        <div style={{ ...card, background: "#f7f4ff", border: `1px solid ${ACCENT}` }}>
          <h2 style={h2}>{S.yourSelection}</h2>
          {totals.lines.length === 0 && <p style={sub}>{S.nothing}</p>}
          <ul style={{ margin: "0 0 12px 18px", padding: 0, fontSize: 14, color: INK }}>
            {totals.lines.map((l, i) => <li key={i} style={{ marginBottom: 4 }}>{l}</li>)}
          </ul>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, color: INK, fontWeight: 700, borderTop: "1px solid #ddd2ff", paddingTop: 12 }}>
            <span>{S.oneTimeTotal}</span><span>{money(totals.setup)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, color: INK, fontWeight: 700, marginTop: 6 }}>
            <span>{S.monthlyTotal}</span><span>{money(totals.monthly)}/mo</span>
          </div>
          <p style={{ fontSize: 12, color: MUTED, margin: "10px 0 0" }}>{S.pricesNote}</p>
        </div>

        <div style={card}>
          <h2 style={h2}>{mode === "package" ? "4" : "3"}. {S.yourDetails}</h2>
          <input style={input} value={name} onChange={(e) => setName(e.target.value)} placeholder={S.namePh} />
          <input style={input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={S.emailPh} />
          <input style={input} value={business} onChange={(e) => setBusiness(e.target.value)} placeholder={S.businessPh} />
        </div>

        <div style={card}>
          <details>
            <summary style={{ cursor: "pointer", fontWeight: 700, color: INK, fontSize: 15 }}>
              {S.readFull(contractTitle)}
            </summary>
            <p style={{ fontSize: 13, color: MUTED }}>{contractSubtitle}</p>
            {contractSections.map((sec, i) => (
              <div key={i}>
                <h3 style={{ fontSize: 15, color: INK, margin: "16px 0 6px" }}>{sec.heading}</h3>
                {sec.blocks.map((b, j) => {
                  if (b.type === "h") return <h4 key={j} style={{ fontSize: 14, color: INK, margin: "12px 0 4px" }}>{b.text}</h4>;
                  if (b.type === "li") return <div key={j} style={{ fontSize: 13.5, color: INK, margin: "0 0 4px 14px" }}>• {b.text}</div>;
                  if (b.type === "table") return <div key={j} style={{ fontSize: 13, color: MUTED, margin: "6px 0" }}>{b.lines.join(" · ")}</div>;
                  return <p key={j} style={{ fontSize: 13.5, color: INK, lineHeight: 1.55, margin: "0 0 8px" }}>{b.text}</p>;
                })}
              </div>
            ))}
          </details>
        </div>

        <div style={card}>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: INK, cursor: "pointer", background: "#fff8e6", border: "1px solid #f0dfae", borderRadius: 10, padding: 14 }}>
            <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} style={{ marginTop: 3, width: 18, height: 18 }} />
            <span>{S.accept(contractTitle)}</span>
          </label>
          {error && <p style={{ color: "#b3261e", fontSize: 14 }}>{error}</p>}
          <button
            onClick={submit}
            disabled={!canSend || status === "sending"}
            style={{
              marginTop: 14, width: "100%", padding: "14px", fontSize: 16, fontWeight: 700,
              color: "#fff", background: canSend && status !== "sending" ? ACCENT : "#b9b3d6",
              border: "none", borderRadius: 10, cursor: canSend ? "pointer" : "not-allowed",
            }}
          >
            {status === "sending" ? S.sending : S.sendBtn}
          </button>
          {!accepted && <p style={{ fontSize: 12, color: MUTED, marginTop: 8 }}>{S.tickNote}</p>}
        </div>
      </div>
    </div>
  );
}
