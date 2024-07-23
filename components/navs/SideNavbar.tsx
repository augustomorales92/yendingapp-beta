
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import NavLinks from './nav-links'
import { FaGlassCheers } from 'react-icons/fa'



function SideNavbar() {

  return (
    <>
      <div className="block md:hidden flex text-secondary font-bold items-center p-4 my-2">
        <button id="menu-button" >
          <GiHamburgerMenu
            className="h-6 w-6"
            aria-hidden="true"
          />
        </button>
        <div className="text-3xl flex grow justify-center mr-6">
        <FaGlassCheers />
        </div>
      </div>
      <aside id="side-navbar" className="bg-white top-0 p-4 fixed w-full md:static md:w-auto transition-all transform -translate-y-full md:translate-y-0">
        <div className="flex flex-col justify-start item-center text-secondary">
          <h1 className="text-base text-center cursor-pointer font-bold border-b border-primary_b pb-4 w-full">
            Yending App Dashboard
          </h1>
          <div className="my-4 border-b border-primary_b pb-4">
            <NavLinks />
          </div>
        </div>
      </aside>
    </>

  )
}

export default SideNavbar
