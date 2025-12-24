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
                    </ModalVideoProvider>
                </NavProvider>
            </LanguageProvider>
        </Router>
    );
}

export default App;
