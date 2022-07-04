import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { getDataAPI, postDataAPI } from './../../utils/fetchData';
import { GLOBAL_TYPES } from './../../redux/types/globalTypes';
import Loader from './../global/Loader';

const DonorProfileModal = ({
  openDonorProfileModal,
  setOpenDonorProfileModal,
  donorProfileModalRef,
}) => {
  const [profileData, setProfileData] = useState({
    name: '',
    owner: '',
    nikname: '',
    email: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !profileData.name ||
      !profileData.owner ||
      !profileData.nikname ||
      !profileData.email ||
      !profileData.address
    ) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: `Every field can't be blank.`,
        },
      });
    }
    setLoading(true);
    await postDataAPI('donor', profileData, auth.accessToken)
      .then((res) => {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: {
            success: res.data.msg,
          },
        });
        setOpenDonorProfileModal(false);
      })
      .catch((err) => {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: {
            errors: err.response.data.msg,
          },
        });
      });
    setLoading(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 ${
        openDonorProfileModal
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } transition-[opacity] flex z-[999] items-center justify-center p-4 bg-[rgba(0,0,0,.7)]`}
    >
      DonorProfileModal
    </div>
  );
};

export default DonorProfileModal;
