import { NavBar } from "../../components/NavBar";
import { Routes, Route } from 'react-router-dom'
import { Footer } from "../../components/Footer";
import { LoginPage } from "../../pages/LoginPage";
import { ListaAnimaisPage } from "../../pages/ListaAnimaisPage";
import { CadLinksUteisPage } from "../../pages/CadLinksUteisPage";
import { CadAnimaisPage } from "../../pages/CadAnimaisPage";
import { ListaCuidadosAnimaisPage } from "../../pages/ListaCuidadosAnimaisPage";
import { ListaLinksDenunciaPage } from "../../pages/ListaLinksDenunciaPage";
import { ListaPrimeiroAnimalPage } from "../../pages/ListaPrimeiroAnimalPage";
import { ListaInteressadosPage } from "../../pages/ListaInteressadosPage";
import { HomePage } from "../../pages/HomePage";

export function AuthenticatedRoutes() {
    return (
        <div className="backGroud">
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/CadLinks" element={<CadLinksUteisPage />} />
                <Route path="/CadAnimais" element={<CadAnimaisPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/animais" element={<ListaAnimaisPage />} />
                <Route path="/listaCuidados" element={<ListaCuidadosAnimaisPage />} />
                <Route path="/listaDenuncias" element={<ListaLinksDenunciaPage />} />
                <Route path="/listaPrimeiroAnimal" element={<ListaPrimeiroAnimalPage />} />
                <Route path="/listaInteressados" element={<ListaInteressadosPage />} />
            </Routes>
            <Footer />
        </div>
    );
}