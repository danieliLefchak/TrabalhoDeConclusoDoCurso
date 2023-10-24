import { useEffect, useState } from "react";
import AnimaisService from "../../services/AnimaisService";
import { Card } from "antd";
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import { Animais, UserLogin } from "../../commons/interfaces";
import Meta from "antd/es/card/Meta";
import { ToastContainer, toast } from "react-toastify";
import UsuarioService from "../../services/UsuarioService";

export function ListaAnimaisPage(){
    const [data, setData] = useState([]);
    const [roleAdmin, setRoleAdmin] = useState(false);

    useEffect(() => {
        loadData();
        returnVal();
    }, []);

    const loadData = () => {
        AnimaisService.findAll()
        .then((response) => {
            if (response === null) {
                setData([]);
            } else {
                setData(response.data);
            }
        })
        .catch((error) => {
            toast('Falha ao carregar a animais');
            console.log('Falha ao carregar a animais', error);
        });
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
        <div className="altura-rem">
            <ToastContainer />
            <h1 className="text-center titulo mt-3">Animais para adoção</h1>
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
        </div>
    );
}