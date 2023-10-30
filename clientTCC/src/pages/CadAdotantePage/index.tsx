import { Card, DatePicker, Form, Input, Select } from "antd";
import { ChangeEvent, useState } from 'react';
import AuthService from "../../services/AuthService";
import dayjs from 'dayjs';
import { PossiveisAdotantes } from "../../commons/interfaces";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export function CadAdotantesPage() {
    const [form, setForm] = useState({
        bairro: '',
        cidade: '',
        endereco: '',
        estado: '',
        numero_casa: 0,
        data_nascimento: dayjs(),
        email: '',
        nomeCompleto: '',
        possui_animal: '',
        profissao: '',
        quantidade_animais: 0,
        especie_animais: '',
        user:{ username: '', password: '', tipoUsuario: 'adotante' },
    });

    const navigate = useNavigate();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            }
        });
    }

    const onUserFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => ({
            ...previousForm,
            user: {
                ...previousForm.user,
                [name]: value,
            },
        }));
    }

    const onClickCadastraAdotanteUsuario = () => {
        const adotante: PossiveisAdotantes = {
            ...form,
            data_nascimento: form.data_nascimento.toDate(),
            numero_casa: form.numero_casa!,
            quantidade_animais: form.quantidade_animais!,
            user:{
                username: form.user.username,
                password: form.user.password,
                tipoUsuario: "adotante",
            },
        };

        AuthService.cadastroAdotante(adotante)
            .then((response) => {
                console.log("Usuário adotante criado com sucesso!  ", response);
                navigate('/login');
            })
            .catch((error) => {
                toast("Erro ao criar usuário adotante.");
                console.error("Erro ao criar usuário adotante. ", error);
            });
    }

    return(
        <div className="container d-flex justify-content-center">
            <ToastContainer />
            <Card id="cardCad" className="mb-3 mt-5">
                <h2 id="cadText" className="text-center mb-5 mt-2">Cadastro de adotantes</h2>
                <Form layout="horizontal">

                    <h6 id="cadText" className="text-center mb-4 fw-bolder">Informações para login</h6>
                    <div className="row justify-content-center">
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Nome de usuário</label>
                            <Input value={form.user.username} name="username" onChange={onUserFieldChange} />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Senha</label>
                            <Input type="password" value={form.user.password} name="password" onChange={onUserFieldChange} />
                        </Form.Item>
                    </div>

                    <h6 id="cadText" className="text-center mb-4 fw-bolder">Informações para cadastro</h6>
                    <div className="row justify-content-start ms-5"> 
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Nome completo</label>
                            <Input value={form.nomeCompleto} name="nomeCompleto" onChange={onChange} />
                        </Form.Item>
                        <Form.Item className="col-md-6 col-sm-12">
                            <label id="cadText" className="form-label">E-mail</label>
                            <Input value={form.email} name="email" onChange={onChange} />
                        </Form.Item>
                        <Form.Item className="col-md-4 col-sm-12">
                            <label id="cadText" className="form-label me-2">Data de nascimento</label>
                            <DatePicker value={form.data_nascimento} name="nascimento"
                                        onChange={(date) => 
                                                    {
                                                        if (date) {
                                                            setForm({ ...form, data_nascimento: date });
                                                        }
                                                    }
                                                }
                            />
                        </Form.Item>
                        <Form.Item className="col-md-4 col-sm-12">
                            <label id="cadText" className="form-label">Rua</label>
                            <Input value={form.endereco} name="endereco" onChange={onChange} />
                        </Form.Item>
                        <Form.Item className="col-md-3 col-sm-12">
                            <label id="cadText" className="form-label">Bairro</label>
                            <Input value={form.bairro} name="bairro" onChange={onChange} />
                        </Form.Item>
                        <Form.Item className="col-md-3 col-sm-12">
                            <label id="cadText" className="form-label">Cidade</label>
                            <Input value={form.cidade} name="cidade" onChange={onChange} />
                        </Form.Item>
                        <Form.Item className="col-md-2 col-sm-12">
                            <label id="cadText" className="form-label">N°</label>
                            <Input value={form.numero_casa.toString()} name="numero_casa" onChange={onChange} />
                        </Form.Item>
                        <Form.Item className="col-md-2 col-sm-12">
                            <label id="cadText" className="form-label">Estado</label>
                            <Input value={form.estado} name="estado" onChange={onChange} />
                        </Form.Item>
                        <Form.Item className="col-md-3 col-sm-12">
                            <label id="cadText" className="form-label">Profissão</label>
                            <Input value={form.profissao} name="profissao" onChange={onChange} />
                        </Form.Item>
                        <Form.Item className="col-md-3 col-sm-12">
                            <label id="cadText" className="form-label">Tem animais</label>
                            <Select value={form.possui_animal} onChange={(value) => {setForm({ ...form, possui_animal: value });}}>
                                
                                <Select.Option value="sim">Sim</Select.Option>
                                <Select.Option value="nao">Não</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item className="col-md-4 col-sm-12">
                            <label id="cadText" className="form-label">Especie dos animais</label>
                            <Input value={form.especie_animais} name="especie_animais" onChange={onChange} />
                        </Form.Item>
                        <Form.Item className="col-md-2 col-sm-12">
                            <label id="cadText" className="form-label">Quantos</label>
                            <Input value={form.quantidade_animais.toString()} name="quantidade_animais" onChange={onChange} />
                        </Form.Item> 
                    </div>
                                    
                    <div className="row justify-content-center mt-4">
                        <Form.Item  className="col-1">
                            <button type="submit" 
                                    className="btn btn-success"
                                    onClick={onClickCadastraAdotanteUsuario}>
                                
                                
                                Salvar
                            </button>
                        </Form.Item>
                    </div>
                    
                </Form>
            </Card>
        </div>
    )
}