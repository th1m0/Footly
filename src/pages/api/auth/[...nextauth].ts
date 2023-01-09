import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prismaAdapter from "../../../lib/database/prismaAdapter";
import prisma from "../../../lib/database/prismadb";

export default NextAuth({
  // adapter: prismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 1209600, // 14 days
  },
  providers: [
    // REGISTER PROVIDER
    CredentialsProvider({
      id: "Credentials-register",
      name: "Credentials-register",
      credentials: {
        firstName: { label: "First name", type: "text" },
        lastName: { label: "Last name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.firstName?.trim())
          throw new Error("First name is required.");
        if (!credentials?.lastName?.trim())
          throw new Error("Last name is required.");
        if (!credentials?.email?.trim()) throw new Error("Email is required.");
        if (!credentials?.password?.trim())
          throw new Error("Passowrd is required.");

        //save to db
        const user = await prisma.user.create({
          data: {
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            email: credentials.email,
            password: credentials.password,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        if (!user) throw new Error("Could not create user.");
        return user;
      },
    }),

    // LOGIN PRIVIDER
    CredentialsProvider({
      id: "Credentials-login",
      name: "Credentials-login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email?.trim()) throw new Error("Email is required.");
        if (!credentials?.password?.trim())
          throw new Error("Passowrd is required.");

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user)
          throw new Error(
            `Could not find the user with email "${credentials.email}".`
          );
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
      }

      return token;
    },

    async session({ session, token }) {
      if (token && token.user) {
        session.user = token.user;
      }

      return session;
    },
  },
});
