import { GLOBAL_TYPES } from './../types/globalTypes';
import { getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData';
import { uploadImages } from './../../utils/imageHelper';

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    const res = await postDataAPI('auth/register', userData);
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: res.data.user,
        accessToken: res.data.accessToken,
      },
    });

    localStorage.setItem('charity_auth', 'true');

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

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    const res = await postDataAPI('auth/login', userData);
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: res.data,
    });

    localStorage.setItem('charity_auth', 'true');

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

export const logout = () => async (dispatch) => {
  try {
    const res = await getDataAPI('auth/logout');
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {},
    });

    localStorage.removeItem('charity_auth');

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

export const refreshToken = () => async (dispatch) => {
  const isAuthenticated = localStorage.getItem('charity_auth');
  if (!isAuthenticated) return;

  try {
    const res = await getDataAPI('auth/refresh_token');
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: res.data,
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

export const editProfile = (userData, auth) => async (dispatch) => {
  try {
    let imgRes = '';
    if (userData.avatar) {
      imgRes = await uploadImages([userData.avatar]);
    }

    const res = await patchDataAPI(
      'auth/profile',
      { ...userData, avatar: userData.avatar ? imgRes[0] : userData.avatar },
      auth.accessToken
    );
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: {
          ...auth.user,
          ...res.data.user,
        },
        accessToken: auth.accessToken,
      },
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
