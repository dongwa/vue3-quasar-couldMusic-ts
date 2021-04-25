import { api } from '../../boot/axios';

enum ApiUrl {
  getKey = '/login/qr/key', //说明: 调用此接口可生成一个key
  createQR = '/login/qr/create', //说明: 调用此接口传入上一个接口生成的key可生成二维码图片的base64和二维码信息,可使用base64展示图片,或者使用二维码信息内容自行使用第三方二维码生产库渲染二维码
  check = '/login/qr/check',
  getUerInfo = '/user/account',
}
//调用此接口可生成一个用于二维码登录的key
export const getQRKey = async () => {
  return (await api.get(`${ApiUrl.getKey}?timerstamp=${Date.now()}`)).data
    .unikey;
};
//获取登录二维码，调用之前得先获得key
export const createQRbase64 = async (key: string) => {
  return (
    await api.get(
      `${ApiUrl.createQR}?key=${key}&qrimg=true&timerstamp=${Date.now()}`
    )
  ).data.qrimg;
};
//轮询此接口可获取二维码扫码状态
//800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功(803状态码下会返回cookies和用户名头像)
export const checkPrLogin = async (key: string) => {
  return await api.get(`${ApiUrl.check}?key=${key}&timerstamp=${Date.now()}`);
};

//获取到cookie后可以通过此接口可获取用户详细数据
export const getUserInfo = async () => {
  return await api.get(`${ApiUrl.getUerInfo}?timerstamp=${Date.now()}`);
};
