'use client'
import {
  MdOutlineSpaceDashboard,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout
} from 'react-icons/md'
import { IoReturnDownBack } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { FaGlassCheers } from 'react-icons/fa'
import { BiMessageSquareDots } from 'react-icons/bi'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: MdOutlineSpaceDashboard },
  {
    name: 'Previas',
    href: '/dashboard/previas',
    icon: FaGlassCheers
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: CgProfile
  },
  {
    name: 'Messages',
    href: '',
    icon: BiMessageSquareDots
  },
  {
    name: 'More',
    href: '/dashboard/profile',
    icon: MdOutlineMoreHoriz
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: CgProfile
  }
]

export default function NavLinks({ session }) {
  const pathname = usePathname()

  const pathValue = () => {
    if (session) {
      signOut()
      redirect('/')
    }
    redirect('/auth/login')
  }

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-primary_b hover:shadow-lg m-auto ${
              pathname.startsWith(link.href) ? 'bg-primary_b' : ''
            }`}
          >
            <LinkIcon
              className={`text-2xl ${
                pathname.startsWith(link.href) ? 'text-white' : 'text-secondary'
              } group-hover:text-white`}
            />
            <h3
              className={`text-base font-semibold ${
                pathname.startsWith(link.href) ? 'text-white' : 'text-secondary'
              } group-hover:text-white`}
            >
              {link.name}
            </h3>
          </Link>
        )
      })}
      {session ? (
        <div className="flex flex-col text-sm p-2">
          <p className="">Logged as: </p>
          <p className="text-xs font-bold ">{session?.user?.email}</p>
        </div>
      ) : (
        ''
      )}
      <div
        onClick={() => pathValue()}
        className="flex mb-2 justify-start items-center gap-4 pl-5 border border-primary_b  hover:bg-primary_b p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
      >
        <MdOutlineLogout className="text-2xl  group-hover:text-white " />
        <h3 className="text-base  group-hover:text-white font-semibold ">
          { session ? 'Logout' : 'Sign in'}
        </h3>
      </div>
      <Link
        href="/"
        className="flex mb-2 justify-start items-center gap-4 pl-5 border border-primary_b hover:bg-primary_b p-1 rounded-md group cursor-pointer hover:shadow-lg m-auto"
      >
        <IoReturnDownBack className="text-2xl  group-hover:text-white " />
        <h3 className="text-base  group-hover:text-white font-semibold ">
          Home
        </h3>
      </Link>
    </>
  )
}

{
  /* <Link href="/dashboard" className={`flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-primary_b hover:shadow-lg m-auto ${
    pathname === '/dashboard' ? 'bg-primary_b' : ''
  }`}>
  <MdOutlineSpaceDashboard className={`text-2xl ${pathname === '/dashboard' ? 'text-white' : 'text-secondary'} group-hover:text-white`} />
  <h3 className={`text-base font-semibold ${
      pathname === '/dashboard' ? 'text-white' : 'text-secondary'
    } group-hover:text-white`}>
    Dashboard
  </h3>
</Link>
<Link href="/dashboard/previas" className={`flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-primary_b hover:shadow-lg m-auto ${
    pathname.startsWith('/dashboard/previas') ? 'bg-primary_b' : ''
  }`}>
  <FaGlassCheers className={`text-2xl ${pathname.startsWith('/dashboard/previas') ? 'text-white' : 'text-secondary'} group-hover:text-white`} />
  <h3 className={`text-base font-semibold ${
      pathname.startsWith('/dashboard/previas') ? 'text-white' : 'text-secondary'
    } group-hover:text-white`}>
    Previas
  </h3>
</Link>
<Link href="/dashboard/profile" className={`flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-primary_b hover:shadow-lg m-auto ${
    pathname === '/dashboard/profile' ? 'bg-primary_b' : ''
  }`}>
  <CgProfile className={`text-2xl ${pathname === '/dashboard/profile' ? 'text-white' : 'text-secondary'} group-hover:text-white`} />
  <h3 className={`text-base font-semibold ${
      pathname === '/dashboard/profile' ? 'text-white' : 'text-secondary'
    } group-hover:text-white`}>
    Profile
  </h3>
</Link>
<div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-primary_b p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
  <BiMessageSquareDots className="text-2xl  group-hover:text-white " />
  <h3 className="text-base  group-hover:text-white font-semibold ">
    Messages
  </h3>
</div>
</div>
{/* setting  
<div className=" my-4 border-b border-primary_b pb-4">
<div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-primary_b p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
  <MdOutlineSettings className="text-2xl  group-hover:text-white " />
  <h3 className="text-base  group-hover:text-white font-semibold ">
    Settings
  </h3>
</div>
<div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-primary_b p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
  <MdOutlineMoreHoriz className="text-2xl group-hover:text-white " />
  <h3 className="text-base group-hover:text-white font-semibold ">
    More
  </h3>
</div>
</div>
//logout
<div className="my-4 text-secondary">
{session? (
  <div className="flex flex-col text-sm p-2">
  <p className="">Logged as: </p>
  <p className="text-xs font-bold ">{session?.user?.email}</p>
</div>
) : ""}
<Link href={pathValue()} className="flex mb-2 justify-start items-center gap-4 pl-5 border border-primary_b  hover:bg-primary_b p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" >
  <MdOutlineLogout className="text-2xl  group-hover:text-white " />
  <h3 className="text-base  group-hover:text-white font-semibold ">
    {status === 'loading' ? '..Loading' : session ? "Logout" : "Sign in"}
  </h3>
</Link>
<Link href="/" className="flex mb-2 justify-start items-center gap-4 pl-5 border border-primary_b hover:bg-primary_b p-1 rounded-md group cursor-pointer hover:shadow-lg m-auto">
  <IoReturnDownBack className="text-2xl  group-hover:text-white " />
  <h3 className="text-base  group-hover:text-white font-semibold ">
    Home
  </h3>
</Link> */
}
