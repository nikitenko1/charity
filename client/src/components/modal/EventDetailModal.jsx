import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoLocation } from 'react-icons/go';
import {
  AiFillCalendar,
  AiOutlineClockCircle,
  AiOutlineClose,
} from 'react-icons/ai';
import { GLOBAL_TYPES } from './../../redux/types/globalTypes';
import { registerEvent } from './../../redux/actions/eventActions';
import Loader from './../global/Loader';

const EventDetailModal = ({
  openEventDetailModal,
  setOpenEventDetailModal,
  eventDetailModalRef,
  selectedItem,
}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const handleRegisterEvent = async () => {
    if (!auth.accessToken) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Invalid authentication to register event.',
        },
      });
    }
    setLoading(true);
    await dispatch(registerEvent(selectedItem._id, auth));
    setLoading(false);
    setOpenEventDetailModal(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 ${
        openEventDetailModal
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } transition-[opacity] flex items-center z-[999] justify-center p-4 bg-[rgba(0,0,0,.7)]`}
    >
      EventDetailModal
    </div>
  );
};

export default EventDetailModal;
