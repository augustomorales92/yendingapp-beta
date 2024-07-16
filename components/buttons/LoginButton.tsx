import { auth, signOut } from '@/auth'
import Link from 'next/link'

export default async function LoginButton() {
  const session = await auth()
console.log('session:', session)
  const handleLink = () => {
    // si hay token, el boton actua como sign out, sino como sign in
    if (session) {
      signOut()
      return '/'
    } else {
      return '/auth/login'
    }
  }

  return (
    <Link
      className={`btn-secondary my-3 max-w-32 ${
        false ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      href={handleLink()}
    >
      {session ? 'Sign Out' : "Let's Start"}
    </Link>
  )
}
