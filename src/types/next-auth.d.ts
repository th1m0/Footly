import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Account {}

  interface Profile {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    exp: number;
    iat: number;
    jti: string;
    sub: string;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    id: string;
    email: string;
    emailVerified: Date | null;
  }
}
