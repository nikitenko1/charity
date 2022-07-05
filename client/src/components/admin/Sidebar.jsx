import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { BsPatchCheckFill } from 'react-icons/bs';
import { FaBuilding, FaTachometerAlt, FaUser } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiNews } from 'react-icons/bi';

const Sidebar = () => {
  const { page } = useParams();

  const { auth } = useSelector((state) => state);

  return (
    <div className="bg-sky-400 pt-[72px]">
      {auth.user?.role === 'admin' ? (
        <>Admin</>
      ) : (
        <>
          <Link
            to="/overview"
            className={`block p-5 ${
              page === 'overview' ? 'bg-sky-600' : undefined
            } hover:bg-sky-600 cursor-pointer transition-[background]`}
          >
            <FaTachometerAlt className="text-xl text-white" />
          </Link>
          <Link
            to="/event"
            className={`block p-5 ${
              page === 'event' ? 'bg-sky-600' : undefined
            } hover:bg-sky-600 cursor-pointer transition-[background]`}
          >
            <AiOutlineClockCircle className="text-xl text-white" />
          </Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
