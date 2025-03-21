import axios from 'axios';
import { store } from '../store/store';

axios.interceptors.request.use(
  (config) => {
    const { token } = store.getState().userData;
    config.baseURL = 'https://reqres.in/api';

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  () => {
    return Promise.reject('Ocorreu um erro !');
  },
);

export default axios;
