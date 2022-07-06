import { EVENT_TYPES } from './../types/eventTypes';

const initialState = {
  data: [],
};

const donorEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_TYPES.CREATE_EVENT:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case EVENT_TYPES.GET_EVENT_BY_DONOR:
      return {
        ...state,
        data: action.payload,
      };
    case EVENT_TYPES.DELETE_EVENT:
      return {
        ...state,
        data: state.data.filter((item) => item._id !== action.payload),
      };
    case EVENT_TYPES.UPDATE_EVENT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    default:
      return state;
  }
};

export default donorEventReducer;
