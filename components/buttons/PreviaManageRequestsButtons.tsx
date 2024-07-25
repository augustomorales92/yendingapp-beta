import { updateJoinRequestStatus } from '@/lib/actions'

type PreviaManageRequestsButtonsProps = {
  previaId?: string
  userId: string
}

const PreviaManageRequestsButtons = ({
  previaId,
  userId
}: PreviaManageRequestsButtonsProps) => {

  return (
    <div className="flex flex-wrap gap-1">
      <button
        className="btn btn-secondary min-w-10 w-24"
        onClick={() =>
          updateJoinRequestStatus({ previaId, userId, status: 'accepted' })
        }
      >
        Accept
      </button>
      <button
        className="btn btn-secondary w-24"
        onClick={() =>
          updateJoinRequestStatus({ previaId, userId, status: 'rejected' })
        }
      >
        Reject
      </button>
    </div>
  )
}

export default PreviaManageRequestsButtons
