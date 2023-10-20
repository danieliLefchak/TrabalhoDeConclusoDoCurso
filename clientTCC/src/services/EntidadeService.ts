import { api } from "../lib/axios";

const findByUser = ( user: string ) => {
    console.log(api.defaults.headers.common);
    return api.get(`/entidades/findEntidadeByUser/${user}`)
    .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.error('Erro de autenticação:', error);
        } else {
          console.error('Erro na solicitação:', error);
        }
      });
}

const findAll = () => {
    return api.get('/entidades');
}



const EntidadeService = {
    findByUser,
    findAll,
}

export default EntidadeService;