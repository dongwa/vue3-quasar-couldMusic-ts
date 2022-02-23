import { useLayoutStore } from './layout';
import { defineStore } from 'pinia';
import { Cookies } from 'quasar';
import { getUserInfo } from 'src/api/auth';
import { IUserInfo } from 'src/api/auth/auth.model';

export interface IAuthState {
  isLogin: boolean;
  userInfo: IUserInfo;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false,
    userInfo: {
      nickname: '',
      avatarUrl: '',
    },
  }),
  actions: {
    async setUserInfo() {
      const layout = useLayoutStore();
      const userInfo = await getUserInfo().catch((err) => {
        //获取用户信息失败，可能是cookie过期了，清除cookie，等待用户重新登录
        console.log(err);
        Cookies.remove('HASCOOKIE');
      });
      console.log('获取用户信息', userInfo);

      //将用户信息存入store中
      if (userInfo) this.userInfo = userInfo.profile;
      // 在cooki 中存入一条记录表示有cookie存在(由于服务器给的cookie设置了httpOnly，不可访问，所以自己存个标志)
      Cookies.set('HASCOOKIE', 'true', {
        expires: 20, //有效期20天
      });
      //登录成功,关闭登录框
      this.isLogin = true;
      layout.toggleLoginForm(false);
    },
  },
  persist: true,
});

export type AuthStore = ReturnType<typeof useAuthStore>;
