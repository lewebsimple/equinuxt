import { DateTimeResolver } from "graphql-scalars";

export type Scalars = {
  DateTime: { Input: Date; Output: Date };
  Upload: { Input: File; Output: never };
};

// DateTime scalar
export const dateTimeScalar = builder.addScalarType("DateTime", DateTimeResolver, {});

// Upload scalar
export const uploadScalar = builder.scalarType("Upload", {
  serialize: () => {
    throw new Error("Uploads can only be used as input types");
  },
});
