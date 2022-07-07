import { EVENT_TYPES } from './../types/eventTypes';

const ticketReducer = (state = [], action) => {
  switch (action.type) {
    case EVENT_TYPES.GET_EVENT_BY_USER:
      return action.payload;
    default:
      return state;
  }
};

export default ticketReducer;
