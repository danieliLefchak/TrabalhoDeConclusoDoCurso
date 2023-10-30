import { Button, Card, Form, Input, Select, Upload } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { Animais, Entidades } from "../../commons/interfaces";
import { useNavigate } from "react-router-dom";
import EntidadeService from "../../services/EntidadeService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnimaisService from "../../services/AnimaisService";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

export function CadAnimaisPage() {
  const [form, setForm] = useState({
    genero: "",
    idade: 0,
    medicacoes: "",
    nome: "",
    personalidade: "",
    porte: "",
    raca: "",
    especie: "",
    doencas: "",
    imagemNome: "",
    conteudoImagem: "",
    entidade: {} as Entidades,
  });

  const navigate = useNavigate();
  var nomeStorage: any = localStorage.getItem("user");
  var nome = JSON.parse(nomeStorage).toString();
  const [entidades, setEntidade] = useState([]);
  const [imagens, setImagens] = useState<File[]>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
  };

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
        if (entidades === null) {
          console.log("O valor da entidade é nulo.");
        }
        console.log("Falha ao carregar a entidade. ", error);
        toast.error("Falha ao carregar a entidade.");
      });
  };

  const onFileChangeHandler = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.fileList) {
      const fileList = info.fileList
        .filter((file) => !!file.originFileObj)
        .map((file) => file.originFileObj as File);
      setImagens(fileList);
    }
  };

  const onClickCadastraAnimais = () => {
    const animais: Animais = {
      ...form,
      idade: form.idade!,
      entidade: { ...form.entidade },
      imagemNome: imagens.map((imagem) => imagem.name),
      conteudoImagem: imagens.map((imagem) => imagem.type),
    };

    const formData = new FormData();
    for (let i = 0; i < imagens.length; i++) {
      formData.append("imagens", imagens[i]);
    }

    const blob = new Blob([JSON.stringify(animais)], {
      type: "application/json",
    });
    formData.append("animais", blob);

    AnimaisService.save(formData)
      .then((response) => {
        toast.success("Animal cadastrado com sucesso! ");
        console.log("Animal cadastrado com sucesso! ", response);
        navigate("/animais");
      })
      .catch((error) => {
        if (error.response.data && error.response.data.validationErrors) {
          console.error(
            "Falha ao salvar o animal. ",
            error.response.data.validationErrors
          );
        } else {
          toast.error("Falha ao salvar o animal.");
        }
      });
  };

  return (
    <div className="container d-flex justify-content-center">
      <ToastContainer />
      <Card id="cardCad" className="mb-3 mt-5">
        <h2 id="cadText" className="text-center mb-5 mt-2">
          Cadastro de Animais
        </h2>
        <Form layout="horizontal">
          <h6 id="cadText" className="text-center mb-5 fw-bolder">
            Informações para cadastro
          </h6>
          <div className="row justify-content-start ms-5">
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                Nome
              </label>
              <Input value={form.nome} name="nome" onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-3 col-sm-12">
              <label id="cadText" className="form-label">
                Genero
              </label>
              <Select
                value={form.genero}
                onChange={(value) => {
                  setForm({ ...form, genero: value });
                }}
              >
                <Select.Option value="Feminino">Fêmea</Select.Option>
                <Select.Option value="Masculino">Macho</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item className="col-md-2 col-sm-12">
              <label id="cadText" className="form-label me-2">
                Idade
              </label>
              <Input
                value={form.idade.toString()}
                name="idade"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                Doença
              </label>
              <Input value={form.doencas} name="doencas" onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                Medicações
              </label>
              <Input
                value={form.medicacoes}
                name="medicacoes"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                Personalidade
              </label>
              <Input
                value={form.personalidade}
                name="personalidade"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                Espécie
              </label>
              <Input value={form.especie} name="especie" onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                Raça
              </label>
              <Input value={form.raca} name="raca" onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                Porte
              </label>
              <Select
                value={form.porte}
                onChange={(value) => {
                  setForm({ ...form, porte: value });
                }}
              >
                <Select.Option value="Pequeno">Pequeno</Select.Option>
                <Select.Option value="Médio">Médio</Select.Option>
                <Select.Option value="Grande">Grande</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label me-2">
                Imagens
              </label>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                name="imagens"
                listType="picture"
                maxCount={3}
                multiple
                onChange={onFileChangeHandler}
              >
                <Button icon={<UploadOutlined />}>
                  Selecione no maximo 3 imagens
                </Button>
              </Upload>
              {/*<div>
                {imagens.map((imagem, index) => (
                  <img
                    key={index}
                    style={{ width: '100px', height: '100px', marginRight: '10px' }}
                    src={`http://localhost:9000/imganimais/${imagem.name}`}
                  />
                ))}
                </div>*/}
            </Form.Item>
          </div>

          <div className="row justify-content-center mt-4">
            <Form.Item className="col-2">
              <button
                type="submit"
                className="btn btn-success"
                onClick={onClickCadastraAnimais}
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
