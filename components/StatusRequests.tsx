import React, { Suspense } from 'react'
import Loader from './Loader'
import { statusRequests } from '@/lib/actions'

export default async function StatusRequests() {
  const { acceptedRequests, rejectedRequests } = await statusRequests()

  return (
    <div className="px-12 py-16 md:py-6 min-h-screen">
      <Suspense fallback={<Loader />}>
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Accepted Requests</h2>
            {acceptedRequests.length === 0 ? (
              <div>No accepted requests</div>
            ) : (
              acceptedRequests.map((request, index) => (
                <div key={index} className="p-4 border mb-4">
                  <div>
                    <strong>Previa ID:</strong> {request.previa_id}
                  </div>
                  <div>
                    <strong>User ID:</strong> {request.user_id}
                  </div>
                  <div>
                    <strong>Location:</strong> {request.location}
                  </div>
                  <div>
                    <strong>Date:</strong>{' '}
                    {new Date(request.date).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Attendands:</strong> {request.attendands}
                  </div>
                  <div>
                    <strong>Intentions:</strong> {request.intentions}
                  </div>
                  <div>
                    <strong>Status:</strong> {request.status}
                  </div>
                </div>
              ))
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Rejected Requests</h2>
            {rejectedRequests.length === 0 ? (
              <div>No rejected requests</div>
            ) : (
              rejectedRequests.map((request, index) => (
                <div key={index} className="p-4 border mb-4">
                  <div>
                    <strong>Previa ID:</strong> {request.previa_id}
                  </div>
                  <div>
                    <strong>User ID:</strong> {request.user_id}
                  </div>
                  <div>
                    <strong>Location:</strong> {request.location}
                  </div>
                  <div>
                    <strong>Date:</strong>{' '}
                    {new Date(request.date).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Attendands:</strong> {request.attendands}
                  </div>
                  <div>
                    <strong>Intentions:</strong> {request.intentions}
                  </div>
                  <div>
                    <strong>Status:</strong> {request.status}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Suspense>
    </div>
  )
}
