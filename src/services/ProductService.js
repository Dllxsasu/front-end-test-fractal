import axios from 'axios';

const API_BASE_URL = '/api/product';


const local = "http://localhost:5000/product";
const axiosInstance = axios.create({
  baseURL:  local 
});

const ProductService = {
  get: () => {
    return axiosInstance.get('/');
  },

  getById: (id) => {
    return axiosInstance.get(`/${id}`);
  },

  create: (obj) => {
    return axiosInstance.post('/', obj);
  },

  update: (id, obj) => {
    return axiosInstance.put(`/${id}`, obj);
  },

  delete: (id) => {
    return axiosInstance.delete(`/${id}`);
  }
};

export default ProductService;