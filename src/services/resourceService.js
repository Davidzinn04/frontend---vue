import api from './api';

const RESOURCE_URL = '/resources';

export const resourceService = {
  // Read (Listagem com filtros opcionais)
  getAll(filters = {}) {
    // Converte o objeto de filtros em string de query (ex: ?titulo_like=term&_sort=data&_order=desc)
    const params = new URLSearchParams(filters).toString();
    return api.get(`${RESOURCE_URL}?${params}`);
  },
  // Read (Por ID)
  getById(id) {
    return api.get(`${RESOURCE_URL}/${id}`);
  },
  // Create
  create(data) {
    return api.post(RESOURCE_URL, { ...data, id: Date.now() }); // json-server adiciona o ID, mas aqui é um fallback
  },
  // Update
  update(id, data) {
    return api.put(`${RESOURCE_URL}/${id}`, data);
    // Ou api.patch(`${RESOURCE_URL}/${id}`, data) se for apenas atualização parcial
  },
  // Delete
  remove(id) {
    return api.delete(`${RESOURCE_URL}/${id}`);
  },
};