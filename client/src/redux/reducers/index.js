import {combineReducers} from 'redux';
import login from './login-reducers';
import holidays from './holidays-reducers';
import leaves from './leaves-reducers';

export default combineReducers({login, holidays, leaves});
