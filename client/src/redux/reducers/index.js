import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import approval from './approvalReducer';
import event from './eventReducer';
import news from './newsReducer';
import user from './userReducer';

export default combineReducers({ alert, approval, auth, event, news, user });
