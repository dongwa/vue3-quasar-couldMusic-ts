import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IPlayerState } from './state';

const getters: GetterTree<IPlayerState, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
