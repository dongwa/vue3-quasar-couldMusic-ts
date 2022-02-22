import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    rightDrawerOpen: false,
    leftDrawerOpen: true,
    loginFormSwitch: false,
  }),
  actions: {
    toggleLoginForm(data: boolean) {
      this.loginFormSwitch = data;
    },
    togglerightDrawerOpen(this) {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },
    toggleleftDrawerOpen(this) {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
  persist: true,
});
