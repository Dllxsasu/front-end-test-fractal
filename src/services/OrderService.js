import axios from 'axios';

const BASE_URL = 'http://localhost:8080/order';

const OrderService = {
  get: () => {
    return axios.get(`${BASE_URL}`);
  },

  getById: (id) => {
    return axios.get(`${BASE_URL}/${id}`);
  },

  create: (obj) => {
    return axios.post(BASE_URL, obj);
  },

  update: (id, obj) => {
    return axios.put(`${BASE_URL}/${id}`, obj);
  },

  delete: (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
  }
};

export default OrderService;