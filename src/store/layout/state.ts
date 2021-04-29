export interface ILayoutState {
  rightDrawerOpen: boolean;
  leftDrawerOpen: boolean;
  loginFormSwitch: boolean;
}

function state(): ILayoutState {
  return {
    rightDrawerOpen: false,
    leftDrawerOpen: true,
    loginFormSwitch: false,
  };
}

export default state;
