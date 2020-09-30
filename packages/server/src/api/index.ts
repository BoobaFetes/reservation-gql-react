import { rootValue, RootValueParams } from "./rootValue";
import { schema } from "./schema";
import { graphqlHTTP } from "express-graphql";

export const api = (rootValueParams: RootValueParams) =>
  graphqlHTTP({
    schema,
    rootValue: rootValue(rootValueParams),
  });
