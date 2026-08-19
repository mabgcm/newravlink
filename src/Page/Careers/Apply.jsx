import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { coldCallerModules } from "../../Data/coldCallerTraining";
import VoiceRecorder from "./VoiceRecorder";
import "./application.css";

const STORAGE_KEY = "ravlink-cold-caller-application-v1";
const emptyCandidate = { fullName: "", email: "", phone: "", location: "", experience: "", availability: "", expectedRate: "" };
const makeId = () => `RLCC-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.applicationId && !saved.completed) return saved;
  } catch { /* Start clean if stored progress is invalid. */ }
  return { applicationId: makeId(), startedAt: new Date().toISOString(), stage: "candidate", moduleIndex: 0, candidate: emptyCandidate, answers: {}, recordingRefs: {} };
}

const fields = [
  ["fullName", "Full name", "text", "Your full name"],
  ["email", "Email", "email", "you@example.com"],
  ["phone", "WhatsApp / phone", "tel", "+63 …"],
  ["location", "City / location in the Philippines", "text", "City, province"],
  ["expectedRate", "Expected hourly rate (USD)", "number", "For example: 5"],
];

export default function ColdCallerApplicationPage() {
  const [state, setState] = useState(loadProgress);
  const [recordingBlobs, setRecordingBlobs] = useState({});
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [fatalError, setFatalError] = useState("");
  const module = coldCallerModules[state.moduleIndex];
  const percent = state.stage === "candidate" ? 0 : Math.round(((state.moduleIndex + 1) / coldCallerModules.length) * 100);

  useEffect(() => {
    if (!state.completed) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [state.stage, state.moduleIndex]);

  const updateCandidate = (event) => {
    const { name, value } = event.target;
    setState((current) => ({ ...current, candidate: { ...current.candidate, [name]: value } }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const updateAnswer = (id, value) => {
    setState((current) => ({ ...current, answers: { ...current.answers, [id]: value } }));
    setErrors((current) => ({ ...current, [id]: "" }));
  };

  const updateRecording = (id, blob) => {
    setRecordingBlobs((current) => ({ ...current, [id]: blob }));
    if (!blob) setState((current) => ({ ...current, recordingRefs: { ...current.recordingRefs, [id]: "" } }));
    setErrors((current) => ({ ...current, [id]: "" }));
  };

  const validateCandidate = () => {
    const next = {};
    Object.entries(state.candidate).forEach(([key, value]) => { if (!String(value).trim()) next[key] = "This field is required."; });
    if (state.candidate.email && !/^\S+@\S+\.\S+$/.test(state.candidate.email)) next.email = "Enter a valid email address.";
    if (state.candidate.expectedRate && Number(state.candidate.expectedRate) <= 0) next.expectedRate = "Enter a valid hourly rate.";
    setErrors(next);
    return !Object.keys(next).length;
  };

  const begin = (event) => {
    event.preventDefault();
    if (!validateCandidate()) return;
    setState((current) => ({ ...current, stage: "training", moduleIndex: 0 }));
  };

  const validateModule = () => {
    const next = {};
    module.questions.forEach((question) => {
      const hasRecording = recordingBlobs[question.id] || state.recordingRefs[question.id];
      if (question.type === "voice" ? !hasRecording : !String(state.answers[question.id] ?? "").trim()) next[question.id] = question.type === "voice" ? "Record a voice answer to continue." : "Answer this question to continue.";
    });
    setErrors(next);
    return !Object.keys(next).length;
  };

  const uploadRecordings = async () => {
    const refs = { ...state.recordingRefs };
    for (const question of module.questions.filter((item) => item.type === "voice")) {
      const blob = recordingBlobs[question.id];
      if (!blob) continue;
      const response = await fetch(`/api/careers/recording?applicationId=${encodeURIComponent(state.applicationId)}&questionId=${encodeURIComponent(question.id)}`, { method: "POST", headers: { "Content-Type": blob.type || "audio/webm" }, body: blob });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.recordingUrl) throw new Error(result.message || "A voice answer could not be uploaded.");
      refs[question.id] = result.recordingUrl;
    }
    setState((current) => ({ ...current, recordingRefs: refs }));
    setRecordingBlobs({});
    return refs;
  };

  const submit = async (recordingRefs) => {
    const response = await fetch("/api/careers/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ applicationId: state.applicationId, startedAt: state.startedAt, candidate: state.candidate, answers: state.answers, recordingRefs }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || "Your application could not be submitted. Please try again.");
    localStorage.removeItem(STORAGE_KEY);
    setState((current) => ({ ...current, completed: true, stage: "complete" }));
  };

  const advance = async () => {
    if (!validateModule() || busy) return;
    setBusy(true); setFatalError("");
    try {
      const refs = await uploadRecordings();
      if (state.moduleIndex === coldCallerModules.length - 1) await submit(refs);
      else setState((current) => ({ ...current, moduleIndex: current.moduleIndex + 1 }));
    } catch (error) { setFatalError(error.message); }
    finally { setBusy(false); }
  };

  const title = useMemo(() => state.stage === "candidate" ? "Candidate information" : module?.title, [state.stage, module]);

  if (state.stage === "complete") return (
    <main className="application-page"><Helmet><title>Application Complete | Rav Link Careers</title></Helmet><section className="application-shell completion-shell"><div className="completion-icon"><i className="fa-solid fa-check" /></div><span className="application-kicker">Application complete</span><h1>Thank you for completing the qualification.</h1><p>Your Rav Link Cold Caller Training &amp; Qualification was submitted successfully. Selected candidates will be contacted by Rav Link.</p><p className="application-id">Application ID: <strong>{state.applicationId}</strong></p><Link to="/" className="btn btn-accent"><span className="btn-title">Return to Rav Link</span></Link></section></main>
  );

  return (
    <main className="application-page">
      <Helmet><title>{title} | Cold Caller Application</title><meta name="robots" content="noindex,follow" /></Helmet>
      <section className="application-shell">
        <header className="application-header">
          <Link to="/careers/cold-caller" className="application-exit"><i className="fa-solid fa-arrow-left" /> Position details</Link>
          <span className="application-id">Application ID: <strong>{state.applicationId}</strong></span>
        </header>
        {state.stage === "candidate" ? (
          <form className="application-card candidate-form" onSubmit={begin} noValidate>
            <span className="application-kicker">Before you begin</span><h1>Candidate information</h1><p className="application-intro">This short form connects your training answers and recordings to one application. A CV or resume is not required.</p>
            <div className="candidate-grid">
              {fields.map(([name, label, type, placeholder]) => <div className="field-group" key={name}><label htmlFor={name}>{label}</label><input id={name} name={name} type={type} inputMode={type === "number" ? "decimal" : undefined} min={type === "number" ? "0" : undefined} step={type === "number" ? "0.01" : undefined} value={state.candidate[name]} onChange={updateCandidate} placeholder={placeholder} aria-invalid={Boolean(errors[name])} />{errors[name] && <span className="field-error" role="alert">{errors[name]}</span>}</div>)}
              <div className="field-group field-wide"><label htmlFor="experience">Cold calling experience</label><textarea id="experience" name="experience" rows="3" value={state.candidate.experience} onChange={updateCandidate} placeholder="Briefly describe your experience, or write ‘No experience’." aria-invalid={Boolean(errors.experience)} />{errors.experience && <span className="field-error" role="alert">{errors.experience}</span>}</div>
              <div className="field-group field-wide"><label htmlFor="availability">Availability</label><textarea id="availability" name="availability" rows="3" value={state.candidate.availability} onChange={updateCandidate} placeholder="Days, hours, and time zone you can reliably work." aria-invalid={Boolean(errors.availability)} />{errors.availability && <span className="field-error" role="alert">{errors.availability}</span>}</div>
            </div>
            <button className="btn btn-accent application-next" type="submit"><span className="btn-title">Begin training</span><span className="icon-circle"><i className="fa-solid fa-arrow-right" /></span></button>
          </form>
        ) : (
          <>
            <div className="application-progress" aria-label={`${percent}% complete`}><div><span>Module {state.moduleIndex + 1} of {coldCallerModules.length}</span><span>{percent}%</span></div><div className="progress-track"><span style={{ width: `${percent}%` }} /></div></div>
            <article className="application-card module-card">
              <span className="application-kicker">Module {state.moduleIndex + 1}</span><h1>{module.title}</h1>
              <div className="training-content">{module.content.map((item, index) => item.type === "quote" ? <blockquote key={index}>{item.text}</blockquote> : item.type === "list" ? <ol key={index}>{item.items.map((value) => <li key={value}>{value}</li>)}</ol> : <p key={index}>{item.text}</p>)}</div>
              <div className="module-questions">{module.questions.map((question, questionIndex) => <section className="question-block" key={question.id}><span className="question-label">{module.questions.length > 1 ? `Question ${questionIndex + 1}` : "Knowledge check"}</span><h2>{question.prompt}</h2>
                {question.type === "choice" && <div className="answer-options">{question.options.map((option, optionIndex) => <label className={state.answers[question.id] === optionIndex ? "is-selected" : ""} key={option}><input type="radio" name={question.id} checked={state.answers[question.id] === optionIndex} onChange={() => updateAnswer(question.id, optionIndex)} /><span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span></label>)}</div>}
                {question.type === "textarea" && <textarea rows="6" value={state.answers[question.id] || ""} onChange={(event) => updateAnswer(question.id, event.target.value)} placeholder={question.placeholder} aria-label={question.prompt} />}
                {question.type === "voice" && <VoiceRecorder questionId={question.id} existingUrl={state.recordingRefs[question.id]} onChange={updateRecording} />}
                {errors[question.id] && <p className="application-error" role="alert">{errors[question.id]}</p>}
              </section>)}</div>
              {fatalError && <p className="application-error submission-error" role="alert">{fatalError}</p>}
              <div className="module-actions"><button type="button" className="application-back" disabled={state.moduleIndex === 0 || busy} onClick={() => setState((current) => ({ ...current, moduleIndex: current.moduleIndex - 1 }))}>Back</button><button type="button" className="btn btn-accent application-next" disabled={busy} onClick={advance}><span className="btn-title">{busy ? "Saving…" : state.moduleIndex === coldCallerModules.length - 1 ? "Submit application" : "Continue"}</span>{!busy && <span className="icon-circle"><i className="fa-solid fa-arrow-right" /></span>}</button></div>
            </article>
            <p className="persistence-note"><i className="fa-solid fa-cloud-arrow-up" /> Progress is saved on this device after each answer.</p>
          </>
        )}
      </section>
    </main>
  );
}
