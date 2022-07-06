import { DONOR_TYPES } from './../types/donorTypes';

const donatorReducer = (state = [], action) => {
  switch (action.type) {
    case DONOR_TYPES.GET_VERIFIED_DONOR:
      return action.payload;
    case DONOR_TYPES.DELETE_DONOR:
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default donatorReducer;
