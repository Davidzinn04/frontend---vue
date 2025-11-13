import api from './api';

export default {
  // Compatibilidade com chamadas que esperam `resourceService.getAll()`
  // Aceita um objeto de filtros como { search, status, ... }
  // e o converte para os query params que o json-server entende.
  async getAll(filters = {}) {
    const params = {};
    if (filters.search) {
      // full-text search (global) and title-specific partial match
      params.q = filters.search;
      params.titulo_like = filters.search; // json-server field match (partial)
    }
    if (filters.status && filters.status !== 'all') params.status = filters.status;
    // preserve any other params (like pagination) passed explicitly
    Object.keys(filters).forEach((k) => {
      if (!['search', 'status'].includes(k)) params[k] = filters[k];
    });

    // Log curto para depuração de filtros em dev
    try {
      console.debug('[resourceService] getAll params:', params);
    } catch (e) {}

    // Faz a chamada ao backend e obtém os dados
    const res = await api.get('/resources', { params });
    let data = res && res.data ? res.data : [];

    // Fallback: se o backend não aplicou o filtro (retornou todos), aplica filtro localmente
    if (filters.search && Array.isArray(data)) {
      const term = String(filters.search).toLowerCase();
      data = data.filter((item) => {
        const titulo = item.titulo ? String(item.titulo).toLowerCase() : '';
        const autor = item.autor ? String(item.autor).toLowerCase() : '';
        // busca em título e autor como fallback
        return titulo.includes(term) || autor.includes(term);
      });
    }
    if (filters.status && filters.status !== 'all' && Array.isArray(data)) {
      data = data.filter((item) => item.status === filters.status);
    }

    // Mantém compatibilidade com App.vue que espera `response.data`
    return { data };
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