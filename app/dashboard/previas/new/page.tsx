import NewPreviaForm from '@/components/forms/NewPreviaForm'
import { Suspense } from 'react'
import Loader from '@/components/Loader'
import Breadcrumbs from '@/components/breadcrumbs'

export default function page() {
  return (
    <Suspense fallback={<Loader />}>
         <Breadcrumbs
        breadcrumbs={[
          { label: 'Previas', href: '/dashboard/previas' },
          {
            label: 'New Previa',
            href: '/dashboard/previas/new',
            active: true
          }
        ]}
      />
      <div className="px-12 py-16 md:py-6 min-h-screen">
        <NewPreviaForm />
      </div>
    </Suspense>
  )
}
