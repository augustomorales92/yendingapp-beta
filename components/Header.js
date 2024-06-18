import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

export default function Header({minimal}) {

    const { data: session } = useSession();

    return (
        <nav className='w-100 flex justify-center bg-gradient-to-r from-sky-500 to-indigo-500'>
            <Link href="/" className="w-10 ">
                <img alt='logo' className="w-full cursor-pointer" src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Meetup_Logo.png" />
            </Link>
            {!session && !minimal &&
                <Link href="/auth/login" className='nav-button'>
                    Login
                </Link>
            }
            {session &&
                <Link href="/dashboard" className='nav-button' >
                    Dashboard
                </Link>
            }
        </nav>
    )
}
