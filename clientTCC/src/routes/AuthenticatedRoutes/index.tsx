import { NavBar } from "../../components/NavBar";
import { Routes, Route } from 'react-router-dom'
import { HomePage } from "../../pages/HomePage";
import { Footer } from "../../components/Footer";
import { CadAdotantesPage } from "../../pages/CadAdotantePage";
import { CadEntidadePage } from "../../pages/CadEntidadePage";
import { LoginPage } from "../../pages/LoginPage";

export function AuthenticatedRoutes() {
    return (
        <div className="backGroud">
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/CadAdotantePage" element={<CadAdotantesPage />} />
                <Route path="/CadEntidadePage" element={<CadEntidadePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Footer />
        </div>
    );
}