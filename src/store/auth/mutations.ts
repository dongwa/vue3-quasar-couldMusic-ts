import { MutationTree } from 'vuex';
import { IAuthState } from './state';

const mutation: MutationTree<IAuthState> = {
  setUserInfo(state, data) {
    state.userInfo = data;
    state.isLogin = true;
  },
  toggleLoginForm(state, data: boolean) {
    state.loginFormSwitch = data;
  },
  changeLoginState(state, data: boolean) {
    state.isLogin = data;
  },
};

export default mutation;
