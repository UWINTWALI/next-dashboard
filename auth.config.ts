import next from "next";
import NextAuth, { NextAuthConfig } from "next-auth";
export const authConfig= {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({auth, request:{nextUrl}}){
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

            if(isOnDashboard){
                if(isLoggedIn) return true;
                return false; // redirect an unauthorized user to login page
            }else if(isLoggedIn){
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers:[] //add providers with an empty array for now, this provides login options such as google or Github

} satisfies NextAuthConfig;