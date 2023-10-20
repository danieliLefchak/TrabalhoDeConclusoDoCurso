import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { CadAdotantesPage } from "../../pages/CadAdotantePage";
import { CadEntidadePage } from "../../pages/CadEntidadePage";
import { HomePage } from "../../pages/HomePage";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { ListaAnimaisPage } from "../../pages/ListaAnimaisPage";

export function SignRoutes() {
    return (
        <div className="backGroud">
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/animais" element={<ListaAnimaisPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/CadAdotantePage" element={<CadAdotantesPage />} />
                <Route path="/CadEntidadePage" element={<CadEntidadePage />} />

                <Route path="*" element={<LoginPage />} />
            </Routes>
            <Footer />
        </div>
    );
}