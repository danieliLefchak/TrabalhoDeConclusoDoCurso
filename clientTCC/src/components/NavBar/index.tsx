import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

export function NavBar(){
  return(
      <div>
        <nav id="navAni" className="navbar navbar-light navbar-expand">
          <Link to="/" className="navbar-brand">
            <img id="logoAni" src={logo} width="60" className="rounded-circle ms-4 me-2" alt="Animais"/>
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
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

            <li className="nav-item ms-3">
              <button className="btn fw-bold">
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>
  );
}