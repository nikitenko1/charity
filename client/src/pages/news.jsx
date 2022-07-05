import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNews, deleteNews } from './../redux/actions/newsActions';
import Layout from './../components/admin/Layout';
import CreateNewsModal from './../components/modal/CreateNewsModal';
import Loader from './../components/global/Loader';
import NotFound from './../components/global/NotFound';
import NewsDetailModal from './../components/modal/NewsDetailModal';
import DeleteModal from './../components/modal/DeleteModal';

const News = () => {
  const [openCreateNewsModal, setOpenCreateNewsModal] = useState(false);
  const [openNewsDetailModal, setOpenNewsDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const createNewsModalRef = useRef();
  const newsDetailModalRef = useRef();
  const deleteModalRef = useRef();

  const dispatch = useDispatch();
  const { auth, alert, news } = useSelector((state) => state);

  const handleClickDetail = (item) => {
    setOpenNewsDetailModal(true);
    setSelectedItem(item);
  };

  const handleClickCreate = () => {
    setSelectedItem();
    setOpenCreateNewsModal(true);
  };

  const handleClickUpdate = (item) => {
    setSelectedItem(item);
    setOpenCreateNewsModal(true);
  };

  const handleClickDelete = (item) => {
    setSelectedItem(item);
    setOpenDeleteModal(true);
  };

  const handleDeleteNews = async () => {
    await dispatch(deleteNews(selectedItem._id, auth.accessToken));
    setOpenDeleteModal(false);
    setSelectedItem();
  };

  /**
   * Hook that alerts clicks outside of the passed ref
   */
  // Hook get from https://stackoverflow.com/a/42234988/8583669
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openCreateNewsModal &&
        /**
         * Alert if clicked on outside of element
         */
        createNewsModalRef.current &&
        !createNewsModalRef.current.contains(e.target)
      ) {
        setOpenCreateNewsModal(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
  }, [openCreateNewsModal]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openNewsDetailModal &&
        newsDetailModalRef.current &&
        !newsDetailModalRef.current.contains(e.target)
      ) {
        setOpenNewsDetailModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openNewsDetailModal]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openDeleteModal &&
        deleteModalRef.current &&
        !deleteModalRef.current.contains(e.target)
      ) {
        setOpenDeleteModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDeleteModal]);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  if (auth.user?.role !== 'admin') {
    return <NotFound />;
  }

  return (
    <>
      <Layout>
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-sky-400 font-medium">News List</h1>{' '}
          <button
            onClick={handleClickCreate}
            className="bg-sky-400 hover:bg-sky-500 transition-[background] px-4 py-2 text-white text-sm rounded-md"
          >
            Add News
          </button>
        </div>
        {alert.loading ? (
          <Loader size="xl" />
        ) : (
          <>
            {news.length === 0 ? (
              <div className="mt-6 bg-red-500 text-sm text-white w-fit rounded-md px-6 py-3">
                No data found
              </div>
            ) : (
              <div className="overflow-x-auto mt-6">
                <table className="w-full">
                  <thead>
                    <tr className="text-sm bg-sky-400 text-white">
                      <th className="p-3">No</th>
                      <th>Judul</th>
                      <th>Tanggal</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                </table>
              </div>
            )}
          </>
        )}
      </Layout>
      <CreateNewsModal
        openCreateNewsModal={openCreateNewsModal}
        setOpenCreateNewsModal={setOpenCreateNewsModal}
        createNewsModalRef={createNewsModalRef}
        selectedItem={selectedItem}
      />
    </>
  );
};

export default News;
