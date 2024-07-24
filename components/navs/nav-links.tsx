'use client'
import { NavLinksContent } from './navContent'
import { Suspense } from 'react'
import Loader from '../Loader'
import { useSession } from 'next-auth/react'

export default function NavLinks() {
  const { data: session } = useSession()
  const logged = session?.user?.email || ''
  return (
    <Suspense fallback={<Loader />}>
      <NavLinksContent logged={logged} />
    </Suspense>
  )
}
