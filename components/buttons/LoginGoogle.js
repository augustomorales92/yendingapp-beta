'use client';
import {signIn} from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function LoginGoogle() {

  return (
    <button
      onClick={() => signIn('google')} 
      className="bg-white text-black shadow text-center w-full py-4 flex gap-3 items-center justify-center hover:text-sky-600 transition duration-300">
      <FaGoogle className="h-6" />
      <span>Continue with Google</span>
    </button>
  );
}