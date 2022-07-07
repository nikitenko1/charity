import {
  AiOutlineClockCircle,
  AiOutlineClose,
  AiFillCalendar,
} from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';

const TicketDetailModal = ({
  openTicketDetailModal,
  setOpenTicketDetailModal,
  ticketDetailModalRef,
  selectedItem,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 ${
        openTicketDetailModal
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } transition-[opacity] z-[999] flex items-center justify-center p-4 bg-[rgba(0,0,0,.7)]`}
    >
      TicketDetailModal
    </div>
  );
};

export default TicketDetailModal;
