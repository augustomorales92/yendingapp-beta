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
      <form
        action={async () => {
          'use server'
          await updateJoinRequestStatus({
            previaId,
            userId,
            status: 'accepted'
          })
        }}
      >
        <button className="btn btn-secondary min-w-10 w-24">Accept</button>
      </form>
      <form
        action={async () => {
          'use server'
          await updateJoinRequestStatus({
            previaId,
            userId,
            status: 'rejected'
          })
        }}
      >
        <button className="btn btn-secondary w-24">Reject</button>
      </form>
    </div>
  )
}

export default PreviaManageRequestsButtons
