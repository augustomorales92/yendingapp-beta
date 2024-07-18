import NextAuth from 'next-auth'
import { authConfig, prisma } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials: Partial<Record<string, unknown>>) {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        const user = await prisma.users.findUnique({ where: { email: email } })

        if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password || '')
          if (!passwordMatch) {
            return null
          }
          return user
        }
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
  ]
})
