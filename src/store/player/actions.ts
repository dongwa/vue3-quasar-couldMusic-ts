import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IPlayerState } from './state';

const actions: ActionTree<IPlayerState, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
