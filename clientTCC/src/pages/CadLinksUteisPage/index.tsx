import { Card, Form, Input, Select } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { Entidades, LinksUteis } from "../../commons/interfaces";
import LinksUteisService from "../../services/LinksUteisService";
import { useNavigate } from "react-router-dom";
import EntidadeService from "../../services/EntidadeService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function CadLinksUteisPage() {
    const [form, setForm] = useState({
        link: '',
        titulo: '',
        descricao: '',
        categoria: '',
        entidade: {} as Entidades,
    });

    type FieldType = {
        link: '',
        titulo: '',
        categoria: '',
    }
    
    const navigate = useNavigate();
    var nomeStorage: any = localStorage.getItem("user");
    var nome = JSON.parse(nomeStorage).toString();
    const [entidades, setEntidade] = useState([]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            }
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        EntidadeService.findByUser(nome)
            .then((response) => {
                const entidadeData = response.data;

                if (entidadeData) {
                    setEntidade(entidadeData);
                    setForm((previousForm) => ({
                        ...previousForm,
                        entidade: entidadeData,
                    }));
                }
            })
            .catch((error) => {
                if(entidades===null){
                    console.log('O valor da entidade é nulo.');
                }
                console.log('Falha ao carregar a entidade. ', error);
                toast.error('Falha ao carregar a entidade.');
            });
    };

    const onClickCadastraLinks = () => {
        const links: LinksUteis = {
            ...form,
            entidade: {...form.entidade},
        };

        LinksUteisService.save(links)
            .then((response) => {
                console.log("Link criado com sucesso!  ", response);
                if(links.categoria === "Primeiro animal"){
                    navigate("/listaPrimeiroAnimal");
                } else if(links.categoria === "Cuidados com animais"){
                    navigate("/listaCuidados");
                } else {
                    navigate("/listaDenuncias");
                }
                console.log(links);
            })
            .catch((error) => {
                toast.error('Erro ao criar link.');
                console.error("Erro ao criar link. ", error);
            });
    }

    return(
        <div className="container-fluid d-flex justify-content-center">
            <ToastContainer />
            <Card id="cardCadLink" className="mb-3 mt-5">
                <h2 id="cadText" className="text-center mb-4 mt-2">Cadastro de Links Uteis</h2>
                <Form layout="vertical">
                    <h6 id="cadText" className="text-center mb-4 fw-bolder">Informações para cadastro</h6>
                    <div className="row justify-content-start ms-5"> 
                        <Form.Item<FieldType>
                                    label="Link"
                                    name="link"
                                    rules={[{ required: true, message: 'O campo link é obrigatório!' }]} 
                                className="col-md-5 col-sm-12">
                            <Input value={form.link} name="link" onChange={onChange} />
                        </Form.Item>
                        <Form.Item<FieldType>
                                    label="Título"
                                    name="titulo"
                                    rules={[{ required: true, message: 'O campo título é obrigatório!' }]} 
                                className="col-md-5 col-sm-12">
                            <Input value={form.titulo} name="titulo" onChange={onChange} />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label className="form-label">Descrição</label>
                            <Input value={form.descricao} name="descricao" onChange={onChange} />
                        </Form.Item>
                        <Form.Item<FieldType>
                                    label="Categoria"
                                    name="categoria"
                                    rules={[{ required: true, message: 'O campo categoria é obrigatório!' }]} 
                                className="col-md-5 col-sm-12">
                            <Select value={form.categoria} onChange={(value) => {setForm({ ...form, categoria: value });}}>

                                <Select.Option value="Primeiro animal">Primeiro animal</Select.Option>
                                <Select.Option value="Links para denuncia">Links para denuncia</Select.Option>
                                <Select.Option value="Cuidados com animais">Cuidados com animais</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                   
                                    
                    <div className="row justify-content-center mt-3">
                        <Form.Item  className="col-2">
                            <button type="submit" 
                                    className="btn btn-success"
                                    onClick={onClickCadastraLinks}>
                                        
                                Salvar
                            </button>
                        </Form.Item>
                    </div>
                    
                </Form>
            </Card>
        </div>
    )
}