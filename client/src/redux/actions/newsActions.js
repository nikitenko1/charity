import { GLOBAL_TYPES } from './../types/globalTypes';
import { NEWS_TYPES } from './../types/newsTypes';
import {
  getDataAPI,
  postDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from './../../utils/fetchData';
import { uploadImages } from './../../utils/imageHelper';

export const getNews = () => async (dispatch) => {};

export const createNews = (newsData, token) => async (dispatch) => {};

export const deleteNews = (id, token) => async (dispatch) => {};

export const updateNews = (newsData, id, token) => async (dispatch) => {};
