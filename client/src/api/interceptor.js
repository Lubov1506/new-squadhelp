import axios from 'axios';
import CONTANTS from '../constants';
import history from '../browserHistory';

const httpClient = axios.create({
  baseURL: CONTANTS.BASE_URL,
});
let accessToken;

httpClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem(CONTANTS.ACCESS_TOKEN);
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return config;
}, (err) => Promise.reject(err));

httpClient.interceptors.response.use((response) => {
  if (response.data.data.token) {
    window.localStorage.setItem(CONTANTS.REFRESH_TOKEN, response.data.data.refreshtoken);
  }
  return response;
}, (err) => {
  if (err.response.status === 419) {
    history.replace('/login');
  }
  if (err.response.status === 401) {
    history.replace('/login');
  }
  return Promise.reject(err);
});

export default httpClient;
