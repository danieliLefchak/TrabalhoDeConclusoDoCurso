import { NavBar } from "../../components/NavBar";
import { Routes, Route } from 'react-router-dom'
import { HomePage } from "../../pages/HomePage";
import { Footer } from "../../components/Footer";
import { CadAdotantesPage } from "../../pages/CadAdotantePage";
import { CadEntidadePage } from "../../pages/CadEntidadePage";
import { LoginPage } from "../../pages/LoginPage";
import { ListaAnimaisPage } from "../../pages/ListaAnimaisPage";
import { CadLinksUteisPage } from "../../pages/CadLinksUteisPage";

export function AuthenticatedRoutes() {
    return (
        <div className="backGroud">
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/CadAdotantePage" element={<CadAdotantesPage />} />
                <Route path="/CadEntidadePage" element={<CadEntidadePage />} />
                <Route path="/CadLinks" element={<CadLinksUteisPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/animais" element={<ListaAnimaisPage />} />
            </Routes>
            <Footer />
        </div>
    );
}