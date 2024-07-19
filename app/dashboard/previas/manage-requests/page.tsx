import PreviaManageRequestsButtons from '@/components/buttons/PreviaManageRequestsButtons'
import { baseUrl } from '@/lib/constants'
import { Previas } from '@/types/data'
import { Suspense } from 'react'
import Loader from '@/components/Loader'

const fetchData = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/previas/myPrevias`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Error al obtener datos de las previas')
    }
    const data = await response.json()
    return data.previas
  } catch (error) {
    console.error('Error fetching previas data:', error)
  }
}


export default async function Page() {

  const myPrevias: Previas[] = await fetchData()

  return (
    <Suspense fallback={<Loader />}>
      <div className="px-12 py-16 md:py-6 min-h-screen">
        <div className="grid grid-cols-3 gap-4">
          {myPrevias?.map((previa, index) => (
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
              {previa.join_requests.map((joinReq, jIndex) => (
                <div key={jIndex} className="p-4 border">
                  <div>
                    <strong>Attendands:</strong> {joinReq.attendands}
                  </div>
                  <div>
                    <strong>Intentions:</strong> {joinReq.intentions}
                  </div>
                  <div>
                    <strong>Status:</strong> {joinReq.status}
                  </div>
                  <PreviaManageRequestsButtons previaId={previa.previa_id} userId={joinReq.user_id}/>
                </div>
              ))}
            </div>
          ))}
        </div>

        {myPrevias?.length === 0 && (
          <div className="text-md text-secondary md:text-xl">
            {`You haven't created any Previa yet`}
          </div>
        )}
        {/* <div className='flex justify-center'>
        <StatusRequests />
      </div> */}
      </div>
    </Suspense>
  )
}
