import User from "@/models/User";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth"
import Credentials  from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { connectMongoDB } from "@/lib/connectMongoose";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import type { Adapter } from 'next-auth/adapters';


interface ICredentials {
    email: string;
    password: string;
}
export const authOptions: NextAuthOptions = {

    providers: [
        Credentials({
            name: "credentials",
            credentials: {},

            async authorize(credentials: ICredentials | undefined) {
                const { email, password } = credentials;
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        return null;
                    }
                    return user;
                } catch (error) {
                    console.log('error', error)
                }
            },

        }),
        // OAuth authentication providers...
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
    ],
   adapter: MongoDBAdapter(clientPromise)  as Adapter,
    session: {
        strategy: "jwt" as const,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
};