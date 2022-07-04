import { GLOBAL_TYPES } from './../types/globalTypes';

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
