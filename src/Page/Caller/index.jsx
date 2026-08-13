import { useCallback, useEffect, useRef, useState } from "react";
import { Device } from "@twilio/voice-sdk";
import "./caller.css";

const api = async (url, options) => {
  const response = await fetch(url, { credentials: "same-origin", ...options, headers: { "Content-Type": "application/json", ...(options?.headers || {}) } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "İşlem tamamlanamadı.");
  return data;
};

const formatDate = (date) => new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Toronto" }).format(new Date(date));
const callLabels = { initiated: "Başlatıldı", ringing: "Çalıyor", "in-progress": "Görüşmede", completed: "Tamamlandı", busy: "Meşgul", "no-answer": "Yanıt yok", failed: "Başarısız", canceled: "İptal" };

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setError(""); setLoading(true);
    try { const data = await api("/api/caller/login", { method: "POST", body: JSON.stringify(form) }); onLogin(data.user); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };
  return <main className="caller-shell caller-login"><section className="caller-card login-card"><div className="caller-mark">R</div><p className="eyebrow">RAVLINK CRM</p><h1>Caller’a giriş yapın</h1><p className="muted">Aramalarınızı güvenli biçimde başlatın ve kayıtları tek yerde yönetin.</p><form onSubmit={submit}><label>Kullanıcı adı<input autoComplete="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required /></label><label>Parola<input type="password" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>{error && <div className="caller-error">{error}</div>}<button className="primary" disabled={loading}>{loading ? "Giriş yapılıyor…" : "Giriş yap"}</button></form></section></main>;
}

function CallerDashboard({ user, onLogout }) {
  const deviceRef = useRef(null);
  const callRef = useRef(null);
  const timerRef = useRef(null);
  const [number, setNumber] = useState("+1");
  const [status, setStatus] = useState("ready");
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [records, setRecords] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [message, setMessage] = useState("");

  const loadRecords = useCallback(async () => { try { const data = await api("/api/caller/recordings"); setRecords(data.records || []); } catch { /* setup may be incomplete */ } }, []);
  useEffect(() => { loadRecords(); return () => { deviceRef.current?.destroy(); clearInterval(timerRef.current); }; }, [loadRecords]);
  useEffect(() => {
    if (!activeId || !["completed", "disconnected"].includes(status)) return;
    let attempts = 0;
    const poll = setInterval(async () => {
      attempts += 1;
      try { const data = await api(`/api/caller/recordings?callId=${encodeURIComponent(activeId)}`); if (data.record?.recordingUrl) { clearInterval(poll); setMessage("Kayıt Firebase’e yüklendi ve hazır."); loadRecords(); } }
      catch { /* retry */ }
      if (attempts >= 30) clearInterval(poll);
    }, 3000);
    return () => clearInterval(poll);
  }, [activeId, status, loadRecords]);

  const startCall = async () => {
    if (!/^\+[1-9]\d{7,14}$/.test(number.replace(/\s/g, ""))) return setMessage("Numarayı ülke koduyla girin. Örnek: +14165551234");
    setMessage(""); setStatus("connecting"); setSeconds(0);
    try {
      if (!deviceRef.current) { const { token } = await api("/api/caller/token"); deviceRef.current = new Device(token, { closeProtection: true, codecPreferences: ["opus", "pcmu"] }); }
      const callId = crypto.randomUUID(); setActiveId(callId);
      const call = await deviceRef.current.connect({ params: { To: number.replace(/\s/g, ""), CallId: callId, Agent: user.username } });
      callRef.current = call;
      call.on("ringing", () => setStatus("ringing"));
      call.on("accept", () => { setStatus("in-progress"); timerRef.current = setInterval(() => setSeconds((value) => value + 1), 1000); });
      call.on("disconnect", () => { setStatus("completed"); clearInterval(timerRef.current); callRef.current = null; });
      call.on("cancel", () => { setStatus("canceled"); clearInterval(timerRef.current); callRef.current = null; });
      call.on("error", (error) => { setStatus("failed"); setMessage(error.message); clearInterval(timerRef.current); });
    } catch (error) { setStatus("failed"); setMessage(error.message); }
  };
  const endCall = () => callRef.current?.disconnect();
  const toggleMute = () => { const next = !muted; callRef.current?.mute(next); setMuted(next); };
  const active = ["connecting", "ringing", "in-progress"].includes(status);
  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return <main className="caller-shell"><header className="caller-top"><div><span className="caller-mark small">R</span><strong>Ravlink Caller</strong></div><div><span>{user.name || user.username}</span><button className="text-button" onClick={onLogout}>Çıkış</button></div></header><div className="caller-grid"><section className="caller-card dialer"><p className="eyebrow">YENİ ARAMA</p><h1>{active ? (callLabels[status] || "Bağlanıyor") : "Kimi arayacaksınız?"}</h1><p className="muted">Arama kaydının alınacağını görüşme başında karşı tarafa bildirin.</p><label className="phone-field"><span>Telefon numarası</span><input inputMode="tel" value={number} onChange={(e) => setNumber(e.target.value)} disabled={active} placeholder="+1 416 555 1234" /></label>{active && <div className="call-live"><span className="pulse" />{callLabels[status] || "Bağlanıyor"}<strong>{time}</strong></div>}{message && <div className="caller-message">{message}</div>}<div className="call-actions">{!active ? <button className="primary call-button" onClick={startCall}><span>☎</span> Aramayı başlat</button> : <><button className={`round ${muted ? "selected" : ""}`} onClick={toggleMute} aria-label="Sesi kapat">{muted ? "🔇" : "🎙"}</button><button className="danger call-button" onClick={endCall}>Aramayı bitir</button></>}</div></section><section className="caller-card history"><div className="section-title"><div><p className="eyebrow">ARAMA GEÇMİŞİ</p><h2>Son kayıtlar</h2></div><button className="icon-button" onClick={loadRecords}>↻</button></div>{records.length === 0 ? <div className="empty"><span>◉</span><p>Henüz bir kayıt yok.</p></div> : <div className="record-list">{records.map((record) => <article key={record.callId}><div><strong>{record.to}</strong><span>{formatDate(record.completedAt || record.updatedAt)}</span><span>{record.duration ? `${record.duration} sn` : callLabels[record.status] || record.status}</span></div>{record.recordingUrl ? <a href={record.recordingUrl} target="_blank" rel="noreferrer">Kaydı aç ↗</a> : <span className="processing">İşleniyor…</span>}</article>)}</div>}</section></div></main>;
}

export default function CallerPage() {
  const [user, setUser] = useState(undefined);
  useEffect(() => { api("/api/caller/session").then((data) => setUser(data.user)).catch(() => setUser(null)); }, []);
  const logout = async () => { await api("/api/caller/session", { method: "DELETE" }); setUser(null); };
  if (user === undefined) return <main className="caller-shell caller-loading">Ravlink Caller yükleniyor…</main>;
  return user ? <CallerDashboard user={user} onLogout={logout} /> : <Login onLogin={setUser} />;
}
