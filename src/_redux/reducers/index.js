import { combineReducers } from 'redux';
import alert from './alert';
import user from './user';
import token from './token';
import basket from './basket';

export default combineReducers({ alert, user, token, basket });
