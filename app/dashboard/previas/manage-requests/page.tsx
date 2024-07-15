'use client'


import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

export default function Page() {

  const { data: session } = useSession();
  const [myPrevias, setMyPrevias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/previas/myPrevias`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener datos de las previas');
      }
      const data = await response.json();
      setMyPrevias(data.previas);
    } catch (error) {
      console.error('Error fetching previas data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateJoinRequestStatus = async (previaId, userId, status) => {
    console.log(previaId, userId)
    let toastId;
    try {
      toastId = toast.loading("We're attending your requests...");
      const responsePrevia = await fetch(`/api/previa/updateJoinReq`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ previaId, userId, status }),
      });
      if (!responsePrevia.ok) {
        throw new Error('Error al actualizar el estado de la solicitud de unión');
      }

      // Update status in PreviaUser model
      const responsePreviaUser = await fetch(`/api/previaUsers`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ previaId, userId, status }),
      });
      if (!responsePreviaUser.ok) {
        throw new Error('Error al actualizar el estado de la solicitud de unión en PreviaUser');
      }
      toast.dismiss(toastId);
      // Fetch updated data
      fetchData();
      toast.success('Status change')
    } catch (error) {
      console.error('Error updating join request status:', error);
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);



  return (
    <div className='px-12 py-16 md:py-6 min-h-screen'>
      {isLoading ? (
        <div className='flex justify-center m-auto'>
          <ClipLoader color='white' size={50} />
        </div>
      ) : (
        <div className='grid grid-cols-3 gap-4'>
          {myPrevias?.map((previa, index) => (
            <div className='col-span-3 lg:col-span-1' key={index}>
              <div><strong>Previa ID:</strong> {previa.previa_id}</div>
              <div><strong>Location:</strong> {previa.location}</div>
              <div><strong>Date:</strong> {new Date(previa.date).toLocaleDateString()}</div>
              <div><strong>Join Requests:</strong></div>
              {previa.join_requests.map((joinReq, jIndex) => (
                <div key={jIndex} className='p-4 border'>
                  <div><strong>Attendands:</strong> {joinReq.attendands}</div>
                  <div><strong>Intentions:</strong> {joinReq.intentions}</div>
                  <div><strong>Status:</strong> {joinReq.status}</div>
                  <div className='flex flex-wrap'>
                    <button
                      className='btn btn-secondary'
                      onClick={() => updateJoinRequestStatus(previa.previa_id, joinReq.user_id, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className='btn btn-secondary'
                      onClick={() => updateJoinRequestStatus(previa.previa_id, joinReq.user_id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {myPrevias?.length === 0 && !isLoading && (
        <div className='text-md text-secondary md:text-xl'>
          {`You haven't created any Previa yet`}
        </div>
      )}
      {/* <div className='flex justify-center'>
        <StatusRequests />
      </div> */}
    </div>
  )
}
