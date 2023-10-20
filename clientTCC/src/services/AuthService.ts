import { Entidades, PossiveisAdotantes, UserLogin } from "../commons/interfaces";
import { api } from "../lib/axios";

const cadastroAdotante = ( adotante: PossiveisAdotantes) => {
    return api.post('/possiveisAdotantes', adotante);
}

const cadastroEntidade = (entidade: Entidades) => {
    return api.post('/entidades', entidade);
}

const login = (user: UserLogin) => {
    return api.post('/login', user);
}

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
    }
    
    return token ? true : false;
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

const AuthService = {
    login,
    cadastroAdotante,
    cadastroEntidade,
    isAuthenticated,
    logout,
}
export default AuthService;