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
                            href="https://wa.me/17059904504?text=Merhaba%2C%20ABD%20%2F%20Kanada%E2%80%99da%20i%C5%9Fletmem%20var.%20%C4%B0ngilizce%20reklam%20ve%20online%20tan%C4%B1t%C4%B1m%20i%C3%A7in%20bilgi%20almak%20istiyorum."
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
