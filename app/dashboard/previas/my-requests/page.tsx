import { auth } from '@/auth'
import { baseUrl } from '@/lib/constants'
import { Previas } from '@/types/data'
import { Session } from 'next-auth'
import Image from 'next/image'
import { Suspense } from 'react'
import Loader from '@/components/Loader'

const fetchPreviaData = async ({ session }: { session: Session | null }) => {
  try {
    const response = await fetch(`${baseUrl}/api/previas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify(session)
      },
      body: JSON.stringify({})
    })

    const data = await response.json()
    return { previas_data: data.previa_data, user_id: data.user_id }
  } catch (error) {
    console.error('Error fetching previa data:', error)
    return { previas_data: [], user_id: '' }
  }
}

async function MyRequestContent() {
  const session = await auth()
  const {
    previas_data: previasData,
    user_id
  }: { previas_data: Previas[]; user_id: string } = await fetchPreviaData({
    session
  })

  return (
    <div className="text-secondary px-12 py-16 md:py-6 min-h-screen">
      <p>Lista de las previas a las que solicite unirme...</p>
      {previasData?.length ? (
        <div>
          {previasData?.map((previa, index) => (
            <div key={index}>
              <h3>Location: {previa.location}</h3>
              <p>Participants: {previa.participants}</p>
              <div>
                <h4>Images:</h4>
                {previa.images_previa_url.map((url, i) => (
                  <Image
                    key={i}
                    src={url}
                    alt={`Previa ${index} Image ${i}`}
                    width={100}
                    height={100}
                  />
                ))}
              </div>
              <div>
                <h4>Join Requests:</h4>
                {previa.join_requests
                  .filter((request) => request.user_id === user_id) // Filtrar por user_id
                  .map((request, i) => (
                    <div key={i}>
                      <p>User ID: {request.user_id}</p>
                      <p>Intentions: {request.intentions}</p>
                      <p>Status: {request.status}</p>
                      <p>Attendees: {request.attendands}</p>
                      <div>
                        <h5>Photos:</h5>
                        {request.photos.map((photo, j) => (
                          <Image
                            key={j}
                            src={photo}
                            alt={`Request ${i} Photo ${j}`}
                            width={50}
                            height={100}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No previas found.</p>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <MyRequestContent />
    </Suspense>
  )
}
