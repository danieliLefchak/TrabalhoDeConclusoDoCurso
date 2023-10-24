import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LinksUteisService from "../../services/LinksUteisService";
import { ToastContainer, toast } from 'react-toastify';
import { Entidades, LinksUteis } from "../../commons/interfaces";
import { Form, Input, Select } from "antd";

export function EditaLinkPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState<LinksUteis>({
    id: undefined,
    link: '',
    titulo: '',
    descricao: '',
    categoria: '',
    entidade: {} as Entidades,
  });

  useEffect(() => {
    if (id) {
      LinksUteisService.findById(parseInt(id))
        .then((response) => {
          if(response.data){
            setLink({
              id: response.data.id,
              link: response.data.link,
              titulo: response.data.titulo,
              descricao: response.data.descricao,
              categoria: response.data.categoria,
              entidade: response.data.entidade,
            });
          }
        })
        .catch((error) => {
          toast('Falha ao carregar os detalhes do link');
          console.error('Falha ao carregar os detalhes do link', error);
        });
    }
  }, [id]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setLink((previousForm) => {
        return {
            ...previousForm,
            [name]: value,
        }
    });
  }

  const onClickEditaLinks = () => {
    console.log(link);
       LinksUteisService.update(parseInt(id!), link)
        .then((response) => {
            console.log("Usuário link criado com sucesso!  ", response);
            if(link.categoria === "Primeiro animal"){
                navigate("/listaPrimeiroAnimal");
            } else if(link.categoria === "Cuidados com animais"){
                navigate("/listaCuidados");
            } else {
                navigate("/listaDenuncias");
            }
        })
        .catch((error) => {
            toast.error('Erro ao criar link.');
            console.error("Erro ao criar link. ", error);
        });
  }

  return (
    <div className="container altura-rem">
      <ToastContainer />
      <h1 className="text-center titulo mt-3">Editar Link</h1>
      <div className="row justify-content-start ms-5"> 
        <Form.Item className="col-md-5 col-sm-12">
            <label id="cadText" className="form-label">Link</label>
            <Input value={link.link} name="link" onChange={onChange} />
        </Form.Item>
        <Form.Item className="col-md-5 col-sm-12">
            <label id="cadText" className="form-label">Título</label>
            <Input value={link.titulo} name="titulo" onChange={onChange} />
        </Form.Item>
        <Form.Item className="col-md-5 col-sm-12">
            <label id="cadText" className="form-label">Descrição</label>
            <Input value={link.descricao} name="descricao" onChange={onChange} />
        </Form.Item>
        <Form.Item className="col-md-5 col-sm-12">
            <label id="cadText" className="form-label">Categoria</label>
            <Select value={link.categoria} onChange={(value) => {setLink({ ...link, categoria: value });}}>

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
                      onClick={onClickEditaLinks}>
                          
                  Salvar
              </button>
          </Form.Item>
      </div>
    </div>
  );
}
