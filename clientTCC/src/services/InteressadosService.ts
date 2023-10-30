import { Interessados } from "../commons/interfaces";
import { api } from "../lib/axios";

const save = (interessados: Interessados) => {
    return api.post('/interessados', interessados);
}

const findOne = (id: number) => {
    return api.get(`/entidades/${id}`);
}

const findAll = () => {
    return api.get('/interessados');
}

const updateInteressado = (interessado: Interessados, id: number) => {
    return api.put(`/interessados/${id}`, interessado);
}

const InteressadosService = {
    save,
    findAll,
    findOne,
    updateInteressado,
}

export default InteressadosService;