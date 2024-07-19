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
    signIn: '/auth/login',
  },
  providers: []
} satisfies NextAuthConfig
