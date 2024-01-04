import { Card, DatePicker, Form, Input, Select } from "antd";
import { ChangeEvent, useState } from "react";
import AuthService from "../../services/AuthService";
import dayjs from "dayjs";
import { PossiveisAdotantes } from "../../commons/interfaces";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UsuarioService from "../../services/UsuarioService";

export function CadAdotantesPage() {
  const [form, setForm] = useState({
    bairro: "",
    cidade: "",
    endereco: "",
    estado: "",
    numero_casa: 0,
    data_nascimento: dayjs(),
    email: "",
    nomeCompleto: "",
    possui_animal: "",
    profissao: "",
    quantidade_animais: 0,
    especie_animais: "",
    user: { username: "", password: "", tipoUsuario: "adotante" },
  });

  type FieldType = {
    username: "";
    password: "";
    bairro: "";
    cidade: "";
    data_nascimento: "";
    endereco: "";
    estado: "";
    nomeCompleto: "";
    possui_animal: "";
    profissao: "";
    quantidade_animais: "";
    email: "",
  };
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  var nomeEncontrado = "";

  const isEmailValid = (email: string) => {
    const emailRegex = /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });

    if (name === "email") {
        const isValid = isEmailValid(value);
        setEmailError(isValid ? "" : "Formato de e-mail inválido");
    } 
  };

  const onUserFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => ({
      ...previousForm,
      user: {
        ...previousForm.user,
        [name]: value,
      },
    }));

    if (name === "password") {
        const isValid = isPasswordValid(value);
        setPasswordError(isValid ? "" : "Senha inválida! Deve conter 8 caracteres com letras maiúsculas, minúsculas e números.");
    }
  };

  const onClickCadastraAdotanteUsuario = () => {
    const adotante: PossiveisAdotantes = {
      ...form,
      data_nascimento: form.data_nascimento.toDate(),
      numero_casa: form.numero_casa!,
      quantidade_animais: form.quantidade_animais!,
      user: {
        username: form.user.username,
        password: form.user.password,
        tipoUsuario: "adotante",
      },
    };

    UsuarioService.findByName(adotante.user.username)
        .then((responseName) => {
            nomeEncontrado = responseName.data.username;

            if (nomeEncontrado === adotante.user.username) {
              toast.warning("Nome de usuário deve ser único");
            } else if (nomeEncontrado === "" || nomeEncontrado == null) {
              AuthService.cadastroAdotante(adotante)
                .then((response) => {
                  console.log("Usuário adotante criado com sucesso!  ", response);
                  toast.success("Usuário adotante criado com sucesso!  ");
                  navigate("/login");
                })
                .catch((error) => {
                  toast.error("Erro ao criar usuário adotante.");
                  console.error("Erro ao criar usuário adotante. ", error);
                });
            }
        });
  };

  return (
    <div className="container d-flex justify-content-center">
      <ToastContainer />
      <Card id="cardCad" className="mb-3 mt-5">
        <h2 id="cadText" className="text-center mb-5 mt-2">
          Cadastro de adotantes
        </h2>
        <Form layout="vertical">
          <h6 id="cadText" className="text-center mb-4 fw-bolder">
            Informações para login
          </h6>
          <div className="row justify-content-center">
            <Form.Item<FieldType>
                        label="Nome de usuário"
                        name="username"
                        rules={[{ required: true, message: 'O campo nome de usuário é obrigatório!' }]} 
                className="col-md-5 col-sm-12">
              <Input
                value={form.user.username}
                name="username"
                onChange={onUserFieldChange}
              />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Senha"
                        name="password"
                        rules={[{ required: true, message: 'O campo senha é obrigatório!' }]} 
                className="col-md-5 col-sm-12" help={passwordError}
                validateStatus={passwordError ? "error" : ""}>
              <Input.Password
                type="password"
                value={form.user.password}
                name="password"
                onChange={onUserFieldChange}
              />
            </Form.Item>
          </div>

          <h6 id="cadText" className="text-center mb-4 fw-bolder">
            Informações para cadastro
          </h6>
          <div className="row justify-content-start ms-5">
            <Form.Item<FieldType>
                        label="Nome completo"
                        name="nomeCompleto"
                        rules={[{ required: true, message: 'O campo nome completo é obrigatório!' }]} 
                className="col-md-5 col-sm-12">
              <Input
                value={form.nomeCompleto}
                name="nomeCompleto"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item<FieldType>
                        label="E-mail"
                        name="email"
                        rules={[{ required: true, message: 'O campo e-mail é obrigatório!' }]} 
                className="col-md-6 col-sm-12"
                help={emailError}
                validateStatus={emailError ? "error" : ""}>
              <Input value={form.email} name="email" onChange={onChange} />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Data de nascimento"
                        name="data_nascimento"
                        rules={[{ required: true, message: 'O campo data de nascimento é obrigatório!' }]} 
                className="col-md-4 col-sm-12">
              <DatePicker
                value={form.data_nascimento}
                name="data_nascimento"
                format="DD/MM/YYYY"
                onChange={(date) => {
                  if (date) {
                    setForm({ ...form, data_nascimento: date });
                  }
                }}
              />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Rua"
                        name="endereco"
                        rules={[{ required: true, message: 'O campo rua é obrigatório!' }]} 
                className="col-md-4 col-sm-12">
              <Input
                value={form.endereco}
                name="endereco"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Bairro"
                        name="bairro"
                        rules={[{ required: true, message: 'O campo bairro é obrigatório!' }]} 
                className="col-md-3 col-sm-12">
              <Input value={form.bairro} name="bairro" onChange={onChange} />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Cidade"
                        name="cidade"
                        rules={[{ required: true, message: 'O campo cidade é obrigatório!' }]} 
                className="col-md-3 col-sm-12">
              <Input value={form.cidade} name="cidade" onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-2 col-sm-12">
              <label className="form-label">
                N°
              </label>
              <Input
                value={form.numero_casa.toString()}
                name="numero_casa"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Estado"
                        name="estado"
                        rules={[{ required: true, message: 'O campo estado é obrigatório!' }]} 
                className="col-md-2 col-sm-12">
              <Input value={form.estado} name="estado" onChange={onChange} />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Profissão"
                        name="profissao"
                        rules={[{ required: true, message: 'O campo profissão é obrigatório!' }]} 
                className="col-md-3 col-sm-12">
              <Input
                value={form.profissao}
                name="profissao"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Tem animais"
                        name="possui_animal"
                        rules={[{ required: true, message: 'O campo tem animais é obrigatório!' }]} 
                className="col-md-3 col-sm-12">
              <Select
                value={form.possui_animal}
                onChange={(value) => {
                  setForm({ ...form, possui_animal: value });
                }}
              >
                <Select.Option value="sim">Sim</Select.Option>
                <Select.Option value="nao">Não</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item className="col-md-4 col-sm-12">
              <label className="form-label">
                Especie dos animais
              </label>
              <Input
                value={form.especie_animais}
                name="especie_animais"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Quantos"
                        name="quantidade_animais"
                        rules={[{ required: true, message: 'O campo quantos é obrigatório!' }]} 
                className="col-md-2 col-sm-12">
              <Input
                value={form.quantidade_animais.toString()}
                name="quantidade_animais"
                onChange={onChange}
              />
            </Form.Item>
          </div>

          <div className="row justify-content-center mt-4">
            <Form.Item className="col-1">
              <button
                type="submit"
                className="btn btn-success"
                onClick={onClickCadastraAdotanteUsuario}
              >
                Salvar
              </button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
}
