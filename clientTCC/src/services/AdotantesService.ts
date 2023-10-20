import { api } from "../lib/axios";

const findOne = ( id: number) => {
    return api.get(`/possiveisAdotantes/${id}`);
}

const findAll = () => {
    return api.get('/possiveisAdotantes');
}

const AdotantesService = {
    findOne,
    findAll,
}

export default AdotantesService;