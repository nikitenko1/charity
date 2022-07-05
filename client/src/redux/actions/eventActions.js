import { GLOBAL_TYPES } from './../types/globalTypes';
import { EVENT_TYPES } from './../types/eventTypes';
import {
  getDataAPI,
  patchDataAPI,
  postDataAPI,
  deleteDataAPI,
} from './../../utils/fetchData';

export const registerEvent = (id, auth) => async (dispatch) => {
  try {
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg,
      },
    });
  }
};

export const getEvent = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    const res = await getDataAPI('event');

    dispatch({
      type: EVENT_TYPES.GET_EVENT,
      payload: res.data.events,
    });

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg,
      },
    });
  }
};
