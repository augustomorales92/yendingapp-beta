"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser } from "react-icons/fa";


export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    // handle errors 
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                return;
            }

            router.push("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col mt-3 gap-3">
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
                <FaUser className="h-6" />
                <span>Continue with Credentials</span>
            </button>

            {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                </div>
            )}
            <Link className="text-sm " href={"/auth/register"}>
                Don't have an account? <span className="underline text-primary font-bold">Register</span>
            </Link>
        </form>
    )
}