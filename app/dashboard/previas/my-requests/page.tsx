export const dynamic = 'force-dynamic'
import Breadcrumbs from '@/components/breadcrumbs'
import Loader from '@/components/Loader'
import Table from '@/components/tables/TableMyRequests'
import { Suspense } from 'react'


export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
         <Breadcrumbs
        breadcrumbs={[
          { label: 'Previas', href: '/dashboard/previas' },
          {
            label: 'My Requests',
            href: '/dashboard/previas/my-requests',
            active: true
          }
        ]}
      />
      <Table />
    </Suspense>
  )
}
