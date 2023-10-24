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

const UsuarioService = {
    findOne,
    findAll,
    findByName,
}
export default UsuarioService;