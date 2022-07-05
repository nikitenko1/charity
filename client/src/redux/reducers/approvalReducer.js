import { DONOR_TYPES } from './../types/donorTypes';

const approvalReducer = (state = [], action) => {
  switch (action.type) {
    case DONOR_TYPES.GET_UNVERIFIED_DONOR:
      return action.payload;
    case DONOR_TYPES.CHANGE_STATUS:
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default approvalReducer;
