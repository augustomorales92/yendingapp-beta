'use client'
import Link from 'next/link'

export default function CreateNew() {
  return (
    <Link href="/dashboard/previas/new" scroll={false}>
      <div className="previas-card-link">
        <div>
          <h4
            className="mb-2 text-secondary"
          >
            CREATE A NEW PREVIA
          </h4>
          <p>
            Make your own Previa, set your own conditions and meet with people
            to break up the night.
          </p>
        </div>
      </div>
    </Link>
  )
}
