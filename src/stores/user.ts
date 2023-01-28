import { defineStore } from 'pinia';

const storeID = 'user';

interface IUser {
  loggedIn: boolean;
}

const User: IUser = {
  loggedIn: false,
};

export { IUser };

export const useUserStore = defineStore({
  id: storeID,

  state: (): IUser =>
    JSON.parse(localStorage.getItem(storeID) ?? JSON.stringify(User)) as IUser,

  actions: {
    login(username: string, password: string): boolean {
      if (username === 'admin' && password === 'admin') {
        this.loggedIn = true;
      }

      return this.loggedIn;
    },
    logout(): boolean {
      this.loggedIn = false;
      return true;
    },
  },
  getters: {
    isLoggedIn(): boolean {
      return this.loggedIn;
    },
  },
});

export type UserStore = ReturnType<typeof useUserStore>;
