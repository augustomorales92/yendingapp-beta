import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io"

export default function DashboardLayout({ children }) {


  return (
    <div>
      <div className="flex justify-end items-center border-b shadow-md bg-gradient-to-r from-sky-500 to-indigo-500">
        <Link className='p-5 text-lg text-white' href="/onboarding">
          <FaUser />
        </Link>
        <Link href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Meetup_Logo.png"
            className="w-10 object-contain "
            alt="logo" />
        </Link>
        <Link className='p-5 text-lg text-white' href="/dashboard">
          <IoIosChatboxes />
        </Link>
      </div>
      <div className="flex m-auto text-white">
        {children}
      </div>
    </div>
  );
}