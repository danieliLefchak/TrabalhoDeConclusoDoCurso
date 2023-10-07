import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Animais } from "../../commons/types";
import AnimaisService from "../../services/AnimaisService";
import PrimeiroAnimal from "../../assets/PrimeiroAnimal.jpg";
import CuidadosAnimais from "../../assets/CuidadosAnimaisCp.jpg";
import AnimailMausTratos from "../../assets/AnimalMausTratos.jpg";
import { Alert } from "antd";

export function HomePage() {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {//criar uma lista que vai mostrar apenas os mais velhos tipo uns 10
        AnimaisService.findAll()
            .then((response) => {
                setData(response.data);
                setApiError('');
            })
            .catch((error) => {
                setApiError('Falha ao carregar a animais');
            });
    };

    return(
        <div>
            <section className="banner parallax">
                <div className="banner-shadow">
                    <h1 className="banner-title">Adoção e anúncio de animais</h1>
                    <p className="banner-text">Faça seu cadastro e ajude os animais a encontarem um lar!</p>
                </div>
                <div className="banner-buttons">
                    <a className="btn btnBanner">Login entidade</a>
                    <a className="btn btnBanner ms-4">Login adotante</a>
                </div>
            </section>
            <h1 className="text-center titulo">Animais para adoção</h1>
            <div className="row row-cols-1 row-cols-md-4 g-4 mb-2 mt-2">
                {data.map((animais: Animais) => (
                    <div className="col">
                        <Card
                            style={{ width: 300 }}
                            cover={
                            <img
                                alt="animais"
                                src={animais.imagens/*<img alt="animais" src={animais.imagens}/>*/}
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
            {apiError && (<Alert message="Erro" description={apiError} type="error" showIcon/>)}
            <h1 className="text-center mb-2 titulo">Informações Uteis</h1>
            <div className="row row-cols-1 justify-content-center g-4 mt-1">
                <Card
                    id="cardFixBg"
                    className="col-sm-5 col-md-4 col-lg-2 me-2 ms-2"
                    hoverable
                    style={{ width: 240 }}
                    cover={<img className="mt-2" alt="primeiro animal" src={PrimeiroAnimal}/>}
                >
                    <Meta title="Primeiro animal" description="Cuidados necessarios ao criar o primeiro animal." />
                </Card>                
                <Card
                    id="cardFixBg"
                    className="col-sm-5 col-md-4 col-lg-2 me-2 ms-2"
                    hoverable
                    style={{ width: 240 }}
                    cover={<img className="mt-2" alt="Denuncias" src={AnimailMausTratos}/>}
                >
                    <Meta title="Links para denuncias" description="Denuncie maus tratos e ajude os animais." />
                </Card>
                <Card
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