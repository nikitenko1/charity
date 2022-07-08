import { EVENT_TYPES } from './../types/eventTypes';

const initialState = {
  totalPage: 0,
  data: [],
};

const homeEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_TYPES.GET_HOME_EVENT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default homeEventReducer;
