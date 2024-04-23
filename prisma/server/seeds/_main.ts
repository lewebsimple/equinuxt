import { PrismaClient } from "@prisma/client";

import { seedAdminUser } from "./admin-user";

export type SeedFn = (prisma: PrismaClient) => Promise<any>;

const prisma = new PrismaClient();
const seeds: Record<string, SeedFn> = {
  seedAdminUser,
};

(async function main() {
  for (const [seedName, seedFn] of Object.entries(seeds)) {
    console.log("\n🌱 " + seedName);
    console.log(await seedFn(prisma));
  }
})()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
