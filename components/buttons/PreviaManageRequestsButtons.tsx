'use client'
import { updateJoinRequestStatus } from '@/lib/actions';
import { UpdateJoinRequestStatus } from '@/types/data';
import Swal from 'sweetalert2';

type PreviaManageRequestsButtonsProps = {
  previaId?: string;
  userId: string;
};

const PreviaManageRequestsButtons = ({ previaId, userId }: PreviaManageRequestsButtonsProps) => {

  const handleManageRequests = async (formData: FormData) => {
    const status = formData.get('status') as UpdateJoinRequestStatus;

    Swal.fire({
      title: `Are you sure to ${status} this request?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#394867',
      cancelButtonColor: '#9BA4B5',
      confirmButtonText: `Yes, ${status} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateJoinRequestStatus({
          previaId,
          userId,
          status,
        }); 
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-1">
      <form
        action={handleManageRequests}
      >
        <input type="hidden" name="status" value="accepted" />
        <button className="btn btn-secondary w-24 min-w-10">Accept</button>
      </form>
      <form
        action={handleManageRequests}
      >
        <input type="hidden" name="status" value="rejected" />

        <button className="btn btn-secondary w-24">Reject</button>
      </form>
    </div>
  );
};

export default PreviaManageRequestsButtons;
