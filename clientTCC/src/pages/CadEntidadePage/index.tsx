import { Card, Form, Input, TimePicker } from "antd";
import dayjs from "dayjs";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { Entidades } from "../../commons/interfaces";
import { ToastContainer, toast } from "react-toastify";
import UsuarioService from "../../services/UsuarioService";

export function CadEntidadePage() {
  const [form, setForm] = useState({
    nomeFant: "",
    cnpj: "",
    endereco: "",
    cidade: "",
    bairro: "",
    estado: "",
    numero_casa: 0,
    telefone: "",
    email: "",
    mensagem: "",
    inicio_atendimento: dayjs(),
    fim_atendimento: dayjs(),
    user: { username: "", password: "", tipoUsuario: "entidade" },
  });

  type FieldType = {
    username: "",
    password: "",
    nomeFant: "",
    endereco: "",
    cidade: "",
    bairro: "",
    estado: "",
    inicio_atendimento: "",
    fim_atendimento: "",
  }

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

  const onClickCadastraEntidadeUsuario = () => {
    const entidade: Entidades = {
      ...form,
      numero_casa: form.numero_casa!,
      inicio_atendimento: form.inicio_atendimento.format("HH:mm:ss"),
      fim_atendimento: form.inicio_atendimento.format("HH:mm:ss"),
      user: {
        username: form.user.username,
        password: form.user.password,
        tipoUsuario: "entidade",
      },
    };

    UsuarioService.findByName(entidade.user.username)
      .then((responseName) => {
        nomeEncontrado = responseName.data.username;
      });

      if(nomeEncontrado === entidade.user.username){
        toast.warning("Nome de usuário deve ser único");
      } else if(nomeEncontrado === ""){
        AuthService.cadastroEntidade(entidade)
        .then((response) => {
          console.log("Usuário entidade criado com sucesso! ", response);
          toast.success("Usuário entidade criado com sucesso! ");
          navigate("/login");
        })
        .catch((error) => {
          toast.error("Erro ao criar usuário entidade.");
          console.error("Erro ao criar usuário entidade. ", error);
        });
      }
  };

  return (
    <div className="container d-flex justify-content-center">
      <ToastContainer />
      <Card id="cardCad" className="mb-3 mt-5">
        <h2 id="cadText" className="text-center mb-5 mt-2">
          Cadastro de Entidades
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
                        label="Nome Fantasia"
                        name="nomeFant"
                        rules={[{ required: true, message: 'O campo nome fantasia é obrigatório!'}]} 
                className="col-md-6 col-sm-12">
              <Input
                name="nomeFant"
                value={form.nomeFant}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label className="form-label">
                CNPJ
              </label>
              <Input name="cnpj" value={form.cnpj} onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-2 col-sm-12">
              <label className="form-label">
                N° casa
              </label>
              <Input
                name="numero_casa"
                value={form.numero_casa.toString()}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Endereço"
                        name="endereco"
                        rules={[{ required: true, message: 'O campo endereço é obrigatório!'}]} 
                className="col-md-5 col-sm-12">
              <Input
                name="endereco"
                value={form.endereco}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Bairro"
                        name="bairro"
                        rules={[{ required: true, message: 'O campo bairro é obrigatório!'}]} 
                className="col-md-4 col-sm-12">
              <Input name="bairro" value={form.bairro} onChange={onChange} />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Cidade"
                        name="cidade"
                        rules={[{ required: true, message: 'O campo cidade é obrigatório!'}]} 
                className="col-md-4 col-sm-12">
              <Input name="cidade" value={form.cidade} onChange={onChange} />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Estado"
                        name="estado"
                        rules={[{ required: true, message: 'O campo estado é obrigatório!'}]} 
                className="col-md-3 col-sm-12">
              <Input name="estado" value={form.estado} onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-4 col-sm-12">
              <label className="form-label">
                Telefone
              </label>
              <Input
                name="telefone"
                value={form.telefone}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12" help={emailError}
                validateStatus={emailError ? "error" : ""}>
              <label className="form-label">
                E-mail
              </label>
              <Input name="email" value={form.email} onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-6 col-sm-12">
              <label className="form-label">
                Mensagem
              </label>
              <Input
                name="mensagem"
                value={form.mensagem}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Hora inicio"
                        name="inicio_atendimento"
                        rules={[{ required: true, message: 'O campo hora inicio é obrigatório!'}]} 
                className="col-md-3 col-sm-12">
              <TimePicker
                value={dayjs(form.inicio_atendimento, "HH:mm:ss")}
                format="HH:mm"
                name="inicio_atendimento"
                onChange={(time) => {
                  if (time) {
                    setForm({ ...form, inicio_atendimento: time });
                  }
                }}
              />
            </Form.Item>
            <Form.Item<FieldType>
                        label="Hora termino"
                        name="fim_atendimento"
                        rules={[{ required: true, message: 'O campo hora termino é obrigatório!'}]} 
                className="col-md-3 col-sm-12">
              <TimePicker
                value={dayjs(form.fim_atendimento, "HH:mm:ss")}
                format="HH:mm"
                name="fim_atendimento"
                onChange={(time) => {
                  if (time) {
                    setForm({ ...form, fim_atendimento: time });
                  }
                }}
              />
            </Form.Item>
          </div>

          <div className="row justify-content-center mt-4">
            <Form.Item className="col-1">
              <button
                type="submit"
                className="btn btn-success"
                onClick={onClickCadastraEntidadeUsuario}
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
