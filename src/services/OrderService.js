import axios from 'axios';
import { config } from '../core/constans';

const API_BASE_URL = '/api/order';

const local = "http://localhost:5000/order";
const axiosInstance = axios.create({
  baseURL:  local 
});

  
const OrderService = {
  get: () => {
    return axiosInstance.get('/');
  },

  getById: (id) => {
    return axiosInstance.get(`/${id}`);
  },

  create: (product) => {
    return axiosInstance.post('/', product);
  },

  update: (id, product) => {
    return axiosInstance.put(`/${id}`, product);
  },

  delete: (id) => {
    return axiosInstance.delete(`/${id}`);
  }
};

export default OrderService;