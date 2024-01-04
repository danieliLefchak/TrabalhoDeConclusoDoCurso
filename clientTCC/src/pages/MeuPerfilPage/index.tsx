import { useEffect, useState } from "react";
import { Entidades, PossiveisAdotantes, UserLogin } from "../../commons/interfaces";
import EntidadeService from "../../services/EntidadeService";
import Perfil2 from "../../assets/Perfil2.png";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AdotantesService from "../../services/AdotantesService";
import dayjs from 'dayjs';
import UsuarioService from "../../services/UsuarioService";
import { ToastContainer, toast } from 'react-toastify';
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import 'dayjs/locale/pt-br'

export function MeuPerfilPage() {
  var nomeStorage: any = localStorage.getItem("user");
  var nomeLogado = JSON.parse(nomeStorage).toString();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<UserLogin>({
    id: undefined,
    username: '',
    password: '',
	  tipoUsuario: '',
  });

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
    user:{ username: '', password: '', tipoUsuario: 'entidade' },
  });

  const [adotante, setAdotante] = useState<PossiveisAdotantes>({
    id:undefined,
    bairro: '',
	  cidade: '',
	  endereco: '',
	  estado: '',
	  numero_casa: 0,
	  data_nascimento: dayjs().toDate(),
	  email: '',
	  nomeCompleto: '',
	  possui_animal: '',
	  profissao: '',
	  quantidade_animais: 0,
	  especie_animais: '',
    user:{ username: '', password: '', tipoUsuario: 'adotante' },
  });

  useEffect(() => {
    loadUsuarioData();
  }, []);

  const loadUsuarioData = () => {
    UsuarioService.findByName(nomeLogado)
      .then((response) => {
        const userData = response.data;
        
        if (userData) {
          setUsuario({
            ...userData,
          });

          if(userData.tipoUsuario === "adotante"){
            AdotantesService.findByUser(nomeLogado)
              .then((response) => {
                const adotantesData = response.data;
                
                if (adotantesData) {
                  setAdotante({
                    ...adotantesData,
                  });
                  setIsAdmin(false);
                }
              })
              .catch((error) => {
                console.error("Falha ao carregar os detalhes do adotante: ", error);
              });
          } else if(userData.tipoUsuario === "entidade"){
            EntidadeService.findByUser(nomeLogado)
              .then((response) => {
                const entidadeData = response.data;
                
                if (entidadeData) {
                  setEntidade({
                    ...entidadeData,
                  });
                  setIsAdmin(true);
                }
              })
              .catch((error) => {
                console.error("Falha ao carregar os detalhes da entidade: ", error);
              });
          }
        }
      })
      .catch((error) => {
        console.error("Falha ao carregar os detalhes do usuario: ", error);
      });
  };

  const handleDelete = () => {
    if(usuario.tipoUsuario === "entidade"){
      EntidadeService.deleteById(entidade.id!)
      .then(() => {
          UsuarioService.deleteById(usuario.id!)
          .then(() => {
            toast.success("Perfil deletado com sucesso");
            AuthService.logout();
            window.location.reload();
          })
          .catch((error) => {
            console.error("Falha ao deletar usuario: ", error);
            toast.error("Falha ao deletar perfil");
          }); 
      })
      .catch((error) => {
        console.error("Falha ao deletar cadastro de entidade", error);
      });

    } else if(usuario.tipoUsuario === "adotante"){
      AdotantesService.deleteById(adotante.id!)
      .then(() => {
        UsuarioService.deleteById(usuario.id!)
          .then(() => {
            toast.success("Perfil deletado com sucesso");
            AuthService.logout();
            window.location.reload();
          })
          .catch((error) => {
            console.error("Falha ao deletar usuario: ", error);
            toast.error("Falha ao deletar perfil");
          });
      })
      .catch((error) => {
        console.error("Falha ao deletar cadastro de adotante ", error);
      });
    }
  };

  const handleEdit = () => {
    if(usuario.tipoUsuario === "entidade"){
      navigate(`/editaEntidade/${entidade.id}`);
    } else if(usuario.tipoUsuario === "adotante"){
      navigate(`/editaAdotante/${adotante.id}`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="bannerPrf parallax">
        <div>
          <img src={Perfil2} className="logoPrf rounded-circle" alt="Animais"/>
        </div>
        <div className="btnPrf">
          <p className="d-sm-none"> {/* Esta classe tornará apenas o ícone visível em telas pequenas */}
            <DeleteOutlined className="ms-2" key="delete" onClick={handleDelete}/>
          </p>
          <p className="d-sm-none"> {/* Esta classe tornará apenas o ícone visível em telas pequenas */}
            <EditOutlined className="ms-2" key="edit" onClick={handleEdit}/>
          </p>
          <p className="d-none d-sm-block"> {/* Esta classe tornará o texto visível em telas maiores que sm */}
            Deletar perfil: <DeleteOutlined className="ms-2" key="delete" onClick={handleDelete}/>
          </p>
          <p className="d-none d-sm-block"> {/* Esta classe tornará o texto visível em telas maiores que sm */}
            Editar perfil: <EditOutlined className="ms-2" key="edit" onClick={handleEdit}/>
          </p>
        </div>
      </div>
      
      <Card className="cardColor">
        <div className="text-center">
          <h2 className="mb-4 mt-3">Suas Informações</h2>
          <h5 className="mb-4 mt-3">Login de usuário:</h5>
          <div className="row justify-content-center">
            <div className="mb-3">
              <strong>Nome:</strong> {usuario.username}
            </div>
          </div>
          {isAdmin ? <div className="row">
          <h5 className="mb-4 mt-3">Sobre a Entidade:</h5>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Nome Fantasia:</strong> {entidade.nomeFant}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>CNPJ:</strong> {entidade.cnpj}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Endereço:</strong> {entidade.endereco}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Cidade:</strong> {entidade.cidade}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Bairro:</strong> {entidade.bairro}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Estado:</strong> {entidade.estado}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Número da Casa:</strong> {entidade.numero_casa}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Telefone:</strong> {entidade.telefone}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Email:</strong> {entidade.email}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Mensagem:</strong> {entidade.mensagem}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Início do Atendimento:</strong> {entidade.inicio_atendimento}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Fim do Atendimento:</strong> {entidade.fim_atendimento}
            </div>
          </div> : 
          <div className="row">
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Nome Completo:</strong> {adotante.nomeCompleto}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>E-mail:</strong> {adotante.email}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Profissão:</strong> {adotante.profissao}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Data Nasc.:</strong> {dayjs(adotante.data_nascimento).format('DD/MM/YYYY')}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Endereço:</strong> {adotante.endereco}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Cidade:</strong> {adotante.cidade}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Bairro:</strong> {adotante.bairro}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Estado:</strong> {adotante.estado}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Número da Casa:</strong> {adotante.numero_casa}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Possui animais:</strong> {adotante.possui_animal}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Espécie dos animais:</strong> {adotante.especie_animais}
            </div>
            <div className="col-md-4 col-sm-6 col-12 mb-3">
              <strong>Quantidade de animais:</strong> {adotante.quantidade_animais}
            </div>
          </div>}
        </div>
      </Card>
    </div>
  );
};
