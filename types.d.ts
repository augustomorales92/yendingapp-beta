import NextAuth from "next-auth"

declare module 'next-auth' {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
      user: {
        /** The user's id. */
        userData: User
        /**
         * By default, TypeScript merges new interface properties and overwrites existing ones.
         * In this case, the default session user properties will be overwritten,
         * with the new ones defined above. To keep the default session user properties,
         * you need to add them back into the newly declared interface.
         */
      } & DefaultSession['user']
    }
    interface User {
      // Remove the 'id' property from the interface declaration
    }
  }
  
  declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
      /** The user's role */
      userData: User
    }
  }