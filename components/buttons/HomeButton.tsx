import Link from 'next/link'

export default function HomeButton() {

  return (
    <Link
      className={`btn-secondary my-3 max-w-32 ${
        false ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      href='/auth/login'
    >
      {"Let's Start"}
    </Link>
  )
}
