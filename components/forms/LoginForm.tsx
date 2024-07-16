"use client";

import { Input } from "@material-tailwind/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import toast from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    // handle errors 
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let toastId: string;
        try {
            setIsLoading(true);
            toastId = toast.loading("We're working on in... you'll be redirected soon...");
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                toast.dismiss(toastId);
                setIsLoading(false)
                return;
            }

            router.push("/onboarding");
            setEmail('');
            setPassword('');
            toast.dismiss(toastId);
            setIsLoading(false);

        } catch (error) {
            console.log(error);
            setIsLoading(false);
            if (toastId) {
                toast.dismiss(toastId)
            };
            toast.error('Ocurrió un error. Inténtalo de nuevo.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col mt-3 gap-3">
            <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}            />
            <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                label="Password" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}            />
            <button className="btn-primary">
                <span>{isLoading ? <BeatLoader color="white" /> : 'Login'}</span>
            </button>

            {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                </div>
            )}

        </form>
    )
}