import { useEffect, useState } from "react";
import { Interessados } from "../../commons/interfaces";
import { Card } from "antd";
import InteressadosService from "../../services/InteressadosService";
//import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

export function ListaInteressadosPage(){
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState('');
    const [visto, setVisto] = useState(false);
    const [realizado, setRealizado] = useState(false);
    const [cancelado, setCancelado] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        InteressadosService.findAll()
            .then((response) => {
                setData(response.data);
                setVisto(response.data.visto);
                setRealizado(response.data.realizado);
                setCancelado(response.data.cancelado);
                setApiError('');
            })
            .catch((error) => {
                setApiError('Falha ao carregar os interessados ');
                console.log('Falha ao carregar os interessados ', error);
            });
    };

    /*const botoesHandle = () => {
        if(visto){
            return <EyeInvisibleOutlined key="visualizado" />
        } else {
            return <EyeOutlined key="visualizado" />
        }

        if(realizado){
            return <CheckCircleOutlined color="success" key="realizado" />
         } else {
             return <CheckCircleOutlined key="realizado" />
         }
 
         if(cancelado){
             return <CloseCircleOutlined color="danger" key="cancelado" />
         } else {
            return <CloseCircleOutlined key="cancelado" />
         }
        
    }*/

    return(
        <div className="container altura-rem">
            <h1 className="text-center titulo">Lista de interessados</h1>
            <div className="row row-cols-1 row-cols-md-4 g-4 mb-2 mt-2">
                {data.map((interessado: Interessados) => (
                    <div className="col-sm-5 col-md-4 col-lg-2 me-2 ms-2">
                        <Card title={interessado.animais.nome}>
                            <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title={interessado.adotantes.nomeCompleto}
                            actions={[]}
                            >
                                <p>{interessado.adotantes.email}</p>
                                <p>{interessado.adotantes.cidade}</p>
                                <p>{interessado.adotantes.bairro}</p>
                                <p>{interessado.adotantes.endereco}</p>
                                <p>{interessado.adotantes.numero_casa}</p>
                            </Card>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}