import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { CadAdotantesPage } from "../../pages/CadAdotantePage";
import { CadEntidadePage } from "../../pages/CadEntidadePage";
import { HomePage } from "../../pages/HomePage";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { ListaAnimaisPage } from "../../pages/ListaAnimaisPage";
import { DetalhesAnimaisPage } from "../../pages/DetalhesAnimaisPage";
import { ListaCuidadosAnimaisPage } from "../../pages/ListaCuidadosAnimaisPage";
import { ListaLinksDenunciaPage } from "../../pages/ListaLinksDenunciaPage";
import { ListaPrimeiroAnimalPage } from "../../pages/ListaPrimeiroAnimalPage";

export function SignRoutes() {
    return (
        <div className="backGroud">
            <NavBar />
            <Routes>
                <Route path="/CadAdotantePage" element={<CadAdotantesPage />} />
                <Route path="/CadEntidadePage" element={<CadEntidadePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/animais" element={<ListaAnimaisPage />} />
                <Route path="/listaCuidados" element={<ListaCuidadosAnimaisPage />} />
                <Route path="/listaDenuncias" element={<ListaLinksDenunciaPage />} />
                <Route path="/listaPrimeiroAnimal" element={<ListaPrimeiroAnimalPage />} />
                <Route path="/animal/:id" element={<DetalhesAnimaisPage />} />

                <Route path="*" element={<LoginPage />} />
            </Routes>
            <Footer />
        </div>
    );
}