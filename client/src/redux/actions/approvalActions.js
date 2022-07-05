import { GLOBAL_TYPES } from './../types/globalTypes';
import { DONOR_TYPES } from './../types/donorTypes';
import {
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from './../../utils/fetchData';

export const getUnverifiedDonor = (token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true,
      },
    });
    const res = await getDataAPI('donor/unverified', token);

    dispatch({
      type: DONOR_TYPES.GET_UNVERIFIED_DONOR,
      payload: res.data.donators,
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

export const verifyDonor = (id, token) => async (dispatch) => {};

export const rejectDonor = (id, token) => async (dispatch) => {};
