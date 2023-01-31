import { Ref, ref } from 'vue';
import { Notify } from 'quasar';
import axios, {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
  CancelTokenSource,
} from 'axios';
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

export interface IFetchControler<D> {
  loading: boolean;
  data: D;
  source: CancelTokenSource;
}

export interface FetchReturn<D> {
  cancel: Canceler;
  loading: Ref<boolean>;
  data: Ref<D | undefined>;
  source: Ref<CancelTokenSource>;
  response: Ref<AxiosResponse<D> | undefined>;
}

export type FetchControler<D> = ReturnType<typeof useFetchControler<D>>;

export type FetchConfig<D> = AxiosRequestConfig & {
  controller?: FetchControler<D>;
};

export function useFetchControler<D>() {
  return {
    loading: ref(true),
    data: ref<D>(),
    source: ref(CancelToken.source()),
  };
}

export function useGet<D>(url: string, params = {}, opt: FetchConfig<D> = {}) {
  return useFetch<D>(url, {
    method: 'GET',
    params,
    ...opt,
  });
}

export function usePost<D>(url: string, data = {}, opt: FetchConfig<D> = {}) {
  return useFetch<D>(url, {
    method: 'POST',
    data,
    ...opt,
  });
}

export function useFetch<D>(
  url: string,
  opt: FetchConfig<D> = {}
): FetchReturn<D> & Promise<FetchReturn<D>> {
  const response = ref<AxiosResponse<D>>();
  const timerstamp = Date.now().toString();
  const controller = opt?.controller || useFetchControler<D>();
  opt.cancelToken = controller.source.value.token;
  if (opt.params) opt.params.timerstamp = timerstamp;
  if (opt.data) opt.data.timerstamp = timerstamp;

  const p = api(url, opt) as AxiosPromise<D>;

  const result = {
    response,
    ...controller,
    cancel: controller.source.value.cancel,
  };

  const rp = p.then((r) => {
    controller.loading.value = false;
    controller.data.value = r.data;
    response.value = r;
    return result;
  });

  p.catch((e) => {
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

  return Object.assign(rp, result);
}

export { axios, api };
