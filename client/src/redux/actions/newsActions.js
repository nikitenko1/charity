import { GLOBAL_TYPES } from './../types/globalTypes';
import { NEWS_TYPES } from './../types/newsTypes';
import {
  getDataAPI,
  postDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from './../../utils/fetchData';
import { uploadImages } from './../../utils/imageHelper';

export const getNews = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true,
      },
    });
    const res = await getDataAPI('news');
    dispatch({
      type: NEWS_TYPES.GET_ALL_NEWS,
      payload: res.data.news,
    });
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: false,
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

export const createNews = (newsData, token) => async (dispatch) => {
  try {
    let imageUrl = await uploadImages([newsData.picture]);

    const res = await postDataAPI(
      'news',
      { ...newsData, picture: imageUrl[0] },
      token
    );

    dispatch({
      type: NEWS_TYPES.CREATE_NEWS,
      payload: res.data.news,
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

export const deleteNews = (id, token) => async (dispatch) => {
  try {
    const res = await deleteDataAPI(`news/${id}`, token);

    dispatch({
      type: NEWS_TYPES.DELETE_NEWS,
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

export const updateNews = (newsData, id, token) => async (dispatch) => {
  try {
    let imageResult = '';
    if (newsData.picture && typeof newsData.picture !== 'string') {
      imageResult = await uploadImages([newsData.picture]);
    }

    const res = await patchDataAPI(
      `news/${id}`,
      { ...newsData, picture: imageResult ? imageResult[0] : newsData.picture },
      token
    );

    dispatch({
      type: NEWS_TYPES.UPDATE_NEWS,
      payload: res.data.news,
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
