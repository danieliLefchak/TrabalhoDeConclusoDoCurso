import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Button, Dropdown, Space } from "antd";
import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export function NavBar(){
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/" className="text-decoration-none">
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
        <Link to="/" className="text-decoration-none">
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
                to="/"
                className={(navData) =>
                  navData.isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/"
                className={(navData) =>
                  navData.isActive ? "nav-link active" : "nav-link"
                }
              >
                Animais
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/"
                className={(navData) =>
                  navData.isActive ? "nav-link active" : "nav-link"
                }
              >
                Cadastro de animais
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/"
                className={(navData) =>
                  navData.isActive ? "nav-link active" : "nav-link"
                }
              >
                Cadastro de links
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <Space direction="vertical">
              <Dropdown menu={{items}} placement="bottomRight">
                <button id="btnNav" className="btn">Nome</button>
              </Dropdown>
            </Space>
          </div>
        </nav>
      </div>
  );
}