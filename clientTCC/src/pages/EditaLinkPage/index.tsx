import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinksUteisService from "../../services/LinksUteisService";
import { ToastContainer, toast } from 'react-toastify';

export function EditaLinkPage() {
  const { id } = useParams(); // Obtém o ID do link dos parâmetros da URL
  const [link, setLink] = useState({
    id: 0,
    link: "",
    titulo: "",
    descricao: "",
    categoria: "",
    entidade: "",
  });

  useEffect(() => {
    if (id) {
      // Carrega os detalhes do link com o ID fornecido
      LinksUteisService.findById(parseInt(id))
        .then((response) => {
          setLink(response.data);
        })
        .catch((error) => {
          toast('Falha ao carregar os detalhes do link');
          console.error('Falha ao carregar os detalhes do link', error);
        });
    }
  }, [id]);

  // Implemente a lógica para editar o link aqui

  return (
    <div className="container altura-rem">
      <ToastContainer />
      <h1 className="text-center titulo mt-3">Editar Link</h1>
      <div className="row">
        <div className="col">
          {/* Formulário para editar o link */}
          <form>
            <div className="mb-3">
              <label htmlFor="link" className="form-label">
                Link
              </label>
              <input
                type="text"
                className="form-control"
                id="link"
                name="link"
                value={link.link}
                onChange={(e) => setLink({ ...link, link: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">
                Título
              </label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                name="titulo"
                value={link.titulo}
                onChange={(e) => setLink({ ...link, titulo: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">
                Descrição
              </label>
              <textarea
                className="form-control"
                id="descricao"
                name="descricao"
                value={link.descricao}
                onChange={(e) => setLink({ ...link, descricao: e.target.value })}
              />
            </div>
            {/* Adicione mais campos de edição, se necessário */}
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
