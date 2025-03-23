import axios from 'axios';

const axiosRequest = axios.create({
  baseURL: 'https://ourresume.pythonanywhere.com'
});

export default axiosRequest;