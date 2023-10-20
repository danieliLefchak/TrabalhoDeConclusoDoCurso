import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Dropdown, Space } from "antd";
import type { MenuProps } from 'antd';
import AuthService from "../../services/AuthService";
import { useState, useEffect } from "react";

export function NavBar(){
  const [nome, setNome] = useState("");
  const [encontrado, setEncontrado] = useState(false);

  const onClickLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  useEffect(() => {
    returnVal();
  }, []);

  const returnVal = () => {
    const nomeStorage = localStorage.getItem("user");
    if (nomeStorage && nomeStorage !== 'undefined') {
        setEncontrado(true);
        setNome(JSON.parse(nomeStorage).toString());
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/listaInteressados" className="text-decoration-none">
          Lista de interessados
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/" className="text-decoration-none">
          Meus dados
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to="/" className="text-decoration-none" onClick={onClickLogout}>
          Sair
        </Link>
      ),
    },
  ];

  return(
      <div>
        <nav id="navAni" className="navbar navbar-expand">
          <Link to="/" className="navbar-brand">
            <img id="logoAni" src={logo} width="60" className="rounded-circle ms-4 me-2" alt="Animais"/>
          </Link>
          <ul className="navbar-nav mx-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink
                to="/home"
                className={(navData) =>
                  navData.isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/animais"
                className={(navData) =>
                  navData.isActive ? "nav-link active" : "nav-link"
                }
              >
                Animais
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/CadAnimais"
                className={(navData) =>
                  navData.isActive ? "nav-link active" : "nav-link"
                }
              >
                Cadastro de animais
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/CadLinks"
                className={(navData) =>
                  navData.isActive ? "nav-link active" : "nav-link"
                }
              >
                Cadastro de links
              </NavLink>
            </li>
          </ul>
          {encontrado ? <div className="d-flex align-items-center">
            <Space direction="vertical">
              <Dropdown menu={{ items }} placement="bottomRight">
                <button id="btnNav" className="btn">{nome}</button>
              </Dropdown>
            </Space>
        </div> : <div></div>}
        </nav>
      </div>
  );
}