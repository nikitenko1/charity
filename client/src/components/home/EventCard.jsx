import { useState, useEffect, useRef } from 'react';
import { AiFillCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import EventDetailModal from './../modal/EventDetailModal';

const EventCard = ({ item }) => {
  const [openEventDetailModal, setOpenEventDetailModal] = useState(false);

  const eventDetailModalRef = useRef();

  /**
   * Hook that alerts clicks outside of the passed ref
   */
  // Hook get from https://stackoverflow.com/a/42234988/8583669
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openEventDetailModal &&
        /**
         * Alert if clicked on outside of element
         */
        eventDetailModalRef.current &&
        !eventDetailModalRef.current.contains(e.target)
      ) {
        setOpenEventDetailModal(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
  }, [openEventDetailModal]);
  return (
    <div className="bg-sky-400 rounded-md flex items-center">EventCard</div>
  );
};

export default EventCard;
