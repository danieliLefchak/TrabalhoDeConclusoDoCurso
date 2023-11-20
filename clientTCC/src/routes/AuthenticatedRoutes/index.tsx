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
import { EditaLinkPage } from "../../pages/EditaLinkPage";
import { DetalhesAnimaisPage } from "../../pages/DetalhesAnimaisPage";
import { MeuPerfilPage } from "../../pages/MeuPerfilPage";
import { useState, useEffect } from "react";
import AdotantesService from "../../services/AdotantesService";
import EntidadeService from "../../services/EntidadeService";
import { EditaAnimalPage } from "../../pages/EditaAnimalPage";
import { CadEntidadePage } from "../../pages/CadEntidadePage";
import UsuarioService from "../../services/UsuarioService";
import { EditaAdotantePage } from "../../pages/EditarAdotantePage";
import { EditaEntidadePage } from "../../pages/EditaEntidadePage";
import { PerfilPublicoEntidades } from "../../pages/PerfilPublicoEntidades";

export function AuthenticatedRoutes() {
    const [roleAdmin, setRoleAdmin] = useState(false);
    const [roleUser, setRoleUser] = useState(false);

    useEffect(() => {
      loadData();
    }, []);

    const loadData = () => {
      const nomeStorage = localStorage.getItem("user");
      if (nomeStorage && nomeStorage !== "undefined") {
        var nome = JSON.parse(nomeStorage).toString();

        UsuarioService.findByName(nome)
          .then((response) => {
            if (response.data.tipoUsuario === "adotante") {
              AdotantesService.findByUser(nome)
                .then(() => {
                  setRoleUser(true);
                })
                .catch((error) => {
                  console.error("Erro ao buscar adotante", error);
                });
            } else if (response.data.tipoUsuario === "entidade") {
              EntidadeService.findByUser(nome)
                .then(() => {
                  setRoleAdmin(true);
                })
                .catch((error) => {
                  console.error("Erro ao buscar Entidade", error);
                });
            }
          })
          .catch((error) => {
            console.error("Falha ao carregar os detalhes do usuario: ", error);
          });
      } else {
        console.log("Nome não encontrado");
      }
    };

    return (
        <div className="backGroud">
            <NavBar />
            <Routes>
                {/*Rotas admin*/}
                <Route path="/listaInteressados" element={roleAdmin ? <ListaInteressadosPage /> : <LoginPage />} />
                <Route path="/editaLink/:id" element={ roleAdmin ? <EditaLinkPage /> : <LoginPage />} />
                <Route path="/CadLinks" element={roleAdmin ? <CadLinksUteisPage /> : <LoginPage />} />
                <Route path="/editaAnimal/:id" element={ roleAdmin ? <EditaAnimalPage /> : <LoginPage />} />
                <Route path="/CadAnimais" element={roleAdmin ? <CadAnimaisPage /> : <LoginPage />} />
                <Route path="/editaEntidade/:id" element={ roleAdmin ? <EditaEntidadePage /> : <LoginPage />} />

                {/*Rotas admin e usuarios*/}
                <Route path="/MeusDados" element={roleAdmin || roleUser ? <MeuPerfilPage /> : <LoginPage />}/>

                {/*Rotas usuarios*/}
                <Route path="/editaAdotante/:id" element={ roleUser ? <EditaAdotantePage /> : <LoginPage />} />

                {/*Rotas publicas*/}
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/animais" element={<ListaAnimaisPage />} />
                <Route path="/listaCuidados" element={<ListaCuidadosAnimaisPage />} />
                <Route path="/listaDenuncias" element={<ListaLinksDenunciaPage />} />
                <Route path="/listaPrimeiroAnimal" element={<ListaPrimeiroAnimalPage />} />
                <Route path="/animal/:id" element={<DetalhesAnimaisPage />} />
                <Route path="/CadEntidadePage" element={<CadEntidadePage />} />
                <Route path="/pfPublic/:nome" element={<PerfilPublicoEntidades />} />
            </Routes>
            <Footer />
        </div>
    );
}