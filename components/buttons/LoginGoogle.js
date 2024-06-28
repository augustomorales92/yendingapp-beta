'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from 'react-hot-toast';

export default function LoginGoogle() {

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const toastId = toast.loading('Redirigiendo, por favor espera...');
    signIn('google')
      .then(() => {
        toast.dismiss(toastId);
      })
      .catch(error => {
        console.error('Error during sign in:', error);
        toast.dismiss(toastId);
        toast.error('Error al iniciar sesión. Inténtalo de nuevo.');
        setIsLoading(false);
      });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="bg-secondary text-black shadow rounded-md text-center w-full py-4 flex gap-3 items-center justify-center hover:text-primary transition duration-300"
      disabled={isLoading}>

      {isLoading ? (
        <span><BeatLoader color="#008DDA" /></span>
      ) : (
        <>
          <FaGoogle className="h-6" />
          <span>Continue with Google</span>
        </>
      )}
    </button>
  );
}