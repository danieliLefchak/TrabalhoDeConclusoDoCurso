import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Animais, UserLogin } from "../../commons/interfaces";
import AnimaisService from "../../services/AnimaisService";
import PrimeiroAnimal from "../../assets/PrimeiroAnimal.jpg";
import CuidadosAnimais from "../../assets/CuidadosAnimaisCp.jpg";
import AnimailMausTratos from "../../assets/AnimalMausTratos.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UsuarioService from "../../services/UsuarioService";

export function HomePage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [encontrado, setEncontrado] = useState(false);
    const [roleAdmin, setRoleAdmin] = useState(false);

    useEffect(() => {
        loadData();
        returnVal();
    }, []);

    const loadData = () => {
        AnimaisService.findLastTenAnimals()
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                toast.error('Falha ao carregar a animais.');
                console.log('Falha ao carregar a animais. ', error)
            });

            const tokenStorage = localStorage.getItem("token");
            if (tokenStorage && tokenStorage !== 'undefined') {
                setEncontrado(true);
            } else{
                setEncontrado(false);
            }
    };

    const returnVal = () => {
        const nomeStorage = localStorage.getItem("user");
        if (nomeStorage && nomeStorage !== 'undefined') {
            UsuarioService.findByName(JSON.parse(nomeStorage).toString())
              .then((response) => {
                const userResponse = response.data;
    
                const userLogin: UserLogin = {
                  id: userResponse.id,
                  username: userResponse.username,
                  password: userResponse.password,
                  tipoUsuario: userResponse.tipoUsuario,
                };
    
                if(userLogin.tipoUsuario === "adotante"){
                  setRoleAdmin(false);
                } else if(userLogin.tipoUsuario === "entidade"){
                  setRoleAdmin(true);
                }
              })
              .catch((error) => {
                console.error("Erro ao buscar usuário: ", error);
              });
        }
    }

    const actions = roleAdmin ? [
        <DeleteOutlined key="delete" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
    ] : [
        <EllipsisOutlined key="ellipsis"/>,
    ];

    return(
        <div>
            <ToastContainer/>
            <section className="banner parallax">
                <div className="banner-shadow">
                    <h1 className="banner-title">Adoção e anúncio de animais</h1>
                    <p className="banner-text">Faça seu cadastro e ajude os animais a encontarem um lar!</p>
                </div>
                {!encontrado ?
                    <div className="banner-buttons">
                        <a className="btn btnBanner" href="/CadEntidadePage">Login entidade</a>
                        <a className="btn btnBanner ms-4" href="/CadAdotantePage">Login adotante</a>
                        <p className="mt-4">Já possui cadastro? Então faça <Link to="/login" className="text-decoration-none textLinkBanner fw-bold">
                          Login
                        </Link></p>
                    </div>
                : <div></div>}
            </section>
            <h1 className="text-center titulo">Animais para adoção</h1>
            <div className="row row-cols-1 row-cols-md-4 g-4 mb-2 mt-2 ms-5">
            {data.map((animais: Animais) => (
                    <Card
                        id="cardFixBg"
                        className="col-sm-5 col-md-4 col-lg-2 me-3"
                        style={{ width: 300 }}
                        cover={
                            <img
                                className="mt-2"
                                src={`http://localhost:9000/imganimais/${animais.imagemNome![0]}`}
                            />
                        }
                        actions={actions}
                    >
                        <Meta title={animais.nome} description={animais.especie} />
                    </Card>
                ))}
            </div>
            <h1 className="text-center mb-2 titulo">Informações Uteis</h1>
            <div className="row row-cols-1 justify-content-center g-4 mt-1">
                <Card
                    onClick={() => navigate("/listaPrimeiroAnimal")}
                    id="cardFixBg"
                    className="col-sm-5 col-md-4 col-lg-2 me-2 ms-2"
                    hoverable
                    style={{ width: 240 }}
                    cover={<img className="mt-2" alt="primeiro animal" src={PrimeiroAnimal}/>}
                >
                    <Meta title="Primeiro animal" description="Cuidados necessarios ao criar o primeiro animal." />
                </Card>                
                <Card
                    onClick={() => navigate("/listaDenuncias")}
                    id="cardFixBg"
                    className="col-sm-5 col-md-4 col-lg-2 me-2 ms-2"
                    hoverable
                    style={{ width: 240 }}
                    cover={<img className="mt-2" alt="Denuncias" src={AnimailMausTratos}/>}
                >
                    <Meta title="Links para denuncias" description="Denuncie maus tratos e ajude os animais." />
                </Card>
                <Card
                    onClick={() => navigate("/listaCuidados")}
                    id="cardFixBg"
                    className="col-sm-5 col-md-4 col-lg-2 me-2 ms-2"
                    hoverable
                    style={{ width: 240 }}
                    cover={<img className="mt-2" alt="Cuidados" src={CuidadosAnimais}/>}
                >
                    <Meta title="Cuidados com animais" description="Cuidados com animais de estimação." />
                </Card>
            </div>
        </div>
    );
}