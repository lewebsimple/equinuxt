import { createResolver, defineNuxtModule, useLogger } from "@nuxt/kit";
import { exec } from "child_process";

export default defineNuxtModule({
  meta: {
    name: "prisma",
  },
  setup(_options, nuxt) {
    const logger = useLogger();

    // Prisma client generation
    const prismaCliPath = createResolver(nuxt.options.workspaceDir).resolve("node_modules/.bin/prisma");
    const runPrismaGenerate = async () => {
      await new Promise<void>((resolve, reject) => {
        exec(`${prismaCliPath} generate`, (error) => {
          if (error) reject(error);
          else {
            logger.success("Prisma client generated successfully.");
            resolve();
          }
        });
      });
    };

    // Generate Prisma client before build
    nuxt.hooks.hook("build:before", runPrismaGenerate);

    // Watch schema.prisma for changes
    nuxt.hooks.hook("builder:watch", async (event, path) => {
      if (path.endsWith("schema.prisma")) {
        await runPrismaGenerate();
      }
    });
  },
});
