import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { initGa4ClickTracking } from './analytics/ga4.js'
import { initMetaPixelClickTracking } from './analytics/metaPixel.js'
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

initGa4ClickTracking();
initMetaPixelClickTracking();

createRoot(document.getElementById('root')).render(
	<StrictMode>
	    <HelmetProvider>
	        <App />
	        <Analytics />
	    </HelmetProvider>
	</StrictMode>,
)
