import { Entidades, NovaSenha } from "../commons/interfaces";
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

const update = (id: number, entidade: Entidades, novaSenha: NovaSenha) => {
    return api.put(`/entidades/editar/${id}`, {entidade, novaSenha});
}

const findById = ( id: number) => {
    return api.get(`/entidades/findById/${id}`);
}

const findByNomeFant = ( nome: string) => {
    return api.get(`/entidades/findByNomeFant/${nome}`);
}

const EntidadeService = {
    findByUser,
    findAll,
    deleteById,
    update,
    findById,
    findByNomeFant,
}

export default EntidadeService;