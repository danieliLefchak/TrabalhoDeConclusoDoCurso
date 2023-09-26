import { Animais } from "../commons/types";
import { api } from "../lib/axios";

const save = (animais: Animais) => {
    return api.post('/animais', animais);
}

const findAll = () => {
    return api.get('/animais');
}

const AnimaisService = {
    save,
    findAll
}

export default AnimaisService;