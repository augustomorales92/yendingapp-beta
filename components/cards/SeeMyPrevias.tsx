'use client'
import Link from 'next/link'

export default function SeeMyPrevias() {
  return (
    <Link href="/dashboard/previas/my-previas" scroll={false}>
      <div className="previas-card-link">
        <div>
          <h4
            className="mb-2 text-secondary"
          >
            MY PREVIAS
          </h4>
          <p>
            Look at the previews you have created and change conditions if you
            want to.
          </p>
        </div>
      </div>
    </Link>
  )
}
