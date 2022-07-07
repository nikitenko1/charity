import { GLOBAL_TYPES } from './../types/globalTypes';
import { EVENT_TYPES } from './../types/eventTypes';
import { getDataAPI } from './../../utils/fetchData';

export const getTicket = (token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    const res = await getDataAPI('event/ticket', token);

    dispatch({
      type: EVENT_TYPES.GET_EVENT_BY_USER,
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
