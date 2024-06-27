'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaGlassCheers, FaTimes } from 'react-icons/fa';
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {

    const { data: session } = useSession();
    const [navbar, setNavbar] = useState(false);

    return (
        <nav className='w-full bg-primary_b fixed top-0 left-0 right-0 z-10'>
            <div className='justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8'>
                <div>
                    <div className='flex items-center justify-between py-3 md:py-5 md:block'>
                        <Link href="/" className='text-secondary text-3xl hover:text-primary' >
                            <FaGlassCheers />
                        </Link>
                        <div className='md:hidden'>
                            <button
                                className="p-2 text-secondary text-3xl rounded-md outline-none hover:text-primary"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <FaTimes />
                                ) : (
                                    <RxHamburgerMenu />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-start pb-3 mt-2 md:block md:pb-0 md:mt-0 ${navbar ? 'p-12 md:p-0 block' : 'hidden'
                            }`}
                    >
                        <ul className="md:h-auto items-center justify-center md:flex ">
                            <li className=" text-xl text-secondary py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-primary border-primary  md:hover:text-primary md:hover:bg-transparent">
                                <Link href="/onboarding" onClick={() => setNavbar(!navbar)}  >
                                    {session ? "Profile" : "Onboarding"}
                                </Link>
                            </li>
                            <li className=" text-xl text-secondary py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-primary border-primary  md:hover:text-primary md:hover:bg-transparent">
                                {!session &&
                                    <Link href="/auth/login" onClick={() => setNavbar(!navbar)} >
                                        Login
                                    </Link>
                                }
                                {session &&
                                    <Link href="/dashboard" onClick={() => setNavbar(!navbar)}  >
                                        Dashboard
                                    </Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
