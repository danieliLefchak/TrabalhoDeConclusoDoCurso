import { useEffect, useState } from "react";
import { LinksUteis, UserLogin } from "../../commons/interfaces";
import LinksUteisService from "../../services/LinksUteisService";
import { Button, Card } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";

export function ListaCuidadosAnimaisPage(){
    const [data, setData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const nomeStorage: any = localStorage.getItem("user");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const categ = "Cuidados com animais";

        LinksUteisService.findAllByCategoria(categ)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                toast('Falha ao carregar a links ');
                console.log('Falha ao carregar a links ', error);
            });

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
                        setIsAdmin(false);
                    } else if(userLogin.tipoUsuario === "entidade"){
                        setIsAdmin(true);
                    }
                    
                    console.log("NOME ", userLogin.username);
                    })
                    .catch((error) => {
                        console.error("Erro ao buscar usuário: ", error);
                    });
                }
    };

    const handleEdit = (linkId: number) => {
        LinksUteisService.findById(linkId)
            .then((response) =>{                
                navigate(`/editaLink/${response.data.id}`);
            })
            .catch((error) => {
                console.log('Falha ao carregar o link. ', error);
                toast.error('Falha ao carregar o link.');
            });
    };
    
    const handleDelete = (linkId: number) => {
        LinksUteisService.deleteById(linkId)
            .then(() => {
                toast.success('Link excluido com sucesso.');
                window.location.reload();
            })
            .catch(() => {
                toast.error('Falha ao excluir link.');
            });       
    };

    return(
        <div className="container-fluid">
            <ToastContainer />
            <h1 className="text-center titulo">Cuidados com Animais</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4 mb-2 mt-2 d-flex justify-content-center align-items-center">
                {data.map((links: LinksUteis) => (
                    <div className="col col-md-12 col-lg-5">
                        <Card
                            className="cardTam"
                            style={{ marginTop: 10 }}
                            type="inner"
                            title={links.titulo}
                            extra={isAdmin && (
                                    <div>
                                      <Button
                                        type="text"
                                        icon={<EditOutlined />}
                                        onClick={() => handleEdit(links.id!)}
                                      />
                                      <Button
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDelete(links.id!)}
                                      />
                                    </div>
                                  )}
                            >
                                <a href={links.link} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-black">{links.descricao}</a>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}