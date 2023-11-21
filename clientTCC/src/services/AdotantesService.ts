import { NovaSenha, PossiveisAdotantes } from "../commons/interfaces";
import { api } from "../lib/axios";

const findOne = ( id: number) => {
    return api.get(`/possiveisAdotantes/${id}`);
}

const findByUser = ( user: string ) => {
    return api.get(`/possiveisAdotantes/findAdotanteByUser/${user}`)
}

const findAll = () => {
    return api.get('/possiveisAdotantes');
}

const deleteById = (id: number) => {
    return api.delete(`/possiveisAdotantes/${id}`);
}

const update = (id: number, adotante: PossiveisAdotantes, novaSenha: NovaSenha) => {
    return api.put(`/possiveisAdotantes/editar/${id}`, {adotante, novaSenha});
}

const findById = ( id: number) => {
    return api.get(`/possiveisAdotantes/findById/${id}`);
}

const AdotantesService = {
    findOne,
    findAll,
    findByUser,
    deleteById,
    update,
    findById,
}

export default AdotantesService;