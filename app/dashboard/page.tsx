export const dynamic = 'force-dynamic'
import GroupBtn from '@/components/buttons/GroupBtn'
import { Suspense } from 'react'
import Loader from '@/components/Loader'
import { Grid } from '@/components/previas/Grid'


export default function Page({
  searchParams
}: {
  searchParams: { sortCriteria: string; join: string }
}) {
  return (
    <Suspense fallback={<Loader />}>
      <div className="px-4 py-16 md:py-6 min-h-screen">
        <div>
          <GroupBtn />
        </div>
        <Grid searchParams={searchParams} />
      </div>
    </Suspense>
  )
}
