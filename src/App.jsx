import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Routers";
import Navbar from "./Components/Header/header";
import Footer from "./Components/Footer/footer";
import Sidebar from "./Components/Sidebar/Sidebar";
import { ModalVideoProvider } from "./Components/Video/ModalVideoContext";
import { NavProvider } from "./Components/Context/NavContext";
import { LanguageProvider } from "./Components/Context/LanguageContext";

function App(){
    return (
        <Router>
            <LanguageProvider>
                <NavProvider>    
                    <ModalVideoProvider>
                        <Navbar />
                        <Sidebar />
                        <AppRouter />
                        <Footer />
                        <a
                            className="whatsapp-float"
                            href="https://wa.me/15063493512"
                            aria-label="Chat on WhatsApp"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="fa-brands fa-whatsapp"></i>
                        </a>
                    </ModalVideoProvider>
                </NavProvider>
            </LanguageProvider>
        </Router>
    );
}

export default App;
