import {loginPageActions} from '../action-types';

export const loginUser = user => ({
  type: loginPageActions.LOGIN,
  payload: user
});

export const toggleSidebar = value => ({
  type: loginPageActions.TOGGLE_SIDEBAR,
  payload: value
});
