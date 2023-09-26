import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { Animais } from "../../commons/types";
import AnimaisService from "../../services/AnimaisService";

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
        <>
            <section className="banner parallax" id="home">
                <div className="banner-shadow">
                    <h1 className="banner-title">Adoção e anúncio de animais</h1>
                    <p className="banner-text">Faça seu cadastro e ajude os animais a encontarem um lar!</p>
                </div>
                <div className="banner-buttons">
                    <a className="btn btn-secondary">Login entidade</a>
                    <a className="btn btn-secondary ms-4">Login adotante</a>
                </div>
            </section>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {data.map((animais: Animais) => (
                    <div className="col">
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={animais.imagens}
                        >
                            <Meta title={animais.nome} description={animais.especie} />
                        </Card>
                    </div>
                ))}
            </div>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
        </>
    )
}