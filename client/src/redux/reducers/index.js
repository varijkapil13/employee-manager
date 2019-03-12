import {combineReducers} from 'redux';
import login from './login';
import holidays from './holidays';
import leaves from './leaves';

export default combineReducers({login, holidays, leaves});
