
'use client'
import './globals.css'
import { AuthProvider } from '@/context/Providers';
import { ReactNode } from 'react';
import { Toaster } from "react-hot-toast";


/* export const metadata = {
  title: 'PreviApp ',
  description: 'Generated by create next app',
} */

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }:RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div>
            <Toaster position="bottom-right" />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}


export default RootLayout;