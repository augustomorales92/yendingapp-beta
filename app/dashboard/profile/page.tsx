import OnboardingForm from '@/components/forms/OnboaringForm'
import { fetchUser } from '@/lib/actions'

export default async function page() {
  const user = await fetchUser()
  return (
    <div className="px-12 py-16 md:py-6 min-h-screen">
      <h1 className="text-secondary text-2xl font-bold mb-4">My Profile</h1>
      <OnboardingForm user={user}/>
    </div>
  )
}
