import { EVENT_TYPES } from './../types/eventTypes';

const initialState = {
  data: [],
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_TYPES.GET_EVENT:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default eventReducer;
