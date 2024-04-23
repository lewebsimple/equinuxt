import { Prisma } from "@prisma/client";

// Prisma sort order enum
export const sortOrderEnum = builder.enumType(Prisma.SortOrder, { name: "SortOrderEnum" });
