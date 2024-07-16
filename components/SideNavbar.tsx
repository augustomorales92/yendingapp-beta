import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { auth } from "@/auth";
import NavLinks from "./nav-links";

async function SideNavbar() {

  const session = await auth();

  return (
    <div>
      <Disclosure as="nav">
        <DisclosureButton className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-primary_b hover:bg-primary_b hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </DisclosureButton>
        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center text-secondary">
            <h1 className="text-base text-center cursor-pointer font-bold  border-b border-primary_b pb-4 w-full">
              Yending App Dashboard
            </h1>
            <div className=" my-4 border-b border-primary_b pb-4">
              <NavLinks session={session}/>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;