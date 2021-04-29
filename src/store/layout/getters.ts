import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ILayoutState } from './state';

const getters: GetterTree<ILayoutState, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
