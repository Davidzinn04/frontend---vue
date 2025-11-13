import api from './api';

export default {
  // Compatibilidade com chamadas que esperam `resourceService.getAll()`
  // Aceita um objeto de filtros como { search, status, ... }
  // e o converte para os query params que o json-server entende.
  getAll(filters = {}) {
    const params = {};
    if (filters.search) params.q = filters.search; // full-text search
    if (filters.status && filters.status !== 'all') params.status = filters.status;
    // preserve any other params (like pagination) passed explicitly
    Object.keys(filters).forEach((k) => {
      if (!['search', 'status'].includes(k)) params[k] = filters[k];
    });

    return api.get('/resources', { params });
  },
  async list(params) {
    const res = await api.get('/resources', { params });
    return res.data;
  },
  async get(id) {
    const res = await api.get(`/resources/${id}`);
    return res.data;
  },
  async create(payload) {
    const res = await api.post('/resources', payload);
    return res.data;
  },
  async update(id, payload) {
    const res = await api.put(`/resources/${id}`, payload);
    return res.data;
  },
  async remove(id) {
    const res = await api.delete(`/resources/${id}`);
    return res.data;
  }
};