import OnboardingForm from '@/components/forms/OnboaringForm'
import { Suspense } from 'react'
import Loader from '@/components/Loader'
import { auth } from '@/auth'

 async function OnboardingContainer() {
  const session = await auth()
  const user = session?.user.userData
  return (
    <div className="px-12 py-6 lg:py-16 min-h-screen overflow-x-hidden">
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
