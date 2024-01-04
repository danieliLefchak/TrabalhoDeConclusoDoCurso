import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { NovaSenha, PossiveisAdotantes } from "../../commons/interfaces";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import AdotantesService from "../../services/AdotantesService";

export function EditaAdotantePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adotante, setAdotante] = useState<PossiveisAdotantes>({
    id: undefined,
    bairro: "",
    cidade: "",
    endereco: "",
    estado: "",
    numero_casa: 0,
    data_nascimento: dayjs().toDate(),
    email: "",
    nomeCompleto: "",
    possui_animal: "",
    profissao: "",
    quantidade_animais: 0,
    especie_animais: "",
    user: { id: undefined, username: "", password: "", tipoUsuario: "adotante" },
  });

  const [modalValue, setModalValue] = useState({
    novaSenha: '',
    confirmarSenha: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [nvSenError, setNvSenError] = useState("");
  const [confSenError, setConfSenError] = useState("");

  const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };  

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (id) {
      AdotantesService.findById(parseInt(id))
        .then((response) => {
          if (response.data) {
            setAdotante({
              id: response.data.id,
              bairro: response.data.bairro,
              cidade: response.data.cidade,
              endereco: response.data.endereco,
              estado: response.data.estado,
              numero_casa: response.data.numero_casa,
              data_nascimento: response.data.data_nascimento,
              email: response.data.email,
              nomeCompleto: response.data.nomeCompleto,
              possui_animal: response.data.possui_animal,
              profissao: response.data.profissao,
              quantidade_animais: response.data.quantidade_animais,
              especie_animais: response.data.especie_animais,
              user: response.data.user,
            });
          }
        })
        .catch((error) => {
          toast("Falha ao carregar os detalhes do adotante");
          console.error("Falha ao carregar os detalhes do adotante", error);
        });
    }
  }, [id]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setAdotante((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
  };

  const onModalValueChange = (field: string, value: string) => {
    setModalValue((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "novaSenha") {
      const isValid = isPasswordValid(value);
      setNvSenError(isValid ? "" : "Senha inválida! Deve conter 8 caracteres com letras maiúsculas, minúsculas e números.");

      if (isValid && value === modalValue.confirmarSenha) {
        setConfSenError("");
      } else if (value !== modalValue.confirmarSenha) {
        setNvSenError("As senhas não coincidem");
      }
    } else if (field === "confirmarSenha") {
      const isValid = isPasswordValid(value);
      setConfSenError(isValid ? "" : "Senha inválida! Deve conter 8 caracteres com letras maiúsculas, minúsculas e números.");

      if (isValid && value === modalValue.novaSenha) {
        setNvSenError("");
      } else if (value !== modalValue.novaSenha) {
        setConfSenError("As senhas não coincidem");
      }
    }
  };

  const onUserFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setAdotante((previousForm) => ({
      ...previousForm,
      user: {
        ...previousForm.user,
        [name]: value,
      },
    }));
  };

  const handleOk = () => {
    if(modalValue.novaSenha === modalValue.confirmarSenha){
      const senhas: NovaSenha = {
        novaSenha: modalValue.novaSenha,
        confirmarSenha: modalValue.confirmarSenha,
      }
  
      setModalValue(senhas);
      setModalVisible(false);
    }
  };

  const onClickEditaAdotante = () => {
    const adotantes: PossiveisAdotantes = {
      ...adotante,
      data_nascimento: adotante.data_nascimento,
      numero_casa: adotante.numero_casa!,
      quantidade_animais: adotante.quantidade_animais!,
      user: adotante.user,
    };

    AdotantesService.update(parseInt(id!), adotantes, modalValue)
      .then(() => {
        toast.success("Perfil editado com sucesso!");
        navigate('/MeusDados');
      })
      .catch((error) => {
        toast.error("Erro ao editar adotante.");
        console.error("Erro ao editar adotante. ", error);
      });
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      <h1 className="text-center titulo mt-3">Editar Perfil Adotante</h1>
      <div className="row justify-content-start ms-5">
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
                value={adotante.user.username}
                name="username"
                onChange={onUserFieldChange}
              />
            </Form.Item>
            <Form.Item className="text-center col-md-5 col-sm-12">
              <Button className="text-secondary fw-bold" type="link" onClick={showModal}>
                Clique aqui para alterar sua senha
              </Button>
            </Form.Item>
          </div>

          <h6 id="cadText" className="text-center mb-4 fw-bolder">
            Informações para cadastro
          </h6>
          <div className="row justify-content-start ms-5">
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                Nome completo
              </label>
              <Input
                value={adotante.nomeCompleto}
                name="nomeCompleto"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-6 col-sm-12">
              <label id="cadText" className="form-label">
                E-mail
              </label>
              <Input value={adotante.email} name="email" onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-2 col-sm-12">
              <label id="cadText" className="form-label me-2">
                Data de nascimento
              </label>
              <DatePicker
                    value={adotante.data_nascimento ? dayjs(adotante.data_nascimento) : undefined}
                    name="data_nascimento"
                    onChange={(dateString) => {
                    if (dateString) {
                        setAdotante({ ...adotante, data_nascimento: dateString });
                    }
                    }}
                />
            </Form.Item>
            <Form.Item className="col-md-4 col-sm-12">
              <label id="cadText" className="form-label">
                Rua
              </label>
              <Input
                value={adotante.endereco}
                name="endereco"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-4 col-sm-12">
              <label id="cadText" className="form-label">
                Bairro
              </label>
              <Input value={adotante.bairro} name="bairro" onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-3 col-sm-12">
              <label id="cadText" className="form-label">
                Cidade
              </label>
              <Input value={adotante.cidade} name="cidade" onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-2 col-sm-12">
              <label id="cadText" className="form-label">
                N°
              </label>
              <Input
                value={adotante.numero_casa.toString()}
                name="numero_casa"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-2 col-sm-12">
              <label id="cadText" className="form-label">
                Estado
              </label>
              <Input value={adotante.estado} name="estado" onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-3 col-sm-12">
              <label id="cadText" className="form-label">
                Profissão
              </label>
              <Input
                value={adotante.profissao}
                name="profissao"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-3 col-sm-12">
              <label id="cadText" className="form-label">
                Tem animais
              </label>
              <Select
                value={adotante.possui_animal}
                onChange={(value) => {
                  setAdotante({ ...adotante, possui_animal: value });
                }}
              >
                <Select.Option value="sim">Sim</Select.Option>
                <Select.Option value="nao">Não</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item className="col-md-4 col-sm-12">
              <label id="cadText" className="form-label">
                Especie dos animais
              </label>
              <Input
                value={adotante.especie_animais}
                name="especie_animais"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-2 col-sm-12">
              <label id="cadText" className="form-label">
                Quantos
              </label>
              <Input
                value={adotante.quantidade_animais.toString()}
                name="quantidade_animais"
                onChange={onChange}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="row justify-content-center mt-3">
        <Form.Item className="col-2">
          <button
            type="submit"
            className="btn btn-success"
            onClick={onClickEditaAdotante}
          >
            Salvar
          </button>
        </Form.Item>
      </div>

      <Modal
        title="Alterar Senha"
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Nova Senha" help={nvSenError} validateStatus={nvSenError ? "error" : ""}>
            <Input.Password value={modalValue.novaSenha} onChange={(e) => onModalValueChange('novaSenha', e.target.value)}/>
          </Form.Item>
          <Form.Item label="Confirmar senha" help={confSenError} validateStatus={confSenError ? "error" : ""}>
            <Input.Password value={modalValue.confirmarSenha} onChange={(e) => onModalValueChange('confirmarSenha', e.target.value)}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}