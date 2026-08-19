import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRouter from "./Routers";
import Navbar from "./Components/Header/header";
import Footer from "./Components/Footer/footer";
import Sidebar from "./Components/Sidebar/Sidebar";
import { ModalVideoProvider } from "./Components/Video/ModalVideoContext";
import { NavProvider } from "./Components/Context/NavContext";
import { LanguageProvider } from "./Components/Context/LanguageContext";
import MetaPixelTracker from "./analytics/MetaPixelTracker";
import { openWhatsApp } from "./utils/contactLinks";

function AppLayout() {
    const location = useLocation();
    const hideWhatsApp = location.pathname === "/contact" || location.pathname.endsWith("/careers/cold-caller/apply");
    const isCaller = location.pathname === "/caller";
    const isCareerApplication = location.pathname.endsWith("/careers/cold-caller/apply");

    if (isCaller) {
        return <AppRouter />;
    }

    return (
        <LanguageProvider>
            <MetaPixelTracker />
            <NavProvider>
                <ModalVideoProvider>
                    <Navbar />
                    <Sidebar />
                    <AppRouter />
                    {!isCareerApplication && <Footer />}
                    {!hideWhatsApp && (
                        <button
                            type="button"
                            className="whatsapp-float"
                            aria-label="Chat on WhatsApp"
                            data-fbq-event="WhatsAppClick"
                            data-fbq-label="floating-whatsapp"
                            onClick={() => openWhatsApp("floating-whatsapp")}
                        >
                            <i className="fa-brands fa-whatsapp"></i>
                        </button>
                    )}
                </ModalVideoProvider>
            </NavProvider>
        </LanguageProvider>
    );
}

function App() {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
}

export default App;
