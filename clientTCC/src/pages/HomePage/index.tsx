import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Animais, Imagem } from "../../commons/interfaces";
import AnimaisService from "../../services/AnimaisService";
import PrimeiroAnimal from "../../assets/PrimeiroAnimal.jpg";
import CuidadosAnimais from "../../assets/CuidadosAnimaisCp.jpg";
import AnimailMausTratos from "../../assets/AnimalMausTratos.jpg";
import semImagem from "../../assets/semImagem.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function HomePage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [encontrado, setEncontrado] = useState(false)

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {//criar uma lista que vai mostrar apenas os mais velhos tipo uns 10
        AnimaisService.findAll()
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

            console.log(encontrado);
    };

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
            <div className="row row-cols-1 row-cols-md-4 g-4 mb-2 mt-2">
                {data.map((animais: Animais) => (
                    <div className="col-sm-5 col-md-4 col-lg-2 me-2 ms-2">
                        <Card
                            style={{ width: 240 }}
                            cover={
                            <img
                                alt="animais"
                                src={animais.conteudoImagem.length > 0 ? animais.conteudoImagem[0].conteudoImagem : semImagem}
                            />
                            }
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta title={animais.nome} description={animais.especie} />
                        </Card>
                    </div>
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