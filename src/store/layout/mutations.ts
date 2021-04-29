import { MutationTree } from 'vuex';
import { ILayoutState } from './state';

const mutation: MutationTree<ILayoutState> = {
  toggleLoginForm(state, data: boolean) {
    state.loginFormSwitch = data;
  },
  togglerightDrawerOpen(state) {
    state.rightDrawerOpen = !state.rightDrawerOpen;
  },
  toggleleftDrawerOpen(state) {
    state.leftDrawerOpen = !state.leftDrawerOpen;
  },
};

export default mutation;
