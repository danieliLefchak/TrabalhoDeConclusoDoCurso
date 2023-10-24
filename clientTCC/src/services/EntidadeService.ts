import { api } from "../lib/axios";

const findByUser = ( user: string ) => {
    return api.get(`/entidades/findEntidadeByUser/${user}`)
}

const findAll = () => {
    return api.get('/entidades');
}

const EntidadeService = {
    findByUser,
    findAll,
}

export default EntidadeService;