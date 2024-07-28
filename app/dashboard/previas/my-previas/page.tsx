export const dynamic = 'force-dynamic'
import GroupBtn from '@/components/buttons/GroupBtn'
import MyPreviasCard from '@/components/cards/MyPreviasCard'
import React, { Suspense } from 'react'
import Loader from '@/components/Loader'
import Breadcrumbs from '@/components/breadcrumbs'

export default function Page({
  searchParams
}: {
  searchParams: { sortCriteria: string; modal: string }
}) {
  return (
    <Suspense fallback={<Loader />}>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Previas', href: '/dashboard/previas' },
          {
            label: 'My Previas',
            href: '/dashboard/previas/my-previas',
            active: true
          }
        ]}
      />
      <div className="px-12 py-6 md:py-6 min-h-screen lg:py-16">
        <div>
          <GroupBtn />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MyPreviasCard searchParams={searchParams} />
        </div>
      </div>{' '}
    </Suspense>
  )
}
