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
  callbacks: {
    async jwt({ token, user }) {
      if(user && token){
        token.userData = user
      }
      return token
    },
    async session({ session, token }) {
      if(token.sub && session.user){
        session.user.id = token.sub
      }
      if(token.userData && session.user){
        session.user.userData = token.userData
      }
      return session
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        const user = await prisma.users.findUnique({ where: { email: email } })
        if (user) {
          const passwordMatch = await bcrypt.compare(
            password,
            user.password || ''
          )
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
