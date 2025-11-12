import api from './api';

export default {
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