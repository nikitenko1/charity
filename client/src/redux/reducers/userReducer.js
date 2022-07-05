import { USER_TYPES } from './../types/userTypes';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case USER_TYPES.GET_USER:
      return action.payload;
    case USER_TYPES.DELETE_USER:
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default userReducer;
