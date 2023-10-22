import { useEffect, useState } from "react";
import { LinksUteis } from "../../commons/interfaces";
import LinksUteisService from "../../services/LinksUteisService";
import { Card } from "antd";
import { ToastContainer, toast } from 'react-toastify';

export function ListaLinksDenunciaPage(){
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const categ = "Links para denuncia";

        LinksUteisService.findAllByCategoria(categ)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                toast('Falha ao carregar a links ');
                console.log('Falha ao carregar a links ', error);
            });
    };

    return(
        <div className="container altura-rem">
            <ToastContainer />
            <h1 className="text-center titulo">Links para Denúncia</h1>
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
        </div>
    )
}