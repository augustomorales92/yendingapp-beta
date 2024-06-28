'use client'
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { IoReturnDownBack } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaGlassCheers } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function SideNavbar() {

  const { data: session } = useSession();
  const router = useRouter()

  const handleClick = () => {
    if (session) {
      signOut()
      router.push('/')
    }
    router.push("/auth/login")
  }

  return (
    <div>
      <Disclosure as="nav">
        <DisclosureButton className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </DisclosureButton>
        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-primary border-b border-primary pb-4 w-full">
              Yending App Dashboard
            </h1>
            <div className=" my-4 border-b border-primary pb-4">
              <Link href="/dashboard" className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-primary p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Dashboard
                </h3>
              </Link>
              <Link href="/dashboard/profile" className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-primary p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Profile
                </h3>
              </Link>
              <Link href="/dashboard/previas" className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-primary p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <FaGlassCheers className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Previas
                </h3>
              </Link>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-primary p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Messages
                </h3>
              </div>
            </div>
            {/* setting  */}
            <div className=" my-4 border-b border-primary pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-primary p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Settings
                </h3>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-primary p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  More
                </h3>
              </div>
            </div>
            {/* logout */}
            <div className="my-4">
              {session? (
                <div className="flex flex-col text-sm p-2">
                <p className="text-primary">Logged as: </p>
                <p className="text-xs font-bold text-primary">{session?.user?.email}</p>
              </div>
              ) : ""}
              <div onClick={handleClick} className="flex mb-2 justify-start items-center gap-4 pl-5 border border-primary  hover:bg-primary p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  {session ? "Logout" : "Sign in"}
                </h3>
              </div>
              <Link href="/" className="flex mb-2 justify-start items-center gap-4 pl-5 border border-primary  hover:bg-primary p-1 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <IoReturnDownBack className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Home
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;