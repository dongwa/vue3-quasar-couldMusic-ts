import { IUserInfo } from 'src/api/auth/auth.model';
export interface IAuthState {
  isLogin: boolean;
  loginFormSwitch: boolean;
  userInfo: IUserInfo;
}
function state(): IAuthState {
  return {
    isLogin: false,
    loginFormSwitch: false,
    userInfo: {
      nickname: '',
      avatarUrl: '',
    },
  };
}

export default state;
