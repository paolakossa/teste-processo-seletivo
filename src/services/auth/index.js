import axios from '../axios';

export const authApi = async (userData) => {
  const { data } = await axios.post('/login', userData);

  return data;
};
