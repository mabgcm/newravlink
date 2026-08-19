import React, { useEffect, useRef, useState } from "react";

export default function VoiceRecorder({ questionId, existingUrl, onChange }) {
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(existingUrl || "");
  const [error, setError] = useState("");

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const start = async () => {
    setError("");
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setError("Voice recording is not supported in this browser. Please use a current version of Chrome, Safari, or Edge.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const preferred = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"].find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = preferred ? new MediaRecorder(stream, { mimeType: preferred }) : new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
        if (blob.size < 1000) {
          setError("The recording was too short. Please record your answer again.");
          onChange(questionId, null);
        } else {
          const url = URL.createObjectURL(blob);
          setPreviewUrl(url);
          onChange(questionId, blob);
        }
        stream.getTracks().forEach((track) => track.stop());
      };
      recorderRef.current = recorder;
      streamRef.current = stream;
      recorder.start();
      setRecording(true);
    } catch {
      setError("Microphone access is required. Check your browser permission and try again.");
    }
  };

  const stop = () => {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    setRecording(false);
  };

  const rerecord = () => {
    setPreviewUrl("");
    onChange(questionId, null);
    start();
  };

  return (
    <div className="voice-recorder">
      <div className={`recording-status ${recording ? "is-recording" : ""}`} aria-live="polite">
        <i className={`fa-solid ${recording ? "fa-circle" : previewUrl ? "fa-circle-check" : "fa-microphone"}`} />
        {recording ? "Recording…" : previewUrl ? "Voice answer recorded" : "No recording yet"}
      </div>
      {previewUrl && <audio controls preload="metadata" src={previewUrl}>Your browser does not support audio playback.</audio>}
      <div className="voice-actions">
        {!recording && !previewUrl && <button type="button" onClick={start}><i className="fa-solid fa-microphone" /> Record</button>}
        {recording && <button type="button" className="stop-recording" onClick={stop}><i className="fa-solid fa-stop" /> Stop</button>}
        {!recording && previewUrl && <button type="button" onClick={rerecord}><i className="fa-solid fa-rotate" /> Re-record</button>}
      </div>
      {error && <p className="application-error" role="alert">{error}</p>}
    </div>
  );
}
