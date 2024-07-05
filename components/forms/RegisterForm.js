"use client";

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import BeatLoader from "react-spinners/BeatLoader";
import { Input } from '@material-tailwind/react';

export default function RegisterForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    // handle errors 
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isError = false;
        if (!email) {
            setEmailError(true);
            isError = true;
        } else {
            setEmailError(false);
        }

        if (!password) {
            setPasswordError(true);
            isError = true;
        } else {
            setPasswordError(false);
        }

        if (isError) {
            toast.error("Missing data")
            return;
        }

        let toastId;
        try {
            setIsLoading(true);
            toastId = toast.loading("We're registering the user... you'll be redirected soon...");

            const res = await fetch('/api/userExists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) {
                throw new Error('Error verificando el usuario.');
            }

            //  VALIDAMOS USUARIO
            const { user } = await res.json();
            if (user) {
                toast.error('Usuario existente');
                toast.dismiss(toastId);
                setIsLoading(false)
                return;
            }

            const response = await fetch('/api/auth/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            if (!response.ok) {
                throw new Error('Error en el registro.');
            }
            // Iniciar sesión automáticamente después del registro
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            if (result.error) {
                throw new Error('Error iniciando sesión.');
            }

            const form = e.target;
            router.push('/onboarding')
            form.reset();
            toast.dismiss(toastId);
            setIsLoading(false);

        } catch (error) {
            console.error('Error:', error);
            toast.error('Ocurrió un error. Inténtalo de nuevo.');
            setIsLoading(false);
            if (toastId) {
                toast.dismiss(toastId);
            }

        }
    }


    return (

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-6">
            <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                color='white'
                label="Put your email"
                error={emailError ? "This field is required" : null}
                className={emailError ? "border-red-500 text-white" : ""}
            />
            <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                color='white'
                label="Choose your password"
                error={passwordError ? "This field is required" : null}
                className={passwordError ? "border-red-500 text-white" : ""}
            />
            <button className="btn-register">
                {isLoading ? (
                    <span><BeatLoader color="white"/></span>
                ) : (
                    <>
                        <FaUserAlt className="h-6" />
                        <span>I'm Ready</span>
                    </>
                )}
            </button>
            <Link className="text-sm mt-3" href={"/auth/login"}>
                Already have an account? <span className="underline text-primary_b font-bold">Login</span>
            </Link>
        </form>
    )
}