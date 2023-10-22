import { useEffect, useState } from "react";
import { LinksUteis, UserLogin } from "../../commons/interfaces";
import LinksUteisService from "../../services/LinksUteisService";
import { Button, Card } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UsuarioService from "../../services/UsuarioService";
import { useNavigate } from "react-router-dom";
import EntidadeService from "../../services/EntidadeService";

export function ListaPrimeiroAnimalPage(){
    const [data, setData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEntidade, setIsEntidade] = useState(false);
    const navigate = useNavigate();
    const [entidadeEncont, setEntidadeEncont] = useState([]);
    const nomeStorage: any = localStorage.getItem("user");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const categ = "Primeiro animal";

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
                })
                .catch((error) => {
                    console.error("Erro ao buscar usuário: ", error);
                });
            }
    };

    const handleEdit = (linkId: number) => {
        LinksUteisService.findById(linkId)
            .then((response) =>{
                const linkData = response.data;

                const linkEncontrado : LinksUteis = {
                    id: linkData.id,
                    link: linkData.link,
                    titulo: linkData.titulo,
                    descricao: linkData.descricao,
                    categoria: linkData.categoria,
                    entidade: linkData.entidade,
                };

                EntidadeService.findByUser(JSON.parse(nomeStorage).toString())
                .then((response) => {
                    const entidadeData = response.data;

                    if (entidadeData.id === linkEncontrado.entidade.id) {
                        navigate(`/editaLink/${linkEncontrado.id}`);
                    }
                })
                .catch((error) => {
                    console.log('Falha ao carregar a entidade. ', error);
                    toast.error('Falha ao carregar a entidade.');
                });
            })
            .catch((error) => {
                console.log('Falha ao carregar o link. ', error);
                toast.error('Falha ao carregar o link.');
            });
    };
    
      const handleDelete = (linkId: number) => {
        // Lógica para excluir o link com o ID linkId
    };

    return(
        <div className="container altura-rem">
            <ToastContainer />
            <h1 className="text-center titulo mt-3">Primeiro Animal</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4 mb-2 mt-2 d-flex justify-content-center align-items-center">
                {data.map((links: LinksUteis) => (
                    <div className="col col-md-12 col-lg-5">
                        <a href={links.link} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
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
                                {links.descricao}
                            </Card>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}