import { useEffect, useState } from "react";
import { Interessados } from "../../commons/interfaces";
import { Card } from "antd";
import InteressadosService from "../../services/InteressadosService";
import { ToastContainer, toast } from 'react-toastify';
import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';

export function ListaInteressadosPage(){
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        InteressadosService.findAll()
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                toast('Falha ao carregar os interessados ');
                console.log('Falha ao carregar os interessados ', error);
            });
    };

    const handleButtonClick = (item: Interessados, property: 'visto' | 'realizado' | 'cancelado') => {
        
        const updatedItem = { ...item };

        updatedItem[property] = !updatedItem[property];
       
        InteressadosService.updateInteressado(updatedItem, updatedItem.id!)
            .then((response) => {
                console.log("Interessado editado com sucesso!  ", response); 
                window.location.reload();
            })
            .catch((error) => {
                toast('Falha ao editar interessado ');
                console.log('Falha ao editar interessado ', error);
            });
    };

    return(
        <div className="container-fluid">
            <ToastContainer />
            <h1 className="text-center titulo mt-3">Lista de interessados</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4 mb-2 mt-2 d-flex justify-content-center align-items-center">
                {data.map((interessado: Interessados) => (
                    <div className="col col-md-12 col-lg-5 me-2 ms-2">
                        <Card
                        className="cardTamColor"
                        style={{ marginTop: 16 }}
                        type="inner"
                        actions={[
                            <span key="visualizado" onClick={() => handleButtonClick(interessado, 'visto')}>
                                {interessado.visto ? (
                                    <EyeInvisibleOutlined style={{ color: 'blue' }} />
                                ) : (
                                    <EyeOutlined/>
                                )}
                            </span>,
                            <span key="realizado" onClick={() => handleButtonClick(interessado, 'realizado')}>
                                {interessado.realizado ? (
                                    <CheckCircleOutlined style={{ color: 'green' }} />
                                ) : (
                                    <CheckCircleOutlined />
                                )}
                            </span>,
                            <span key="cancelado" onClick={() => handleButtonClick(interessado, 'cancelado')}>
                                {interessado.cancelado ? (
                                    <CloseCircleOutlined style={{ color: 'red' }} />
                                ) : (
                                    <CloseCircleOutlined />
                                )}
                            </span>
                        ]}
                        >
                            <h4 className="mb-3">{interessado.animais.nome}</h4>
                            <p className="fw-bold">{interessado.adotantes.nomeCompleto}</p>
                            <p className="me-3"><strong>E-mail: </strong>{interessado.adotantes.email}</p>
                            <div className="d-flex">
                                <p className="me-3"><strong>Profissão: </strong>{interessado.adotantes.profissao}</p>
                                <p><strong>Data Nasc.: </strong>{dayjs(interessado.adotantes.data_nascimento).format('DD/MM/YYYY')}</p>
                            </div>
                            
                            <div className="d-flex">
                                <p className="me-3"><strong>Cidade: </strong>{interessado.adotantes.cidade}</p>
                                <p><strong>Bairro: </strong>{interessado.adotantes.bairro}</p>
                            </div>
                            <div className="d-flex">
                                <p className="me-3"><strong>Rua: </strong>{interessado.adotantes.endereco}</p>
                                <p><strong>N°: </strong>{interessado.adotantes.numero_casa}</p>
                            </div>
                            <div className="d-flex">
                                <p className="me-3"><strong>Tem animais: </strong>{interessado.adotantes.possui_animal}</p>
                                <p><strong>Quantidade: </strong>{interessado.adotantes.quantidade_animais}</p>
                            </div>
                            <div className="d-flex">
                                <p className="me-3"><strong>Data visita: </strong>{dayjs(interessado.data_visita).format('DD/MM/YYYY')}</p>
                                <p><strong>Horário visita: </strong>{interessado.horario_visita}</p>
                            </div>
                            
                            
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}