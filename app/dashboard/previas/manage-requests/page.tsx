export const dynamic = 'force-dynamic'
import { Suspense } from 'react'
import Loader from '@/components/Loader'
import Breadcrumbs from '@/components/breadcrumbs'
import Table from '@/components/tables/TableJoinRequest'

 function ManageRequestContent() {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Previas', href: '/dashboard/previas' },
          {
            label: 'Manage Requests',
            href: '/dashboard/previas/manage-requests',
            active: true
          }
        ]}
      />
      <div className="px-6 py-6 lg:py-16 min-h-screen">
        <Table />
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <ManageRequestContent />
    </Suspense>
  )
}
