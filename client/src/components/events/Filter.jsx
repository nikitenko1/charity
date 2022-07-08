import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineChevronDown, HiSortDescending } from 'react-icons/hi';
import { IoRefreshOutline, IoTodayOutline } from 'react-icons/io5';
import { MdFilterAlt } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

const Filter = ({ handleFilter }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [sort, setSort] = useState('');

  const filterRef = useRef();

  const { event } = useSelector((state) => state);

  const handleResetFilter = () => {
    setSelectedCategory([]);
    setSelectedLocation([]);
    setSort('');
    handleFilter([], [], 'latest');
  };

  /**
   * Hook that alerts clicks outside of the passed ref
   */
  // Hook get from https://stackoverflow.com/a/42234988/8583669
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openFilter &&
        /**
         * Alert if clicked on outside of element
         */
        filterRef.current &&
        !filterRef.current.contains(e.target)
      ) {
        setOpenFilter(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
  }, [openFilter]);

  return (
    <>
      <div
        onClick={() => setOpenFilter(true)}
        className="flex items-center w-fit bg-orange-400 text-white rounded-md mb-6 shadow-xl px-3 py-2 md:hidden"
      >
        <MdFilterAlt />
        Filter
      </div>
      <div ref={filterRef} className={`flex-1`}>
        <AiOutlineClose
          onClick={() => setOpenFilter(false)}
          className="md:hidden block text-white my-6 float-right mr-5 text-xl cursor-pointer"
        />
      </div>
    </>
  );
};

export default Filter;
