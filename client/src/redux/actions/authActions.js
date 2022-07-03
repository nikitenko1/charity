import { GLOBAL_TYPES } from './../types/globalTypes';
import { getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData';

export const refreshToken = () => async (dispatch) => {
  try {
    const logged = localStorage.getItem('islogged-ua');

    if (logged) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          loading: true,
        },
      });

      const res = await getDataAPI('auth/refresh_token');
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: {
          user: res.data.user,
          accessToken: res.data.accessToken,
        },
      });

      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {},
      });
    }
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg,
      },
    });
  }
};
