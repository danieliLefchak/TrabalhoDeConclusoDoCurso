import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Entidades, NovaSenha} from "../../commons/interfaces";
import { Button, Form, Input, Modal, TimePicker } from "antd";
import dayjs from "dayjs";
import EntidadeService from "../../services/EntidadeService";

export function EditaEntidadePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entidade, setEntidade] = useState<Entidades>({
    id: undefined,
    nomeFant: '',
    cnpj: '',
    endereco: '',
    cidade: '',
    bairro: '',
    estado: '',
    numero_casa: 0,
    telefone: '',
    email: '',
    mensagem: '',
    inicio_atendimento: '',
    fim_atendimento: '',
    user: { id: undefined, username: "", password: "", tipoUsuario: "entidade" },
  });

  const [modalValue, setModalValue] = useState({
    novaSenha: '',
    confirmarSenha: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [nvSenError, setNvSenError] = useState("");
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
      EntidadeService.findById(parseInt(id))
        .then((response) => {
          if (response.data) {
            setEntidade({
                id: response.data.id,
                nomeFant: response.data.nomeFant,
                cnpj: response.data.cnpj,
                endereco: response.data.endereco,
                cidade: response.data.cidade,
                bairro: response.data.bairro,
                estado: response.data.estado,
                numero_casa: response.data.numero_casa,
                telefone: response.data.telefone,
                email: response.data.email,
                mensagem: response.data.mensagem,
                inicio_atendimento: response.data.inicio_atendimento,
                fim_atendimento: response.data.fim_atendimento,
                user: response.data.user,
            });
          }
        })
        .catch((error) => {
          toast.error("Falha ao carregar os detalhe da entidade, ");
          console.error("Falha ao carregar os detalhes da entidade", error);
        });
    }
  }, [id]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setEntidade((previousForm) => {
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

    if (field === "novaSenha" || field === "confirmarSenha") {
      const isValid = isPasswordValid(value);
      if(!isValid){
        setNvSenError(isValid ? "" : "Senha inválida! Deve conter 8 caracteres com letras maiúsculas, minúsculas e números.");
      } else {
        if (modalValue.novaSenha !== modalValue.confirmarSenha) {
          setNvSenError("As senhas não coincidem");
        } else {
          setNvSenError("");
        }
      }
      
    }
  };

  const onUserFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setEntidade((previousForm) => ({
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

  const onClickEditaEntidades = () => {
    const entidades: Entidades = {
        ...entidade,
        user: entidade.user,
      };

    EntidadeService.update(parseInt(id!), entidades, modalValue)
      .then(() => {
        toast.success("Perfil editado com sucesso!");
        navigate('/MeusDados');
      })
      .catch((error) => {
        toast.error("Erro ao editar entidade.", error);
        console.error("Erro ao editar entidade. ", error);
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
                value={entidade.user.username}
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
            <Form.Item className="col-md-6 col-sm-12">
              <label id="cadText" className="form-label">
                Nome Fantasia
              </label>
              <Input
                name="nomeFant"
                value={entidade.nomeFant}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                CNPJ
              </label>
              <Input name="cnpj" value={entidade.cnpj} onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-2 col-sm-12">
              <label id="cadText" className="form-label">
                N° casa
              </label>
              <Input
                name="numero_casa"
                value={entidade.numero_casa.toString()}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                Endereço
              </label>
              <Input
                name="endereco"
                value={entidade.endereco}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-4 col-sm-12">
              <label id="cadText" className="form-label">
                Bairro
              </label>
              <Input name="bairro" value={entidade.bairro} onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-4 col-sm-12">
              <label id="cadText" className="form-label">
                Cidade
              </label>
              <Input name="cidade" value={entidade.cidade} onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-3 col-sm-12">
              <label id="cadText" className="form-label">
                Estado
              </label>
              <Input name="estado" value={entidade.estado} onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-4 col-sm-12">
              <label id="cadText" className="form-label">
                Telefone
              </label>
              <Input
                name="telefone"
                value={entidade.telefone}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                E-mail
              </label>
              <Input name="email" value={entidade.email} onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-6 col-sm-12">
              <label id="cadText" className="form-label">
                Mensagem
              </label>
              <Input
                name="mensagem"
                value={entidade.mensagem}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-3 col-sm-12">
              <label id="cadText" className="form-label me-2">
                Hora inicio
              </label>
              <TimePicker
                value={dayjs(entidade.inicio_atendimento, "HH:mm:ss")}
                format="HH:mm"
                name="inicio_atendimento"
                onChange={(time) => {
                  if (time) {
                    setEntidade({ ...entidade, inicio_atendimento: time });
                  }
                }}
              />
            </Form.Item>
            <Form.Item className="col-md-3 col-sm-12">
              <label id="cadText" className="form-label me-2">
                Hora termino
              </label>
              <TimePicker
                value={dayjs(entidade.fim_atendimento, "HH:mm:ss")}
                format="HH:mm"
                name="fim_atendimento"
                onChange={(time) => {
                  if (time) {
                    setEntidade({ ...entidade, fim_atendimento: time });
                  }
                }}
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
            onClick={onClickEditaEntidades}
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
          <Form.Item label="Confirmar senha" help={nvSenError} validateStatus={nvSenError ? "error" : ""}>
            <Input.Password value={modalValue.confirmarSenha} onChange={(e) => onModalValueChange('confirmarSenha', e.target.value)}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
