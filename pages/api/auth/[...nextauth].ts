// // pages/api/auth/[...nextauth].ts
// import NextAuth, { NextAuthOptions } from "next-auth";
// import { NextApiHandler } from 'next';
// import { verifyPassword, hashPassword } from "@lib/auth/passwords";
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import GitHubProvider from 'next-auth/providers/github';
// import prisma from '../../../lib/prisma';
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: NextAuthOptions = {
//     adapter: PrismaAdapter(prisma),
//     session: {
//       strategy: "jwt",
//     },
//     pages: {
//       signIn: "/sign-in",
//       // signOut: "/auth/logout",
//       // error: "/auth/error", // Error code passed in query string as ?error=
//     },
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     GoogleProvider({
//         clientId: process.env.GOOGLE_ID as string,
//         clientSecret: process.env.GOOGLE_SECRET as string,
//       }),
//       CredentialsProvider({
//         id: "app-login",
//         name: "App Login",
//         credentials: {
//           email: {
//             label: "Email Address",
//             type: "email",
//             placeholder: "john.doe@example.com",
//           },
//           password: {
//             label: "Password",
//             type: "password",
//             placeholder: "Your super secure password",
//           },
//         },
//         async authorize(credentials) {
//           try {
//             let maybeUser = await prisma.user.findFirst({
//               where: {
//                 email: credentials.email,
//               },
//               select: {
//                 id: true,
//                 email: true,
//                 password: true,
//                 name: true,
//                 role: true,
//               },
//             });
  
//             if (!maybeUser) {
//               if (!credentials.password || !credentials.email) {
//                 throw new Error("Invalid Credentials");
//               }
  
//               maybeUser = await prisma.user.create({
//                 data: {
//                   email: credentials.email,
//                   password: await hashPassword(credentials.password),
//                 },
//                 select: {
//                   id: true,
//                   email: true,
//                   password: true,
//                   name: true,
//                   role: true,
//                 },
//               });
//             } else {
//               const isValid = await verifyPassword(
//                 credentials.password,
//                 maybeUser.password
//               );
  
//               if (!isValid) {
//                 throw new Error("Invalid Credentials");
//               }
//             }
  
//             return {
//               id: maybeUser.id,
//               email: maybeUser.email,
//               name: maybeUser.name,
//               role: maybeUser.role,
//             };
//           } catch (error) {
//             console.log(error);
//             throw error;
//           }
//         },
//       }),
//   ],

//   secret: process.env.SECRET,

// //   pages: {
// //     signIn: "/",
// //     signOut: "/",
// //     error: "/",
// //   },
//   theme: {
//     colorScheme: "light",
//   },
//   callbacks: {
//     async jwt({ token, user, account, profile, isNewUser }) {
//       if (user) {
//         token.id = user.id;
//         // token.role = user.role;
//       }
//       return token;
//     },
//   },
// };

// export default NextAuth(authOptions);




// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import { NextApiHandler } from 'next';
import { verifyPassword,hashPassword } from "../../../lib/auth/passwords";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '../../../lib/prisma';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "../../../lib/auth/session";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: "/sign-in",
      // signOut: "/auth/logout",
      // error: "/auth/error", // Error code passed in query string as ?error=
    },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),
      CredentialsProvider({
        id: "app-login",
        name: "App Login",
        credentials: {
          email: {
            label: "Email Address",
            type: "email",
            placeholder: "john.doe@example.com",
          },
          password: {
            label: "Password",
            type: "password",
            placeholder: "Your super secure password",
          },
        },
        async authorize(credentials) {
          try {
            let maybeUser = await prisma.user.findFirst({
              where: {
                email: credentials.email,
              },
              select: {
                id: true,
                email: true,
                password: true,
                name: true,
              },
            });
  
            if (!maybeUser) {
              if (!credentials.password || !credentials.email) {
                throw new Error("Invalid Credentials");
              }
  
              maybeUser = await prisma.user.create({
                data: {
                  email: credentials.email,
                  password: await hashPassword(credentials.password),
                },
                select: {
                  id: true,
                  email: true,
                  password: true,
                  name: true,
                },
              });
            } else {
              const isValid = await verifyPassword(
                credentials.password,
                maybeUser.password
              );
  
              if (!isValid) {
                throw new Error("Invalid Credentials");
              }
            }
  
            return {
              id: maybeUser.id,
              email: maybeUser.email,
              name: maybeUser.name,
            };
          } catch (error) {
            console.log(error);
            throw error;
          }
        },
      }),
  ],

  secret: process.env.SECRET,

  // pages: {
  //   signIn: "/",
  //   signOut: "/",
  //   error: "/",
  // },
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token, user }) {
      const sess: Session = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };

      return sess;
    },
  },
};

export default NextAuth(authOptions);

