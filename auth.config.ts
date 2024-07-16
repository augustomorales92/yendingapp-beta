import type { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      console.log('aaaaaaa', auth)
      const isOnOnboarding = nextUrl.pathname.startsWith('/dashboard')
      if (isOnOnboarding) {
        if (isLoggedIn) return true
        return Response.redirect(new URL('/', nextUrl))
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    }
  },
  providers: []
} satisfies NextAuthConfig
