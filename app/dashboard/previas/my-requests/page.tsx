import { auth } from '@/auth'
import { baseUrl } from '@/lib/constants'
import { Previas } from '@/types/data'
import { Session } from 'next-auth'
import Image from 'next/image'

const fetchData = async ({ session }: { session: Session | null }) => {
  const params = {
    email: session?.user?.email || ''
  }
  const queryString = new URLSearchParams(params).toString()
  try {
    const response = await fetch(`${baseUrl}/api/user?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: JSON.stringify(session)
      }
    })
    if (!response.ok) {
      throw new Error('Error al obtener datos del usuario')
    }
    const data = await response.json()
    return data.user_data
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

const fetchPreviaData = async ({ previas_ids }: { previas_ids: string[] }) => {
  const response = await fetch(`${baseUrl}/api/previas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ previas_ids })
  })

  if (!response.ok) {
    throw new Error('Error fetching previa data')
  }

  const data = await response.json()
  return data.previa_data
}

export default async function Page() {
  const session = await auth()
  const userData = await fetchData({ session })
  const previasData: Previas[] = await fetchPreviaData({
    previas_ids: userData.previas_requests
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
                  .filter((request) => request.user_id === userData.user_id) // Filtrar por user_id
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
