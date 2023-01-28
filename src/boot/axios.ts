import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({
  baseURL: 'https://netease-cloud-music-api-dongwa.vercel.app',
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
export default boot(({}) => {
  /** */
});

export { axios, api };
