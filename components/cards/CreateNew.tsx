import { Link } from 'next-view-transitions'

export default function CreateNew() {
  return (
    <Link href="/dashboard/previas/new" scroll={false}>
      <div className="previas-card-link">
        <div>
          <h4
            className="mb-2"
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
