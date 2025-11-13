import api from './api';

export default {
  async list(params) {
    const res = await api.get('/subresources', { params });
    return res.data;
  },
  async listByResourceId(resourceId) {
    const res = await api.get('/subresources', { params: { resourceId } });
    return res.data;
  },
  // Compatibilidade: alguns componentes chamam `getByResourceId`
  getByResourceId(resourceId) {
    return this.listByResourceId(resourceId);
  },
  async get(id) {
    const res = await api.get(`/subresources/${id}`);
    return res.data;
  },
  async create(payload) {
    const res = await api.post('/subresources', payload);
    return res.data;
  },
  async update(id, payload) {
    const res = await api.put(`/subresources/${id}`, payload);
    return res.data;
  },
  async remove(id) {
    const res = await api.delete(`/subresources/${id}`);
    return res.data;
  }
};