import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Animais, Interessados, PossiveisAdotantes } from "../../commons/interfaces";
import AnimaisService from "../../services/AnimaisService";
import AdotantesService from "../../services/AdotantesService";
import InteressadosService from "../../services/InteressadosService";
import dayjs from 'dayjs';
import { ToastContainer, toast } from "react-toastify";
import { DatePicker, TimePicker } from "antd";
import EntidadeService from "../../services/EntidadeService";

export function DetalhesAnimaisPage(){
    const { id } = useParams();
    const [animal, setAnimal] = useState<Animais | null>(null);
    const [adotantes, setAdotandes] = useState<PossiveisAdotantes>();
    const [imagemPrincipal, setImagemPrincipal] = useState('');
    const [encontrado, setEncontrado] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [modalValue, setModalValue] = useState({
        adotantes: {} as PossiveisAdotantes,
	    animais: {} as Animais,
	    visto: '',
	    realizado: '',
	    cancelado: '',
	    data_visita: dayjs(),
	    horario_visita: dayjs(),
    });

    useEffect(() => {
        AnimaisService.findOne(parseInt(id!))
        .then((response) => {
            setAnimal(response.data);
            if (response.data.imagemNome && response.data.imagemNome.length > 0) {
            setImagemPrincipal(response.data.imagemNome[0]);
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar detalhes do animal', error);
        });

        loadData();
    }, [id]);

    const handleClickImagemMenor = (imageName: string) => {
        setImagemPrincipal(imageName);
    };

    const loadData = () => {
        const nomeStorage = localStorage.getItem("user");
        if (nomeStorage && nomeStorage !== 'undefined') {
            var nome = JSON.parse(nomeStorage).toString();

            AdotantesService.findByUser(nome)
                .then((response) => {
                    setAdotandes(response.data);
                    console.log("Adotante: ", response.data);
                    setIsUser(true);
                })
                .catch((error) => {
                    console.error('Erro ao buscar adotante', error);
                });

            EntidadeService.findByUser(nome)
            .then((response) => {
                setAdotandes(response.data);
                console.log("Entidade: ", response.data);
                setIsAdmin(true);
            })
            .catch((error) => {
                console.error('Erro ao buscar Entidade', error);
            });
            
        } else {
            console.log("Nome não encontrado");
        }
    };

    const onClickModalInteressado = () => {
        const nomeStorage = localStorage.getItem("user");
        if (nomeStorage && nomeStorage !== 'undefined') {
            setEncontrado(true);
            setModalVisible(true);
        } else {
            setEncontrado(false);
            setModalVisible(true);
        }        
    }

    const onClickCadastroInteressado = () => {
        const interessado: Interessados = {
            data_visita: modalValue.data_visita.toDate(),
            horario_visita: modalValue.horario_visita.format('HH:mm:ss'),
            adotantes: adotantes!,
            animais: animal!,
            visto: false,
            realizado: false,
            cancelado: false,
        }

        InteressadosService.save(interessado)
            .then((response) => {
                toast.success("Cadastrado com sucesso! ");
                console.log("Cadastrado com sucesso! ", response);
                setModalVisible(false)
            })
            .catch((error) => {
                console.error('Erro ao cadastrar em interessados', error);
                toast.error("Não foi possivel enviar para lista de interessados! ");
            });
    }

    if (!animal) {
        return <div className="container-fluid">Carregando...</div>;
    }

    return (
        <div className="container-fluid">
        <ToastContainer/>
        <h1 className="text-center mb-5 mt-3">Detalhes do Animal</h1>
        <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <img
                    src={`http://localhost:9000/imganimais/${imagemPrincipal}`}
                    alt="Imagem Principal"
                    className="img-fluid rounded"
                    style={{ width: '40rem'}}
                    />

                    <div>
                        {animal.imagemNome?.map((imageName, index) => (
                        <img
                            key={index}
                            src={`http://localhost:9000/imganimais/${imageName}`}
                            alt={`Imagem ${index + 1}`}
                            style={{ width: '10rem', filter: 'blur(0.8px)'}}
                            className="img-fluid rounded me-2 mt-2 mb-2"
                            onClick={() => handleClickImagemMenor(imageName)}
                        />
                        ))}
                    </div>
                </div>

                <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                    <h2 className="text-center mt-2 mb-4">{animal.nome}</h2>
                    <p>Esse animal possui {animal.idade} anos de idade.</p>
                    <p>Possui uma personalidade descrita como {animal.personalidade}.</p>
                    <p>Este animalzinho possui um porte {animal.porte}.</p>
                    <p>Possui o genero {animal.genero}.</p>
                    <p>Sua espécie é {animal.especie} sua raça é {animal.raca}.</p>
                    <h6 className="text-center mt-4 fw-bold mb-4">Informações importantes sobre o animal:</h6>
                    <p>Quais doenças possui? {animal.doencas}</p>
                    <p>De quias medicações faz uso? {animal.medicacoes}</p>
                </div>
                <Link to={`/pfPublic/${animal.entidade.nomeFant}`} className="text-decoration-none fst-italic text-end mt-2 mb-4 text-secondary">Clique para ver informações sobre onde este animal esta.</Link>
            </div>
            {isUser || !isAdmin ? <div className="row justify-content-center mt-3">
                <button type="submit" 
                        className="btn btn-success col-4 col-sm-3 col-md-3 col-lg-2"
                        onClick={onClickModalInteressado}>
                            
                    Tenho interesse
                </button>
                <p className="text-center mt-4 text-success fw-bold">Ao clicar sobre esse botão você concorada que seus os dados informados em "Cadastro de adotante" podem ser mostrados para a entidade que cadastrou esse animal.</p>
            </div> : <div></div>}

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        {encontrado ? (
                        <div>
                            <h5 className="fw-bold mb-4">Informe a data e horário desejado para visitar o animalzinho:</h5>
                            <p>Os horários de atendimento informados pela entidade são das <span className="fw-bold">{animal.entidade.inicio_atendimento}</span> até as <span className="fw-bold">{animal.entidade.fim_atendimento}</span>.</p>
                            <div className="mb-3">
                                <label className="fw-bold me-2">Data da visita:</label>
                                <DatePicker value={modalValue.data_visita} name="data_visita" onChange={(date) => {
                                        if (date) {
                                            setModalValue({ ...modalValue, data_visita: date });
                                        }
                                    }} />
                            </div>
                            <div>
                                <label className="fw-bold form-label me-2">Hora da visita:</label>
                                <TimePicker value={dayjs(modalValue.horario_visita, 'HH:mm:ss')} name="horario_visita" format="HH:mm" 
                                    onChange={(time) => {
                                        if (time) {
                                            setModalValue({ ...modalValue, horario_visita: time });
                                        }
                                    }}/>
                            </div>
                            <div>
                                <p className="text-format">** No dia da visita, deverão ser levados documentos como CPF, RG e Comprovante de Residência.</p>
                            </div>
                            <div className="row justify-content-center">
                                <button className="btn btn-success col-2 mt-3" onClick={onClickCadastroInteressado}>Salvar</button>
                                <button className="btn btn-danger col-2 mt-3 ms-3" onClick={() => setModalVisible(false)}>Fechar</button>
                            </div>
                        </div>
                        ) : (
                            <div>
                                <h5 className="fw-bold mb-4">Para realizar esta ação, faça cadastro como usuário ou faça login!</h5>
                                <div className="text-center fs-5">
                                    <p>Para conseguir demosntrar interesse nesse animalzinho vá para <Link to="/login" className="text-decoration-none text-success fw-bold">
                                    Login
                                    </Link> se já tem uma conta ou caso ainda não tenha conta faça um <Link to="/CadAdotantePage" className="text-decoration-none text-success fw-bold">
                                    Cadastro como adotante
                                    </Link> e agende uma data e um horário para visitar este animalzinho 
                                    no estabelecimento ou lar em que ele se encontra.</p>
                                </div>
                                <div className="row justify-content-center mt-5">
                                    <button className="btn btn-success col-2" onClick={() => setModalVisible(false)}>Fechar</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};