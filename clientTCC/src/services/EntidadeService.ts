import { Entidades } from "../commons/interfaces";
import { api } from "../lib/axios";

const findByUser = ( user: string ) => {
    return api.get(`/entidades/findEntidadeByUser/${user}`)
}

const findAll = () => {
    return api.get('/entidades');
}

const deleteById = (id: number) => {
    return api.delete(`/entidades/${id}`);
}

const update = (id: number, entidade: Entidades) => {
    return api.put(`/entidades/${id}`, entidade);
}

const findById = ( id: number) => {
    return api.get(`/entidades/findById/${id}`);
}

const EntidadeService = {
    findByUser,
    findAll,
    deleteById,
    update,
    findById,
}

export default EntidadeService;