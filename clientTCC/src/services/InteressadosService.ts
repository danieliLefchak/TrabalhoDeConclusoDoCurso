import { Interessados } from "../commons/interfaces";
import { api } from "../lib/axios";

const save = (interessados: Interessados) => {
    return api.post('/interessados', interessados);
}

const findOne = ( id: number) => {
    return api.get(`/entidades/${id}`);
}

const findAll = () => {
    return api.get('/interessados');
}

const InteressadosService = {
    save,
    findAll,
    findOne,
}

export default InteressadosService;