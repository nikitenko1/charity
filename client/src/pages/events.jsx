import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './../components/global/Navbar';
import Footer from './../components/global/Footer';
import Banner from './../components/events/Banner';
import Filter from './../components/events/Filter';
import Loader from './../components/global/Loader';
import DetailedEventCard from './../components/events/DetailedEventCard';
import { getEvent, getFilteredEvent } from './../redux/actions/eventActions';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [sort, setSort] = useState('');
  const [currPage, setCurrPage] = useState(1);

  const dispatch = useDispatch();
  const { alert, homeEvent } = useSelector((state) => state);

  const handleFilter = (category, location, sort) => {
    setCategory(category);
    setLocation(location);
    setSort(sort);
    setCurrPage(1);
  };

  const handleClickArrow = () => {};

  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  useEffect(() => {
    setEvents(homeEvent.data);
  }, [homeEvent.data]);

  useEffect(() => {
    dispatch(getFilteredEvent(currPage, category, location, sort));
  }, [dispatch, category, location, sort, currPage]);

  return (
    <div>
      <Navbar />
      <Banner />
      <div className="block md:flex gap-8 md:mt-12 mt-7 md:pr-12 pr-8 md:px-0 pl-8">
        <Filter handleFilter={handleFilter} />
        <div className="flex-[4]">
          {alert.loading ? (
            <Loader size="xl" />
          ) : (
            <>
              {events.length === 0 ? (
                <div className="mt-6 bg-red-500 text-sm text-white w-fit rounded-md px-6 py-3">
                  No data found
                </div>
              ) : (
                <>
                  {events.map((item) => (
                    <DetailedEventCard key={item._id} item={item} />
                  ))}
                </>
              )}

              {homeEvent.totalPage > 1 && (
                <>
                  <div className="flex items-center float-right border border-gray-300 w-fit rounded-md">
                    {currPage > 1 && (
                      <p
                        onClick={() => handleClickArrow('prev')}
                        className="px-5 py-2 border-r border-gray-300 cursor-pointer"
                      >
                        &lt;
                      </p>
                    )}

                    {Array.from(Array(homeEvent.totalPage).keys()).map(
                      (_, idx) => (
                        <p
                          onClick={() => setCurrPage(idx + 1)}
                          className={`px-5 py-2 border-r border-gray-300 cursor-pointer ${
                            currPage === idx + 1
                              ? 'bg-sky-400 text-white'
                              : undefined
                          }`}
                        >
                          {idx + 1}
                        </p>
                      )
                    )}

                    {currPage < homeEvent.totalPage && (
                      <p
                        onClick={() => handleClickArrow('next')}
                        className="px-5 py-2 cursor-pointer"
                      >
                        &gt;
                      </p>
                    )}
                  </div>
                  <div className="clear-both" />
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
