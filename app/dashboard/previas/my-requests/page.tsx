'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';

export default function Page() {

  // eslint-disable-next-line no-unused-vars
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [previasData, setPreviasData] = useState(null);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    const params = {
      email: session?.user?.email,
    };
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await fetch(`/api/user?${queryString}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error('Error al obtener datos del usuario');
      }
      const data = await response.json();
      setUserData(data.user_data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },[session?.user?.email])

  //  una vez que tenga los previas_ids -- hago el llamdo al back para traer las previas que he solicitado
  const fetchPreviaData = async (previas_ids) => {
    const response = await fetch('/api/previas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ previas_ids }),
    });

    if (!response.ok) {
      throw new Error('Error fetching previa data');
    }

    const data = await response.json();
    setPreviasData(data.previa_data);
    return data;
  }

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [fetchData, session]);

  useEffect(() => {
    if (userData?.previas_requests && userData.previas_requests.length > 0) {
      fetchPreviaData(userData?.previas_requests);
    }
  }, [userData]);


  return (
    <div className='text-secondary px-12 py-16 md:py-6 min-h-screen'>
      {isLoading ? (
        <div className='flex justify-center m-auto'><ClipLoader color='white' size={50} /></div>
      ) : (
        <>
          <p>Lista de las previas a las que solicite unirme...</p>
          {previasData?.length > 0 ? (
            <div>
              {previasData.map((previa, index) => (
                <div key={index}>
                  <h3>Location: {previa.location}</h3>
                  <p>Participants: {previa.participants}</p>
                  <div>
                    <h4>Images:</h4>
                    {previa.images_previa_url.map((url, i) => (
                      <Image key={i} src={url} alt={`Previa ${index} Image ${i}`} width={100} height={100} />
                    ))}
                  </div>
                  <div>
                    <h4>Join Requests:</h4>
                    {previa.join_requests
                      .filter(request => request.user_id === userData.user_id) // Filtrar por user_id
                      .map((request, i) => (
                        <div key={i}>
                          <p>User ID: {request.user_id}</p>
                          <p>Intentions: {request.intentions}</p>
                          <p>Status: {request.status}</p>
                          <p>Attendees: {request.attendands}</p>
                          <div>
                            <h5>Photos:</h5>
                            {request.photos.map((photo, j) => (
                              <Image key={j} src={photo} alt={`Request ${i} Photo ${j}`} width={50} height={100} />
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
        </>
      )}
    </div>
  )
}

