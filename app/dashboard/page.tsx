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
      <div className="px-4 py-6 lg:py-16 min-h-screen flex items-center flex-col">
        <div className='w-full'>
          <GroupBtn />
        </div>
        <Grid searchParams={searchParams} />
      </div>
    </Suspense>
  )
}
