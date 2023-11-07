import { Animais } from "../commons/interfaces";
import { api } from "../lib/axios";

const save = (formData: FormData) => {
  return api.post("/animais/upload", formData);
}

const findAll = () => {
  return api.get('/animais');
}

const findLastTenAnimals = () => {
  return api.get('/animais/lista');
}

const findOne = ( id: number) => {
  return api.get(`/animais/${id}`);
}

const deleteById = (id: number) => {
  return api.delete(`/animais/${id}`);
}

const update = (id: number, formData: FormData) => {
  return api.put(`/animais/upload/${id}`, formData);
}

const updateSemImg = (id: number, animal: Animais) => {
  return api.put(`/animais/${id}`, animal);
}

const findByPorte = ( porte: string) => {
  return api.get(`/animais/listaPorte/${porte}`);
}

const findByEspecie = ( especie: string) => {
  return api.get(`/animais/listaEspecie/${especie}`);
}

const AnimaisService = {
  save,
  findAll,
  findOne,
  findLastTenAnimals,
  deleteById,
  update,
  updateSemImg,
  findByPorte,
  findByEspecie,
}

export default AnimaisService;