'use client'
import Link from 'next/link'

export default function PreviasJoinRequests() {
  return (
    <Link href="/dashboard/previas/manage-requests" scroll={false}>
      <div className="previas-card-link">
        <div>
          <h4
            className="mb-2 text-secondary"
          >
           JOIN REQUESTS
          </h4>
          <p>
          Users who want to join your Previas!. View the requests you have
          pending approval and manage their status.
          </p>
        </div>
      </div>
    </Link>
  )
}
