import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUser } from "./DataService";

const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        authorized({auth, request}){
            return !!auth?.user;
        },
        async signIn({user, account, profile}){
            try{
                const existingUser = await getUser(user.email);
                if(!existingUser){
                    const newUser = await createUser({ email: user.email, name: user.name, image: user.image });
                }
                return true;
            }
            catch{
                return false;
            }
        },
        async session({session, user}){
            const User  = await getUser(session.user.email);
            session.user.userID = User.id;
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
};

export const {signIn, signOut, auth, handlers: { GET, POST} } = NextAuth(authConfig);