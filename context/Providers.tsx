// "use client";

// import { SessionProvider } from "next-auth/react";

// export const AuthProvider = ({children}) => {
//     return <SessionProvider>{children}</SessionProvider>
// }

'use client';
import { SessionProvider } from "next-auth/react";

interface Props {
    children: React.ReactNode
}

export const AuthProvider = ({children}:Props) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default AuthProvider;