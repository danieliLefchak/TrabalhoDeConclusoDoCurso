import { Button, Card, Form, Input, Select, Upload } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { ChangeEvent, useEffect, useState } from "react";
import { Animais, Entidades, Imagem } from "../../commons/interfaces";
import { useNavigate } from "react-router-dom";
import EntidadeService from "../../services/EntidadeService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnimaisService from "../../services/AnimaisService";
import { UploadChangeParam } from "antd/lib/upload";
import imageCompression from "browser-image-compression";

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
    imagens: [] as Imagem[],
    entidade: {} as Entidades,
  });

  const navigate = useNavigate();
  var nomeStorage: any = localStorage.getItem("user");
  var nome = JSON.parse(nomeStorage).toString();
  const [entidades, setEntidade] = useState([]);
  const [images, setImages] = useState<Imagem[]>([]);

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

  const onFileChangeHandler = async (info: UploadChangeParam) => {
    if (info.fileList.length > 0) {
      const newImages = await Promise.all(
        info.fileList.map(async (file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj!);
  
          return new Promise<Imagem>(async (resolve) => {
            reader.onload = async () => {
              const options = {
                maxSizeMB: 0.5, 
                maxWidthOrHeight: 800, 
              };
  
              try {
                const compressedFile = await imageCompression(file.originFileObj!, options);
  
                const readerCompressed = new FileReader();
                readerCompressed.readAsDataURL(compressedFile);
  
                readerCompressed.onload = (e) => {
                  const base64CompressedData = e.target?.result as string || "";
  
                  resolve({
                    imagemNome: compressedFile.name,
                    conteudoImagem: base64CompressedData,
                    tipo: compressedFile.type || "",
                  });
                };
              } catch (error) {
                console.error("Erro na compressão da imagem", error);
              }
            };
          });
        })
      );
  
      setImages(newImages);
    }
  };

  const onClickCadastraAnimais = () => {
    const animais: Animais = {
      ...form,
      idade: form.idade!,
      entidade: { ...form.entidade },
    };
  
    const formData = new FormData();
  
    images.forEach((image, index) => {
      formData.append(`imagens[${index}].imagemNome`, image.imagemNome);
      formData.append(`imagens[${index}].conteudoImagem`, image.conteudoImagem);
      formData.append(`imagens[${index}].tipo`, image.tipo);
    });
  
    const animaisBlob = new Blob([JSON.stringify(animais)], {
      type: "application/json",
    });
  
    formData.append("animais", animaisBlob);
  
    AnimaisService.save(formData)
      .then((response) => {
        console.log("Animal cadastrado com sucesso!  ", response);
      })
      .catch((error) => {
        if (error.response.data && error.response.data.validationErrors) {
          console.error("Falha ao salvar o animal. ", error.response.data.validationErrors);
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
                <Select.Option value="fem">Fêmea</Select.Option>
                <Select.Option value="mac">Macho</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item className="col-md-2 col-sm-12">
              <label id="cadText" className="form-label me-2">
                Idade
              </label>
              <Input value={form.idade.toString()} name="idade" onChange={onChange} />
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
              <Input value={form.medicacoes} name="medicacoes" onChange={onChange} />
            </Form.Item>
            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label">
                Personalidade
              </label>
              <Input value={form.personalidade} name="personalidade" onChange={onChange} />
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
                <Select.Option value="peq">Pequeno</Select.Option>
                <Select.Option value="med">Médio</Select.Option>
                <Select.Option value="gra">Grande</Select.Option>
              </Select>
            </Form.Item>


            <Form.Item className="col-md-5 col-sm-12">
              <label id="cadText" className="form-label me-2">
                Imagens
              </label>
              <Upload
                name="imagens"
                accept=".jpg,.jpeg,.png"
                fileList={images.map((image, index) => ({
                  uid: index.toString(),
                  name: image.imagemNome,
                  status: "done",
                  url: `data:${image.tipo};base64,${btoa(image.conteudoImagem as string)}`,
                }))}
                onChange={onFileChangeHandler}
                listType="picture-card"
              >
                <div>
                  <FileImageOutlined />
                  <div className="ant-upload-text">Selecione imagens</div>
                </div>
              </Upload>
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
