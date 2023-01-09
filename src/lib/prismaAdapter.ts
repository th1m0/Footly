import type { PrismaClient, Prisma } from "@prisma/client"
import type { Adapter, AdapterAccount, AdapterUser, AdapterSession, VerificationToken } from "next-auth/adapters"

/** @return { import("next-auth/adapters").Adapter } */
export default function prismaAdapter(client: PrismaClient, options = {}): Adapter {
    return {
      async createUser(data: Omit<AdapterUser, "id">) {
        const user = await client.user.create({ data })
        return user as AdapterUser
      },
      async getUser(id: string) {
        const user = await client.user.findUnique({ where: { id }})
        return user as AdapterUser
      },
      async getUserByEmail(email: string) {
        const user = await client.user.findUnique({ where: { email }})
        return user as AdapterUser
      },
      async getUserByAccount(provider_providerAccountId) {
        const account = await client.account.findUnique({ where: { provider_providerAccountId }, select: { user: true }})
        return (account?.user as AdapterUser) ?? null 
      },
      async updateUser({ id, ...data }) {
        const updatedUser = await client.user.update({ where: { id }, data }) 
        return updatedUser as AdapterUser
      },
      async deleteUser(id) {
        const deletedUser = await client.user.delete({ where: { id }})
        return deletedUser as AdapterUser
      },
      async linkAccount(data) {
        const account = await client.account.create({ data })
        return account as AdapterAccount
      },
      async unlinkAccount(provider_providerAccountId) {
        const deletedAccount = await client.account.delete({ where: { provider_providerAccountId } })
        return deletedAccount as AdapterAccount
      },
      async createSession(data) {
        const session = await client.session.create({ data })
        return session as AdapterSession
      },
      async getSessionAndUser(sessionToken) {
        const userSession = await client.session.findUnique({ where: {sessionToken}, include: { user: true }})
        if (!userSession) return null
        const { user, ...session } = userSession
        return { user: (user as AdapterUser), session: (session as AdapterSession)}
      },
      async updateSession(data) {
        const updatedSession = await client.session.update({ where: { sessionToken: data.sessionToken }, data })
        return updatedSession as AdapterSession 
      },
      async deleteSession(sessionToken) {
        const deletedSession = await client.session.delete({ where: { sessionToken }})
        return deletedSession as AdapterSession
      },
      async createVerificationToken(data) {
        const verificationToken = await client.verificationToken.create({ data })
        return verificationToken
      },
      async useVerificationToken(identifier_token) {
        try {
          const verificationToken = await client.verificationToken.delete({ where: { identifier_token }})

          return verificationToken
        } catch (error) {
          if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
          return null
        throw error
        }
      },
    }
  }