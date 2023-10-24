
import { LinksUteis } from "../commons/interfaces";
import { api } from "../lib/axios";

const save = (links: LinksUteis) => {
    return api.post('/linksUteis', links);
}

const update = (id: number, links: LinksUteis) => {
    return api.put(`/linksUteis/${id}`, links);
}

const findAllByCategoria = (categoria: String) => {
    return api.get(`/linksUteis/findLinkUtil/${categoria}`);
}

const findById = (id: number) => {
    return api.get(`/linksUteis/${id}`);
}

const deleteById = (id: number) => {
    return api.delete(`/linksUteis/${id}`);
}

const LinksUteisService = {
    save,
    findAllByCategoria,
    findById,
    update,
    deleteById,
}

export default LinksUteisService;