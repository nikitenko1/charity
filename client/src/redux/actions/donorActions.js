import { GLOBAL_TYPES } from '../types/globalTypes';
import { DONOR_TYPES } from '../types/donorTypes';
import { deleteDataAPI, getDataAPI } from '../../utils/fetchData';

export const deleteDonor = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true,
      },
    });
    const res = await deleteDataAPI(`donor/${id}`, token);
    dispatch({
      type: DONOR_TYPES.DELETE_DONOR,
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

export const getDonor = (token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    const res = await getDataAPI('donor/verified', token);
    console.log(res.data.donors);
    dispatch({
      type: DONOR_TYPES.GET_VERIFIED_DONOR,
      payload: res.data.donors,
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
