import {loginPageActions} from '../action-types';

const initialState = {
  user: {
    name: '',
    email: '',
    permission: ''
  },
  loggedIn: true,
  mobileOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case loginPageActions.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        loggedIn: true
      };
    case loginPageActions.TOGGLE_SIDEBAR:
      return {
        ...state,
        mobileOpen: action.payload.mobileOpen
      };
    default:
      return state;
  }
}
