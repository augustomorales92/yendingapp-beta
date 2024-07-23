import OnboardingForm from '@/components/forms/OnboaringForm'
import { Suspense } from 'react'
import Loader from '@/components/Loader'
import { auth } from '@/auth'

 async function OnboardingContainer() {
  const session = await auth()
  const user = session?.user.userData
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
