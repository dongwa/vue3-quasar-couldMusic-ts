import { stat } from 'fs';
import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IAuthState } from './state';

const getters: GetterTree<IAuthState, StateInterface> = {
  getLoginState(state) {
    return state.isLogin;
  },
};

export default getters;
