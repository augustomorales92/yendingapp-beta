'use client'

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

export default function StatusRequests() {
    const { data: session } = useSession();
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [rejectedRequests, setRejectedRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchStatusRequests = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/previas/statusRequests`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error('Error fetching status requests');
            }
            const data = await response.json();
            setAcceptedRequests(data.acceptedRequests);
            setRejectedRequests(data.rejectedRequests);
           
        } catch (error) {
            console.error('Error fetching status requests:', error);
        } finally {
            setIsLoading(false);

        }
    };

    useEffect(() => {
        if (session) {
            fetchStatusRequests();
        }
    }, [session]);

    return (
        <div className='px-12 py-16 md:py-6 min-h-screen'>
            {isLoading ? (
                <div className='flex justify-center m-auto'>
                    <ClipLoader color='white' size={50} />
                </div>
            ) : (
                <div>
                    <div className='mb-8'>
                        <h2 className='text-xl font-bold mb-4'>Accepted Requests</h2>
                        {acceptedRequests.length === 0 ? (
                            <div>No accepted requests</div>
                        ) : (
                            acceptedRequests.map((request, index) => (
                                <div key={index} className='p-4 border mb-4'>
                                    <div><strong>Previa ID:</strong> {request.previa_id}</div>
                                    <div><strong>User ID:</strong> {request.user_id}</div>
                                    <div><strong>Location:</strong> {request.location}</div>
                                    <div><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</div>
                                    <div><strong>Attendands:</strong> {request.attendands}</div>
                                    <div><strong>Intentions:</strong> {request.intentions}</div>
                                    <div><strong>Status:</strong> {request.status}</div>
                                </div>
                            ))
                        )}
                    </div>
                    <div>
                        <h2 className='text-xl font-bold mb-4'>Rejected Requests</h2>
                        {rejectedRequests.length === 0 ? (
                            <div>No rejected requests</div>
                        ) : (
                            rejectedRequests.map((request, index) => (
                                <div key={index} className='p-4 border mb-4'>
                                    <div><strong>Previa ID:</strong> {request.previa_id}</div>
                                    <div><strong>User ID:</strong> {request.user_id}</div>
                                    <div><strong>Location:</strong> {request.location}</div>
                                    <div><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</div>
                                    <div><strong>Attendands:</strong> {request.attendands}</div>
                                    <div><strong>Intentions:</strong> {request.intentions}</div>
                                    <div><strong>Status:</strong> {request.status}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}


        </div>
    );
};

