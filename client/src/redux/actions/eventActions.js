import { GLOBAL_TYPES } from './../types/globalTypes';
import { EVENT_TYPES } from './../types/eventTypes';
import {
  getDataAPI,
  patchDataAPI,
  postDataAPI,
  deleteDataAPI,
} from './../../utils/fetchData';
import { uploadImages } from './../../utils/imageHelper';

export const registerEvent = (id, auth) => async (dispatch) => {
  try {
    const res = await patchDataAPI(`event/${id}`, {}, auth.accessToken);
    dispatch({
      type: EVENT_TYPES.REGISTER_EVENT,
      payload: { id, user: auth.user._id },
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

export const deleteEvent = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true,
      },
    });
    const res = await deleteDataAPI(`event/${id}`, token);
    dispatch({
      type: EVENT_TYPES.DELETE_EVENT,
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

export const getEventByDonor = (token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    const res = await getDataAPI('event/donor', token);
    dispatch({
      type: EVENT_TYPES.GET_EVENT_BY_DONOR,
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

export const createEvent = (eventData, picture, auth) => async (dispatch) => {
  try {
    const imageRes = await uploadImages([picture]);
    let imageUrl = imageRes[0];
    const res = await postDataAPI(
      'event',
      { ...eventData, picture: imageUrl },
      auth.accessToken
    );
    dispatch({
      type: EVENT_TYPES.CREATE_EVENT,
      payload: res.data.event,
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

export const updateEvent = (eventData, id, token) => async (dispatch) => {
  try {
    let imageResult = '';
    if (eventData.picture && typeof eventData.picture !== 'string') {
      imageResult = await uploadImages([eventData.picture]);
    }
    const res = await patchDataAPI(
      `event/edit/${id}`,
      {
        ...eventData,
        picture: imageResult ? imageResult[0] : eventData.picture,
      },
      token
    );
    dispatch({
      type: EVENT_TYPES.UPDATE_EVENT,
      payload: res.data.event,
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

export const getFilteredEvent =
  (page = 1, category = [], location = [], sort = '') =>
  async (dispatch) => {
    let categoryQueryStr = '';
    let locationQueryStr = '';

    if (category.length > 0) {
      for (let i = 0; i < category.length; i++) {
        if (i !== category.length - 1) {
          categoryQueryStr += `kategori=${category[i]}&`;
        } else {
          categoryQueryStr += `kategori=${category[i]}`;
        }
      }
    }

    if (location.length > 0) {
      for (let i = 0; i < location.length; i++) {
        if (i !== location.length - 1) {
          locationQueryStr += `lokasi=${location[i]}&`;
        } else {
          locationQueryStr += `lokasi=${location[i]}`;
        }
      }
    }
    try {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          loading: true,
        },
      });

      const res = await getDataAPI(
        `event/filter?${categoryQueryStr}&${locationQueryStr}&sort=${sort}&page=${page}`
      );
      dispatch({
        type: EVENT_TYPES.GET_HOME_EVENT,
        payload: {
          data: res.data.events,
          totalPage: res.data.totalPage,
        },
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
