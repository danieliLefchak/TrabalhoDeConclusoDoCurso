import { Card, Form, Input, TimePicker } from "antd";
import dayjs from "dayjs";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { Entidades } from "../../commons/interfaces";
import { ToastContainer, toast } from "react-toastify";

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

  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
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

    AuthService.cadastroEntidade(entidade)
      .then((response) => {
        console.log("Usuário entidade criado com sucesso!  ", response);
        navigate("/login");
      })
      .catch((error) => {
        toast("Erro ao criar usuário entidade.");
        console.error("Erro ao criar usuário entidade. ", error);
      });
  };

  return (
    <div className="container d-flex justify-content-center">
      <ToastContainer />
      <Card id="cardCad" className="mb-3 mt-5">
        <h2 id="cadText" className="text-center mb-5 mt-2">
          Cadastro de Entidades
        </h2>
        <Form layout="horizontal">
          <h6 id="cadText" className="text-center mb-4 fw-bolder">
            Informações para login
          </h6>
          <div className="row justify-content-center">
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                Nome de usuário
              </label>
              <Input
                value={form.user.username}
                name="username"
                onChange={onUserFieldChange}
              />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                Senha
              </label>
              <Input
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
            <Form.Item className="col-md-6 col-sm-12">
              <label id="cadText" className="form-label">
                Nome Fantasia
              </label>
              <Input
                name="nomeFant"
                value={form.nomeFant}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                CNPJ
              </label>
              <Input name="cnpj" value={form.cnpj} onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-2 col-sm-12">
              <label id="cadText" className="form-label">
                N° casa
              </label>
              <Input
                name="numero_casa"
                value={form.numero_casa.toString()}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                Endereço
              </label>
              <Input
                name="endereco"
                value={form.endereco}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-4 col-sm-12">
              <label id="cadText" className="form-label">
                Bairro
              </label>
              <Input name="bairro" value={form.bairro} onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-4 col-sm-12">
              <label id="cadText" className="form-label">
                Cidade
              </label>
              <Input name="cidade" value={form.cidade} onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-3 col-sm-12">
              <label id="cadText" className="form-label">
                Estado
              </label>
              <Input name="estado" value={form.estado} onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-4 col-sm-12">
              <label id="cadText" className="form-label">
                Telefone
              </label>
              <Input
                name="telefone"
                value={form.telefone}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                E-mail
              </label>
              <Input name="email" value={form.email} onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-6 col-sm-12">
              <label id="cadText" className="form-label">
                Mensagem
              </label>
              <Input
                name="mensagem"
                value={form.mensagem}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-3 col-sm-12">
              <label id="cadText" className="form-label me-2">
                Hora inicio
              </label>
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
            <Form.Item className="col-md-3 col-sm-12">
              <label id="cadText" className="form-label me-2">
                Hora termino
              </label>
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
