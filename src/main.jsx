import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './assets/css/main.css'
import './assets/css/responsive.css'
import "./i18n";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "animate.css";

if (typeof window !== "undefined") {
  document.addEventListener("click", (event) => {
    const target = event.target?.closest?.("[data-fbq-event]");
    if (!target || typeof window.fbq !== "function") {
      return;
    }

    const eventName = target.getAttribute("data-fbq-event");
    const label = target.getAttribute("data-fbq-label");
    const href = target.getAttribute("href");
    const text = target.textContent?.trim();

    window.fbq("trackCustom", eventName, {
      label,
      href,
      text,
    });
  });
}

createRoot(document.getElementById('root')).render(
<StrictMode>
    <App />
    <Analytics />
</StrictMode>,
)
