import api from './api';

const SUBRESOURCE_URL = '/subresources';

export const subresourceService = {
  // Read (Listagem por ID do Recurso Principal)
  getByResourceId(resourceId) {
    // Filtra pelo campo resourceId no db.json (ex: /subresources?resourceId=1)
    return api.get(`${SUBRESOURCE_URL}?resourceId=${resourceId}`);
  },
  // Create
  create(data) {
    return api.post(SUBRESOURCE_URL, { ...data, id: Date.now() });
  },
  // Update
  update(id, data) {
    return api.put(`${SUBRESOURCE_URL}/${id}`, data);
  },
  // Delete
  remove(id) {
    return api.delete(`${SUBRESOURCE_URL}/${id}`);
  },
};