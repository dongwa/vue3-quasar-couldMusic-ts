import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
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
      return response.data;
    } else {
      return Promise.reject(response);
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axios, api };
