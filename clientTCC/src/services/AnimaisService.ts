import { api } from "../lib/axios";

const save = (formData: FormData) => {
  return api.post("/animais/upload", formData);
}

const findAll = () => {
  return api.get('/animais');
}

const AnimaisService = {
  save,
  findAll
}

export default AnimaisService;