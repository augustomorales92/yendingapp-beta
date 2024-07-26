import { FaClock, FaCheck } from 'react-icons/fa'
import type { JoinRequestStatus } from '@/types/data'

type StatusBadgeProps = {
  status: JoinRequestStatus
}
const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
        status === 'pending'
          ? 'bg-gray-100 text-gray-500'
          : 'bg-green-500 text-white'
      }`}
    >
      {status === 'pending' ? (
        <>
          Pending
          <FaClock className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'sent' ? (
        <>
          Sent
          <FaCheck className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  )
}

export default StatusBadge
