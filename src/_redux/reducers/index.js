import { combineReducers } from 'redux';
import alert from './alert';
import user from './user';
import token from './token';

export default combineReducers({ alert, user, token });
