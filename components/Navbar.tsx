import { auth } from '@/auth';
import Link from 'next/link';
import React from 'react'
import { FaGlassCheers } from 'react-icons/fa';
import { MdDashboard, MdLogin } from "react-icons/md";

export default async function Navbar() {

    const session = await auth()

    return (
        <nav className='w-full bg-transparent fixed top-0 left-0 right-0 z-10'>
            <div className='flex justify-between items-center align-center m-2 px-6 py-3'>
                <Link href="/" className='text-secondary text-3xl hover:text-secondary_b' >
                    <FaGlassCheers />
                </Link>
                <ul className="">
                    <li className="text-3xl text-secondary text-center hover:text-secondary_b  ">
                        {/* {!session &&
                            <Link href="/auth/login" >
                                <div className="flex items-center">
                                    <MdLogin className="block md:hidden" />
                                    <span className="hidden md:block">Login</span>
                                </div>
                            </Link>
                        } */}
                        {session? 
                            <Link href="/dashboard"  >
                                <div className="flex items-center">
                                    <MdDashboard className="block md:hidden" />
                                    <span className="hidden md:block">Dashboard</span>
                                </div>
                            </Link> : ""
                        }
                    </li>
                </ul>
            </div>
        </nav >
    )
}
