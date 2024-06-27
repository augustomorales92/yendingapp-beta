'use client';
import {signIn} from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function LoginGoogle() {

  return (
    <button
      onClick={() => signIn('google')} 
      className="bg-secondary text-black shadow rounded-md text-center w-full py-4 flex gap-3 items-center justify-center hover:text-primary transition duration-300">
      <FaGoogle className="h-6" />
      <span>Continue with Google</span>
    </button>
  );
}