import axios from 'axios';

const axiosRequest = axios.create({
  baseURL: 'https://ourresume.pythonanywhere.com'
});

// axiosRequest.interceptors.response.use(
//   res => res,
//   err => {
//     return Promise.reject(err);
//   }
// );

export default axiosRequest;