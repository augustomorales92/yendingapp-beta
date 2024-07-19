import NewPreviaForm from '@/components/forms/NewPreviaForm'
import { Suspense } from 'react'
import Loader from '@/components/Loader'

export default function page() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="px-12 py-16 md:py-6 min-h-screen">
        <NewPreviaForm />
      </div>
    </Suspense>
  )
}
