import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { type UserRole } from "@prisma/client";
import { Lucia } from "lucia";

const adapter = new PrismaAdapter(prisma.userSession, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !process.dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      role: attributes.role,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  role: UserRole;
}
