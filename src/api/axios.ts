import { ref } from 'vue';
import { Notify } from 'quasar';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const CancelToken = axios.CancelToken;

const api = axios.create({
  baseURL: 'https://music.api.quasar-cn.cn',
  withCredentials: true,
});

//响应拦截
api.interceptors.response.use(
  (response) => {
    // console.log(response);
    if (response.status < 400) {
      return Promise.resolve(response);
    } else {
      Notify.create({
        color: 'red',
        message: response.data,
      });
      return Promise.reject(response);
    }
  },
  (err) => {
    Notify.create({
      color: 'red',
      message: err.toString(),
    });
    return Promise.reject(err);
  }
);

export function useGet<T>(url: string, params = {}, opt?: AxiosRequestConfig) {
  return useFetch<T>(url, {
    method: 'GET',
    params,
    ...opt,
  });
}

export function usePost<T>(url: string, data = {}, opt?: AxiosRequestConfig) {
  return useFetch<T>(url, {
    method: 'POST',
    data,
    ...opt,
  });
}

export function useFetch<T>(url: string, opt: AxiosRequestConfig) {
  const loading = ref(true);
  const data = ref<T>();
  const res = ref<AxiosResponse<T>>();
  const source = CancelToken.source();
  const timerstamp = Date.now().toString();
  if (opt.params) opt.params.timerstamp = timerstamp;
  if (opt.data) opt.data.timerstamp = timerstamp;
  (opt.cancelToken = source.token),
    api(url, opt)
      .then((r) => {
        loading.value = false;
        data.value = r.data;
        res.value = r;
        console.log('r', r);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          console.log('Request canceled', e.message);
          Notify.create({
            color: 'yellow',
            message: '已取消',
          });
        } else {
          throw e;
        }
      });

  return {
    loading,
    data,
    res,
    cancel: source.cancel,
  };
}

export { axios, api };
