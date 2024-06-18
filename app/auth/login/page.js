'use client'

import {  useRouter } from "next/navigation";
import LoginGoogle from "@/components/buttons/LoginGoogle";
import LoginForm from "@/components/forms/LoginForm";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


export default function LoginPage() {

  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  

  return (
      <div className="mx-auto m-8 p-8 max-w-xs "> 
        <h1 className="text-4xl font-bold text-center mb-2">
          Sign in
        </h1>
        <p className="text-center mb-6 text-gray-500">
          Sign in to your account using one of the methods below
        </p>
        <LoginGoogle />
        <LoginForm/>
      </div>
  );
}