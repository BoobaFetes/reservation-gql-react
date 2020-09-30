"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const rootValue_1 = require("./rootValue");
const schema_1 = require("./schema");
const express_graphql_1 = require("express-graphql");
exports.api = (rootValueParams) => express_graphql_1.graphqlHTTP({
    schema: schema_1.schema,
    rootValue: rootValue_1.rootValue(rootValueParams),
});
//# sourceMappingURL=index.js.map