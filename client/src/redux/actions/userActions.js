import { GLOBAL_TYPES } from './../types/globalTypes';
import { USER_TYPES } from './../types/userTypes';
import { deleteDataAPI, getDataAPI } from './../../utils/fetchData';

export const getUser = (token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    const res = await getDataAPI('user', token);
    dispatch({
      type: USER_TYPES.GET_USER,
      payload: res.data.users,
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

export const deleteUser = (id, token) => async (dispatch) => {
  try {
    const res = await deleteDataAPI(`user/${id}`, token);

    dispatch({
      type: USER_TYPES.DELETE_USER,
      payload: id,
    });

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
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
