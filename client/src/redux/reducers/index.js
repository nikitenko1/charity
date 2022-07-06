import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import approval from './approvalReducer';
import donorEvent from './donorEventReducer';
import donor from './donorReducer';
import event from './eventReducer';
import news from './newsReducer';
import user from './userReducer';

export default combineReducers({
  alert,
  approval,
  auth,
  donorEvent,
  donor,
  event,
  news,
  user,
});
