import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from './../../redux/actions/authActions';
import { GLOBAL_TYPES } from './../../redux/types/globalTypes';
import { AiOutlineClose } from 'react-icons/ai';
import Loader from './../global/Loader';

const EditProfileModal = ({
  openEditProfileModal,
  setOpenEditProfileModal,
  editProfileModalRef,
}) => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    avatar: '',
    role: '',
  });

  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleChangeAvatar = (e) => {
    const files = e.target.files[0];
    setAvatar(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.nama) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Field Name is required.',
        },
      });
    }

    setLoading(true);
    await dispatch(editProfile({ ...userData, avatar }, auth));
    setLoading(false);
    setOpenEditProfileModal(false);
  };

  useEffect(() => {
    setUserData({
      nama: auth.user?.name,
      username: auth.user?.username,
      role: auth.user?.role,
      avatar: auth.user?.avatar,
    });
  }, [auth]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 ${
        openEditProfileModal
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } transition-[opacity] flex z-[999] items-center justify-center p-4 bg-[rgba(0,0,0,.7)]`}
    >
      EditProfileModal
    </div>
  );
};

export default EditProfileModal;
