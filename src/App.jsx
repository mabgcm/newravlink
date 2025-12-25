import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRouter from "./Routers";
import Navbar from "./Components/Header/header";
import Footer from "./Components/Footer/footer";
import Sidebar from "./Components/Sidebar/Sidebar";
import { ModalVideoProvider } from "./Components/Video/ModalVideoContext";
import { NavProvider } from "./Components/Context/NavContext";
import { LanguageProvider } from "./Components/Context/LanguageContext";

function AppLayout() {
    const location = useLocation();
    const hideWhatsApp = location.pathname === "/contact";

    return (
        <LanguageProvider>
            <NavProvider>    
                <ModalVideoProvider>
                    <Navbar />
                    <Sidebar />
                    <AppRouter />
                    <Footer />
                    {!hideWhatsApp && (
                        <a
                            className="whatsapp-float"
                            href="https://wa.me/15063493512"
                            aria-label="Chat on WhatsApp"
                            target="_blank"
                            rel="noreferrer"
                            data-fbq-event="WhatsAppClick"
                        >
                            <i className="fa-brands fa-whatsapp"></i>
                        </a>
                    )}
                </ModalVideoProvider>
            </NavProvider>
        </LanguageProvider>
    );
}

function App(){
    return (
        <Router>
            <AppLayout />
        </Router>
    );
}

export default App;
