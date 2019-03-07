import {LOGIN, TOGGLE_SIDEBAR} from '../action-types';

export const loginUser = user => ({
  type: LOGIN,
  payload: user
});

export const toggleSidebar = value => ({
  type: TOGGLE_SIDEBAR,
  payload: value
});
