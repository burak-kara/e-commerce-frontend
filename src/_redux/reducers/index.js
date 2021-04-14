import { combineReducers } from 'redux';
import alert from './alert';
import session from './session';
import token from './token';

export default combineReducers({ alert, session, token });
