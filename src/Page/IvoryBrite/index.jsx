import React, { useMemo, useState } from "react";
import {
  CONTRACT_TITLE,
  CONTRACT_SUBTITLE,
  CONTRACT_SECTIONS,
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

function totalsFor(state) {
  let setup = 0;
  let monthly = 0;
  const lines = [];
  if (state.mode === "package") {
    const pkg = SELECTION_CATALOG.packages.find((p) => p.id === state.packageId);
    if (!pkg) return { setup, monthly, lines, title: "" };
    lines.push(`${pkg.name} setup — ${money(pkg.setupPrice)}`);
    lines.push(`${pkg.name} monthly — ${money(pkg.monthlyPrice)}/mo`);
    setup += pkg.setupPrice;
    monthly += pkg.monthlyPrice;
    const web = SELECTION_CATALOG.website.find((w) => w.id === pkg.websiteId);
    lines.push(`Website Build — ${web.price === 0 ? "Free" : money(web.price)}`);
    setup += web.price;
    if (state.socialAddon) {
      lines.push("Social Media setup (add-on) — $500");
      lines.push("Social Media management (add-on) — $440/mo");
      setup += 500;
      monthly += 440;
    }
    return { setup, monthly, lines, title: `${pkg.name} package` };
  }
  for (const id of state.setupIds) {
    const item = SELECTION_CATALOG.setup.find((i) => i.id === id);
    if (item) { lines.push(`${item.label} (setup) — ${money(item.price)}`); setup += item.price; }
  }
  for (const id of state.monthlyIds) {
    const item = SELECTION_CATALOG.monthly.find((i) => i.id === id);
    if (item) { lines.push(`${item.label} (monthly) — ${money(item.price)}/mo`); monthly += item.price; }
  }
  lines.push("Website Build — $800");
  setup += 800;
  return { setup, monthly, lines, title: "Itemized selection" };
}

export default function IvoryBritePage() {
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

  const state = useMemo(
    () => ({ mode, packageId, setupIds, monthlyIds, socialAddon }),
    [mode, packageId, setupIds, monthlyIds, socialAddon],
  );
  const totals = useMemo(() => totalsFor(state), [state]);
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
        }),
      });
      const data = await res.json();
      if (data.ok) setStatus("done");
      else {
        setStatus("error");
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Could not reach the server. Please check your connection and try again.");
    }
  };

  if (status === "done") {
    return (
      <div style={page}>
        <div style={wrap}>
          <div style={{ ...card, textAlign: "center", padding: "48px 24px" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>✓</div>
            <h2 style={h2}>Selection received</h2>
            <p style={sub}>
              Thank you, {name}. Your selection ({totals.title}) and acceptance of the agreement
              have been emailed to you and to Rav Link Inc.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={page}>
      <div style={wrap}>
        <div style={{ ...card, background: ACCENT, border: "none", color: "#fff" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.8, marginBottom: 8 }}>
            Rav Link Inc. · Proposal
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 28 }}>Digital Marketing Proposal</h1>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.92 }}>Prepared for Ivory Brite · Choose a package or build your own, then accept and send.</p>
        </div>

        <div style={card}>
          <h2 style={h2}>1. How would you like to choose?</h2>
          <div style={optRow(mode === "package")} onClick={() => setMode("package")}>
            <input type="radio" checked={mode === "package"} readOnly style={{ marginTop: 4 }} />
            <div>
              <strong style={{ color: INK }}>Pick a package</strong>
              <div style={{ fontSize: 13, color: MUTED }}>Launch, Growth or Scale — bundled pricing, better value.</div>
            </div>
          </div>
          <div style={optRow(mode === "itemized")} onClick={() => setMode("itemized")}>
            <input type="radio" checked={mode === "itemized"} readOnly style={{ marginTop: 4 }} />
            <div>
              <strong style={{ color: INK }}>Build your own (itemized)</strong>
              <div style={{ fontSize: 13, color: MUTED }}>Select individual setup and monthly services.</div>
            </div>
          </div>
        </div>

        {mode === "package" ? (
          <div style={card}>
            <h2 style={h2}>2. Select a package</h2>
            <p style={sub}>Each package includes the Website Build at the package price shown.</p>
            <div style={pkgGrid}>
              {SELECTION_CATALOG.packages.map((pkg) => {
                const web = SELECTION_CATALOG.website.find((w) => w.id === pkg.websiteId);
                const active = packageId === pkg.id;
                return (
                  <div key={pkg.id} style={optRow(active)} onClick={() => setPackageId(pkg.id)}>
                    <input type="radio" checked={active} readOnly style={{ marginTop: 4 }} />
                    <div>
                      <strong style={{ color: INK, fontSize: 16 }}>{pkg.name}</strong>
                      <div style={{ fontSize: 13, color: INK, marginTop: 6 }}>
                        Setup {money(pkg.setupPrice)} + {money(pkg.monthlyPrice)}/mo
                      </div>
                      <div style={{ fontSize: 13, color: MUTED }}>
                        Website: {web.price === 0 ? "Free" : money(web.price)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={card}>
            <h2 style={h2}>2. Select services</h2>
            <p style={{ ...sub, fontWeight: 700, marginBottom: 8 }}>One-time setup</p>
            {SELECTION_CATALOG.setup.map((item) => (
              <label key={item.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f0eef4", fontSize: 14, color: INK, cursor: "pointer" }}>
                <input type="checkbox" checked={setupIds.includes(item.id)} onChange={() => toggle(setupIds, setSetupIds, item.id)} />
                <span style={{ flex: 1 }}>{item.label}</span>
                <strong>{money(item.price)}</strong>
              </label>
            ))}
            <p style={{ ...sub, fontWeight: 700, margin: "16px 0 8px" }}>Monthly</p>
            {SELECTION_CATALOG.monthly.map((item) => (
              <label key={item.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f0eef4", fontSize: 14, color: INK, cursor: "pointer" }}>
                <input type="checkbox" checked={monthlyIds.includes(item.id)} onChange={() => toggle(monthlyIds, setMonthlyIds, item.id)} />
                <span style={{ flex: 1 }}>{item.label}</span>
                <strong>{money(item.price)}/mo</strong>
              </label>
            ))}
            <p style={{ fontSize: 13, color: MUTED, marginTop: 12 }}>Website Build is included automatically — $800.</p>
          </div>
        )}

        {mode === "package" && (
          <div style={card}>
            <h2 style={h2}>3. Optional add-on</h2>
            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: INK, cursor: "pointer" }}>
              <input type="checkbox" checked={socialAddon} onChange={(e) => setSocialAddon(e.target.checked)} style={{ marginTop: 3 }} />
              <span>
                <strong>Social Media management</strong> — setup $500 + $440/mo
                <div style={{ fontSize: 13, color: MUTED }}>Not included in packages; billed at list price.</div>
              </span>
            </label>
          </div>
        )}

        <div style={{ ...card, background: "#f7f4ff", border: `1px solid ${ACCENT}` }}>
          <h2 style={h2}>Your selection</h2>
          {totals.lines.length === 0 && <p style={sub}>Nothing selected yet.</p>}
          <ul style={{ margin: "0 0 12px 18px", padding: 0, fontSize: 14, color: INK }}>
            {totals.lines.map((l, i) => <li key={i} style={{ marginBottom: 4 }}>{l}</li>)}
          </ul>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, color: INK, fontWeight: 700, borderTop: "1px solid #ddd2ff", paddingTop: 12 }}>
            <span>One-time total</span><span>{money(totals.setup)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, color: INK, fontWeight: 700, marginTop: 6 }}>
            <span>Monthly total</span><span>{money(totals.monthly)}/mo</span>
          </div>
          <p style={{ fontSize: 12, color: MUTED, margin: "10px 0 0" }}>Prices in CAD, HST extra. Ad spend is paid directly by you to the platforms. Payment by Interac e-transfer to info@ravlink.ca.</p>
        </div>

        <div style={card}>
          <h2 style={h2}>{mode === "package" ? "4" : "3"}. Your details</h2>
          <input style={input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
          <input style={input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
          <input style={input} value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Business name" />
        </div>

        <div style={card}>
          <details>
            <summary style={{ cursor: "pointer", fontWeight: 700, color: INK, fontSize: 15 }}>
              Read the full {CONTRACT_TITLE} (click to expand)
            </summary>
            <p style={{ fontSize: 13, color: MUTED }}>{CONTRACT_SUBTITLE}</p>
            {CONTRACT_SECTIONS.map((sec, i) => (
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
            <span>
              I have read the {CONTRACT_TITLE} between Rav Link Inc. and Ivory Brite above.
              By ticking this box and clicking <strong>Send Selection</strong>, I accept the agreement
              in full on behalf of Ivory Brite.
            </span>
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
            {status === "sending" ? "Sending…" : "Send Selection"}
          </button>
          {!accepted && <p style={{ fontSize: 12, color: MUTED, marginTop: 8 }}>Please tick the acceptance box above to enable sending.</p>}
        </div>
      </div>
    </div>
  );
}
