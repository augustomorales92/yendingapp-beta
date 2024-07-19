import OnboardingForm from '@/components/forms/OnboaringForm'
import { fetchUser } from '@/lib/actions'
import { Suspense } from 'react'
import Loader from '@/components/Loader'

 async function OnboardingContainer() {
  const user = await fetchUser()
  return (
    <div className="px-12 py-16 md:py-6 min-h-screen">
      <h1 className="text-secondary text-2xl font-bold mb-4">My Profile</h1>
      <OnboardingForm user={user} />
    </div>
  )
}

export default function page() {
  return (
    <Suspense fallback={<Loader />}>
      <OnboardingContainer />
    </Suspense>
  )
}
