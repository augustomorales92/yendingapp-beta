import PreviaManageRequestsButtons from '@/components/buttons/PreviaManageRequestsButtons'
import { Previas } from '@/types/data'
import { Suspense } from 'react'
import Loader from '@/components/Loader'
import { getCreatedPrevias } from '@/services/previas'

async function ManageRequestContent() {
  const createdPrevias: Previas[] = await getCreatedPrevias()
  return (
    <div className="px-12 py-16 md:py-6 min-h-screen">
      <div className="grid grid-cols-3 gap-4">
        {createdPrevias?.map((previa, index) => (
          <div className="col-span-3 lg:col-span-1" key={index}>
            <div>
              <strong>Previa ID:</strong> {previa.previa_id}
            </div>
            <div>
              <strong>Location:</strong> {previa.location}
            </div>
            <div>
              <strong>Date:</strong>{' '}
              {new Date(previa.date).toLocaleDateString()}
            </div>
            <div>
              <strong>Join Requests:</strong>
            </div>
            {previa?.join_requests?.map((joinReq, jIndex) => (
              <div key={jIndex} className="p-4 border">
                <div>
                  <strong>attendants:</strong> {joinReq.attendants}
                </div>
                <div>
                  <strong>Intentions:</strong> {joinReq.intentions}
                </div>
                <div>
                  <strong>Status:</strong> {joinReq.status}
                </div>
                <PreviaManageRequestsButtons
                  previaId={previa?.previa_id}
                  userId={joinReq.user_id}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {createdPrevias?.length === 0 && (
        <div className="text-md text-secondary md:text-xl">
          {`You haven't created any Previa yet`}
        </div>
      )}
      {/* <div className='flex justify-center'>
        <StatusRequests />
      </div> */}
    </div>
  )
}

export default async function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <ManageRequestContent />
    </Suspense>
  )
}
