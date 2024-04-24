// Pagination input
export const paginationInput = builder.inputType("PaginationInput", {
  fields: (t) => ({
    skip: t.int({ required: true }),
    take: t.int({ required: true }),
  }),
});

// Pagination interface
export const paginationInterface = builder.simpleInterface("Pagination", {
  fields: (t) => ({
    total: t.int({ nullable: false }),
  }),
});
