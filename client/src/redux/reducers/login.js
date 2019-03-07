import {LOGIN, TOGGLE_SIDEBAR} from '../action-types';

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
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        loggedIn: true
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        mobileOpen: action.payload.mobileOpen
      };
    default:
      return state;
  }
}
