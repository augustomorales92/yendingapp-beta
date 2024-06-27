'use client'

import { useRouter } from "next/navigation";
import LoginGoogle from "@/components/buttons/LoginGoogle";
import LoginForm from "@/components/forms/LoginForm";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";


export default function LoginPage() {

  const { data: session, status } = useSession();
  const router = useRouter();

  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }



  return (
    <div className="grid place-items-center h-screen mx-2 ">
      <div className="bg-secondary_b shadow-lg text-black rounded-lg border-t-4">
        <div className="w-full h-64 relative mb-6">
          <Image
            src="/images/celebrate.jpg"
            alt="Descriptive Alt Text"
            layout="fill"
            objectFit="cover"
            priority="false"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-5 gap-3 ">
          <h1 className=" text-4xl font-bold text-center mb-2">
            Sign in
          </h1>
          <p className="text-center mb-6 text-gray-500">
            Sign in to your account using one of the methods below
          </p>
          <div className="flex flex-col gap-3 px-6">
            <LoginGoogle />
            <button
              onClick={() => setShowLogin(!showLogin)}
              className="btn-login"
            >
              <FaUser className="h-6" />
              Continue with Credentials
            </button>

            {showLogin && <LoginForm />}
            <Link className="text-sm " href={"/auth/register"}>
              Don't have an account? <span className="underline text-primary font-bold">Register</span>
            </Link>
          </div>
        </div>



      </div>

    </div>
  );
}