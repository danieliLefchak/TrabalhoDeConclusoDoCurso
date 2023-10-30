import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Animais, Entidades } from "../../commons/interfaces";
import { Button, Form, Input, Select, Upload } from "antd";
import AnimaisService from "../../services/AnimaisService";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

export function EditaAnimalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagens, setImagens] = useState<File[]>([]);
  const [animal, setAnimal] = useState<Animais>({
    id: undefined,
    genero: "",
    idade: 0,
    medicacoes: "",
    nome: "",
    personalidade: "",
    porte: "",
    raca: "",
    especie: "",
    doencas: "",
    imagemNome: [],
    conteudoImagem: [],
    entidade: {} as Entidades,
  });

  useEffect(() => {
    if (id) {
      AnimaisService.findOne(parseInt(id))
        .then((response) => {
          if (response.data) {
            setAnimal({
              id: response.data.id,
              genero: response.data.genero,
              idade: response.data.idade,
              medicacoes: response.data.medicacoes,
              nome: response.data.nome,
              personalidade: response.data.personalidade,
              porte: response.data.porte,
              raca: response.data.raca,
              especie: response.data.especie,
              doencas: response.data.doencas,
              imagemNome: response.data.imagemNome,
              conteudoImagem: response.data.conteudoImagem,
              entidade: response.data.entidade,
            });
          }
        })
        .catch((error) => {
          toast("Falha ao carregar os detalhes do animal");
          console.error("Falha ao carregar os detalhes do animal", error);
        });
    }
  }, [id]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setAnimal((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
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

  const onClickEditaAnimal = () => {
    const animais: Animais = {
        ...animal,
        imagemNome: imagens.map((imagem) => imagem.name),
        conteudoImagem: imagens.map((imagem) => imagem.type),
    };

    if(imagens.length === 0){
        AnimaisService.updateSemImg(parseInt(id!), animal)
        .then(() => {
            toast.success("Animal editado com sucesso!");
            navigate("/animais");
        })
        .catch((error) => {
            toast.error("Erro ao editar animal.");
            console.error("Erro ao editar animal. ", error);
        });
    } else{
        const formData = new FormData();
        for (let i = 0; i < imagens.length; i++) {
            formData.append("imagens", imagens[i]);
        }
    
        const blob = new Blob([JSON.stringify(animais)], {
            type: "application/json",
        });
        formData.append("animais", blob);
        
        AnimaisService.update(parseInt(id!), formData)
        .then(() => {
            toast.success("Animal editado com sucesso!");
            navigate("/animais");
        })
        .catch((error) => {
            toast.error("Erro ao editar animal.");
            console.error("Erro ao editar animal. ", error);
        });
    }
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      <h1 className="text-center titulo mt-3">Editar Animal</h1>
      <div className="row justify-content-start ms-5">
        <Form.Item className="col-md-5 col-sm-12">
          <label id="cadText" className="form-label">
            Nome
          </label>
          <Input value={animal.nome} name="nome" onChange={onChange} />
        </Form.Item>
        <Form.Item className="col-md-3 col-sm-12">
          <label id="cadText" className="form-label">
            Genero
          </label>
          <Select
            value={animal.genero}
            onChange={(value) => {
              setAnimal({ ...animal, genero: value });
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
            value={animal.idade.toString()}
            name="idade"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item className="col-md-5 col-sm-12">
          <label id="cadText" className="form-label">
            Doença
          </label>
          <Input value={animal.doencas} name="doencas" onChange={onChange} />
        </Form.Item>
        <Form.Item className="col-md-5 col-sm-12">
          <label id="cadText" className="form-label">
            Medicações
          </label>
          <Input
            value={animal.medicacoes}
            name="medicacoes"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item className="col-md-5 col-sm-12">
          <label id="cadText" className="form-label">
            Personalidade
          </label>
          <Input
            value={animal.personalidade}
            name="personalidade"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item className="col-md-5 col-sm-12">
          <label id="cadText" className="form-label">
            Espécie
          </label>
          <Input value={animal.especie} name="especie" onChange={onChange} />
        </Form.Item>
        <Form.Item className="col-md-5 col-sm-12">
          <label id="cadText" className="form-label">
            Raça
          </label>
          <Input value={animal.raca} name="raca" onChange={onChange} />
        </Form.Item>
        <Form.Item className="col-md-5 col-sm-12">
          <label id="cadText" className="form-label">
            Porte
          </label>
          <Select
            value={animal.porte}
            onChange={(value) => {
              setAnimal({ ...animal, porte: value });
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
        </Form.Item>
      </div>
      <div className="row justify-content-center mt-3">
        <Form.Item className="col-2">
          <button
            type="submit"
            className="btn btn-success"
            onClick={onClickEditaAnimal}
          >
            Salvar
          </button>
        </Form.Item>
      </div>
    </div>
  );
}
