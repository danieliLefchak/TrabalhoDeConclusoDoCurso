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

const AnimaisService = {
  save,
  findAll,
  findLastTenAnimals,
}

export default AnimaisService;