import { getUserInfo } from 'src/api/auth';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IAuthState } from './state';
import { Cookies } from 'quasar';
const actions: ActionTree<IAuthState, StateInterface> = {
  async setUserInfo({ commit }) {
    const userInfo: any = await getUserInfo().catch((err) => {
      //获取用户信息失败，可能是cookie过期了，清除cookie，等待用户重新登录
      console.log(err);
      Cookies.remove('HASCOOKIE');
    });
    //将用户信息存入vuex中
    commit('setUserInfo', userInfo.profile);
    // 在cooki 中存入一条记录表示有cookie存在(由于服务器给的cookie设置了httpOnly，不可访问，所以自己存个标志)
    Cookies.set('HASCOOKIE', 'true', {
      expires: 20, //有效期20天
    });
    //登录成功,关闭登录框
    commit('toggleLoginForm', false);
  },
};

export default actions;
