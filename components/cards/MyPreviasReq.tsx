'use client'
import Link from 'next/link'

export default function MyPreviasReq() {
  return (
    <Link href="/dashboard/previas/my-requests" scroll={false}>
      <div className="previas-card-link">
        <div>
          <h4
            className="mb-2 text-secondary"
          >
            MY REQUESTS
          </h4>
          <p>
            {"View the Previas you've applied to join and find out their status, participants and more."}
          </p>
        </div>
      </div>
    </Link>
  )
}
