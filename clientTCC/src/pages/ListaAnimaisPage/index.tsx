import { useEffect, useState } from "react";
import AnimaisService from "../../services/AnimaisService";
import { Alert, Card, Empty } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import semImagem from "../../assets/semImagem.png";
import { Animais } from "../../commons/interfaces";
import Meta from "antd/es/card/Meta";

export function ListaAnimaisPage(){
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        AnimaisService.findAll()
            .then((response) => {
                if(response === null){
                    <Empty />;
                } else {
                    setData(response.data);
                    setApiError('');
                }
            })
            .catch((error) => {
                setApiError('Falha ao carregar a animais');
                console.log('Falha ao carregar a animais', error);
            });
    };

    return(
        <div className="altura-rem">
            <h1 className="text-center titulo">Animais para adoção</h1>
            <div className="row row-cols-1 row-cols-md-4 g-4 mb-2 mt-2">
                {data.map((animais: Animais) => (
                    <div className="col">
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                alt="animais"
                                src={animais.imagens.length > 0 ? animais.imagens[0].conteudoImagem : semImagem}
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
        </div>
    );
}