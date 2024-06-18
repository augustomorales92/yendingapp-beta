'use client';
import {signIn, signOut} from "next-auth/react";
import { FaUser } from "react-icons/fa";

export default function LogoutBtn() {

  return (
    <button
      onClick={() => signOut()}
      className="bg-red-500 rounded-lg text-white shadow text-center w-full py-4 flex gap-3 items-center justify-center">
      <FaUser className="h-6" />
      <span>Logout</span>
    </button>
  );
}