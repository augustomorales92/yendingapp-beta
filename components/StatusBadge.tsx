import { FaClock, FaCheck, FaTimes } from 'react-icons/fa';
import type { JoinRequestStatus } from '@/types/data';

type StatusBadgeProps = {
  status: JoinRequestStatus;
};

const handleStatus = {
  pending: {
    text: 'Pending',
    icon: <FaClock className="ml-1 w-4 text-gray-500" />,
    className: 'bg-gray-100 text-gray-500',
  },
  accepted: {
    text: 'Accepted',
    icon: <FaCheck className="ml-1 w-4 text-white" />,
    className: 'bg-green-500 text-white',
  },
  rejected: {
    text: 'Rejected',
    icon: <FaTimes className="ml-1 w-4 text-white" />,
    className: 'bg-red-500 text-white',
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
        handleStatus[status].className
      }`}
    >
      {handleStatus[status].text}
      {handleStatus[status].icon}
    </span>
  );
};

export default StatusBadge;
