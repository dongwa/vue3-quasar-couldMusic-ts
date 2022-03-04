import { api } from 'src/boot/axios';

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    api
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    api.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
