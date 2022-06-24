import axios from 'axios';
import CONSTANTS from '../constants';
import history from '../browserHistory';

const httpClient = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});
let accessToken;

httpClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return config;
}, (err) => Promise.reject(err));

httpClient.interceptors.response.use((response) => {
  if (response.data.data.token) {
    window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, response.data.data.refreshtoken);
  }
  return response;
}, (err) => {
  if (err.response.status === 419) {
const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN)
const {data:{data: {tokenPair: {access, refresh}}}} = httpClient.post('/auth/refresh', {refreshToken})
window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refresh)
err.config.headers.Authorization = `Bearer ${access}`
return axios.request(err.config)
  }
  if (err.response.status === 401) {
    history.replace('/login');
  }
  return Promise.reject(err);
});

export default httpClient;
