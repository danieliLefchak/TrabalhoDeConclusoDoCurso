import { useEffect, useState } from "react";
import { LinksUteis } from "../../commons/interfaces";
import LinksUteisService from "../../services/LinksUteisService";
import { Alert, Card } from "antd";

export function ListaCuidadosAnimaisPage(){
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const categ = "Cuidados com animais";

        LinksUteisService.findAllByCategoria(categ)
            .then((response) => {
                setData(response.data);
                setApiError('');
            })
            .catch((error) => {
                setApiError('Falha ao carregar a links ');
                console.log('Falha ao carregar a links ', error);
            });
    };

    return(
        <div className="container altura-rem">
            <h1 className="text-center titulo">Cuidados com Animais</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4 mb-2 mt-2 d-flex justify-content-center align-items-center">
                {data.map((links: LinksUteis) => (
                    <div className="col col-md-12 col-lg-5">
                        <a href={links.link} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                            <Card
                                className="cardTam"
                                style={{ marginTop: 10 }}
                                type="inner"
                                title={links.titulo}
                            >
                                {links.descricao}
                            </Card>
                        </a>
                    </div>
                ))}
            </div>
            {apiError && (<Alert message="Erro" description={apiError} type="error" showIcon/>)}
        </div>
    )
}