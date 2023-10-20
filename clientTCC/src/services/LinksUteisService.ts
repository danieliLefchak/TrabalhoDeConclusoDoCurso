
import { LinksUteis } from "../commons/interfaces";
import { api } from "../lib/axios";

const save = (links: LinksUteis) => {
    return api.post('/linksUteis', links);
}

const findAllByCategoria = (categoria: String) => {
    return api.get(`/linksUteis/findLinkUtil/${categoria}`);
}

const LinksUteisService = {
    save,
    findAllByCategoria,
}

export default LinksUteisService;