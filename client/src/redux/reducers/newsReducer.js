import { NEWS_TYPES } from './../types/newsTypes';

const newsReducer = (state = [], action) => {
  switch (action.type) {
    case NEWS_TYPES.CREATE_NEWS:
      return [action.payload, ...state];
    case NEWS_TYPES.GET_ALL_NEWS:
      return action.payload;
    case NEWS_TYPES.DELETE_NEWS:
      return state.filter((item) => item._id !== action.payload);
    case NEWS_TYPES.UPDATE_NEWS:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    default:
      return state;
  }
};

export default newsReducer;
