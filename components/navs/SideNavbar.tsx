'use client'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaGlassCheers } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import NavLinks from './nav-links'

function SideNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="md:hidden flex text-secondary font-bold items-center p-4 my-2">
        <button id="menu-button" onClick={() => setOpen(!open)}>
          <GiHamburgerMenu className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="text-3xl flex grow justify-center mr-6">
          <FaGlassCheers />
        </div>
      </div>
      <aside
        id="side-navbar"
        className={`bg-white top-0 p-4 fixed h-full w-64 max-w-full md:static md:w-64 transition-all transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-50 md:h-auto`}
      >
        <div className="flex flex-col justify-start items-center text-secondary h-full">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-base text-center cursor-pointer font-bold border-b border-primary_b pb-4 w-full">
              Yending App Dashboard
            </h1>
            <button
              className="md:hidden text-secondary font-bold p-2"
              onClick={() => setOpen(false)}
            >
              <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="my-4 border-b border-primary_b pb-4 w-full">
            <NavLinks />
          </div>
        </div>
      </aside>
    </>
  )
}

export default SideNavbar
