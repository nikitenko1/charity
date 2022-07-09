import { useState, useEffect } from 'react';
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
    slogan: '',
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
      !profileData.slogan ||
      !profileData.email ||
      !profileData.address
    ) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: `The fields for the organization name, owner's name, slogan, email, and also address are mandatory.`,
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

  useEffect(() => {
    getDataAPI('donor/user', auth.accessToken)
      .then((res) => {
        setProfileData({
          name: res.data.donor.name,
          email: auth.user?.email,
          owner: res.data.donor.owner,
          slogan: res.data.donor.slogan,
          address: res.data.donor.address,
        });
        if (res.data.donor.status !== 'verified') {
          setStatus('Waiting for verification');
        } else {
          setStatus('Verified');
        }
      })
      .catch(() => {
        if (auth.user?.email) {
          setStatus('Verification failed');
        } else {
          setStatus('Not verified');
        }
      });
  }, [auth]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 ${
        openDonorProfileModal
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } transition-[opacity] flex z-[999] items-center justify-center p-4 bg-[rgba(0,0,0,.7)]`}
    >
      <div
        ref={donorProfileModalRef}
        className={`bg-white w-full ${
          openDonorProfileModal ? 'translate-y-0' : '-translate-y-12'
        } transition-[transform] max-w-[500px] rounded-md`}
      >
        <div className="border-b border-gray-300 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1>Fill Out Donor Profile</h1>
            <p
              className={`text-xs rounded-md p-1 text-white ${
                status === 'Verification failed'
                  ? 'bg-red-400'
                  : status === 'Not verified' ||
                    status === 'Waiting for verification'
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
            >
              {status}
            </p>
          </div>
          <AiOutlineClose
            onClick={() => setOpenDonorProfileModal(false)}
            className="cursor-pointer"
          />
        </div>
        <div className="p-5 h-[500px] overflow-auto hide-scrollbar">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-sm">
                Organization Name
              </label>
              <input
                disabled={
                  status !== 'Verified' && status !== 'Waiting for verification'
                    ? false
                    : true
                }
                type="text"
                name="name"
                id="name"
                value={profileData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 h-10 outline-0 mt-3 text-sm"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="owner" className="text-sm">
                Name of the owner
              </label>
              <input
                disabled={
                  status !== 'Verified' && status !== 'Waiting for verification'
                    ? false
                    : true
                }
                type="text"
                name="owner"
                id="owner"
                value={profileData.owner}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 h-10 outline-0 mt-3 text-sm"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="slogan" className="text-sm">
                slogan
              </label>
              <input
                disabled={
                  status !== 'Verified' && status !== 'Waiting for verification'
                    ? false
                    : true
                }
                type="text"
                name="slogan"
                id="slogan"
                value={profileData.slogan}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 h-10 outline-0 mt-3 text-sm"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                disabled={
                  status !== 'Verified' && status !== 'Waiting for verification'
                    ? false
                    : true
                }
                type="text"
                name="email"
                id="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 h-10 outline-0 mt-3 text-sm"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="address" className="text-sm">
                Address
              </label>
              <textarea
                disabled={
                  status !== 'Verified' && status !== 'Waiting for verification'
                    ? false
                    : true
                }
                name="address"
                id="address"
                value={profileData.address}
                onChange={handleChange}
                className="w-full resize-none outline-0 border border-gray-300 h-24 rounded-md p-3 text-sm mt-3"
              />
            </div>
            {status !== 'Verified' && status !== 'Waiting for verification' && (
              <button
                disabled={loading ? true : false}
                className={`${
                  loading
                    ? 'bg-orange-200 hover:bg-orange-200 cursor-auto'
                    : 'bg-orange-400 hover:bg-orange-500 cursor-pointer'
                } px-4 py-2 rounded-md text-white text-sm mt-3 transition-[background]`}
              >
                {loading ? <Loader /> : 'Sent'}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonorProfileModal;
