import { UserRole } from "@prisma/client";

// import { authHashPassword } from "~/auth/server/utils/password";
// import { authGenerateUserId } from "~/auth/server/utils/user-id";
import type { SeedFn } from "./_main";

export const seedAdminUser: SeedFn = async (prisma) => {
  const adminUserData = {
    email: process.env.SEED_ADMIN_EMAIL || "admin@example.com",
    password: process.env.SEED_ADMIN_PASSWORD || "changeme",
    // password: await authHashPassword(process.env.SEED_ADMIN_PASSWORD || "changeme"),
    role: UserRole.Administrator,
  };
  const adminUserProfileData = {
    firstName: process.env.SEED_ADMIN_FIRST_NAME || "Default",
    lastName: process.env.SEED_ADMIN_LAST_NAME || "Administrator",
  };
  const existing = await prisma.user.findUnique({ where: { email: adminUserData.email } });
  if (existing) {
    await prisma.user.update({
      where: { email: adminUserData.email },
      data: { ...adminUserData, profile: { update: adminUserProfileData } },
    });
  } else {
    await prisma.user.create({
      data: { id: adminUserData.email, ...adminUserData, profile: { create: adminUserProfileData } },
      // data: { id: authGenerateUserId(), ...adminUserData, profile: { create: adminUserProfileData } },
    });
  }
  return adminUserData.email;
};
