import { useEffect, useState } from "react";
import { Entidades } from "../../commons/interfaces";
import EntidadeService from "../../services/EntidadeService";
import Perfil2 from "../../assets/Perfil2.png";
import { Card } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";

export function PerfilPublicoEntidades() {
  const { nome } = useParams();
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

  useEffect(() => {
    loadUsuarioData();
  }, []);

  const loadUsuarioData = () => {
    EntidadeService.findByNomeFant(nome!)
        .then((response) => {
        const entidadeData = response.data;
        
            if (entidadeData) {
                setEntidade({
                ...entidadeData,
                });
            }
        })
        .catch((error) => {
            console.error("Falha ao carregar os detalhes da entidade: ", error);
            toast.error("Falha ao carregar os detalhes da entidade.");
        });
  };

  return (
    <div>
      <ToastContainer />
      <div className="bannerPrfPublic parallax">
        <div>
          <img src={Perfil2} className="logoPrf rounded-circle" alt="Animais"/>
        </div>
      </div>
      
      <Card className="cardColor">
        <div className="text-center">
          <h2 className="mb-4 mt-3">Informações da Entidade</h2>
          
          <div className="row">
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
          </div> 
        </div>
      </Card>
    </div>
  );
};
