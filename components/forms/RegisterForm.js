"use client";

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

export default function RegisterForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    // handle errors 
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password)

        if (!email || !password) {
            setError('Miising fields');
            return;
        }
        //  ANTES HAGO QUE VERIFIQUE EL EMIAL
        try {
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
                setError('Usuario existente');
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
            console.log(result.status)

            const form = e.target;
            router.push("/onboarding")
            form.reset();

        } catch (error) {
            console.error('Error:', error);
            setError('Ocurrió un error. Inténtalo de nuevo.');
        }
    }



    return (

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-6">
            <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
            />
            <button className="btn-login">
                <FaUserAlt className="h-6" />
                <span>I'm ready</span>
            </button>

            {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                </div>
            )}

            <Link className="text-sm mt-3" href={"/auth/login"}>
                Already have an account? <span className="underline text-primary font-bold">Login</span>
            </Link>
        </form>
    )
}