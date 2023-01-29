import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://music.api.quasar-cn.cn',
  withCredentials: true,
});

// 请求拦截
api.interceptors.request.use((cinfig: AxiosRequestConfig) => {
  return cinfig;
});

//响应拦截
api.interceptors.response.use(
  (response): any => {
    // console.log(response);
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { axios, api };
