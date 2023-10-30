import { UserLogin } from "../commons/interfaces";
import { api } from "../lib/axios";

const findOne = ( id: number) => {
    return api.get(`/usuarios/${id}`);
}

const findAll = () => {
    return api.get('/usuarios');
}

const findByName = (nome: string) => {
    return api.get(`/usuarios/findByName/${nome}`);
}

const deleteById = (id: number) => {
    return api.delete(`/usuarios/${id}`);
}

const update = (id: number, user: UserLogin) => {
    return api.put(`/usuarios/${id}`, user);
}

const UsuarioService = {
    findOne,
    findAll,
    findByName,
    deleteById,
    update,
}

export default UsuarioService;