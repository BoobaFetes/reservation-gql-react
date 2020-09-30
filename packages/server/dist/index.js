"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("./api");
const business_layer_1 = require("@reservation-gql-react/business-layer");
const services = business_layer_1.createServices(`${__dirname}/db/reservation-gql-react.db`);
express_1.default()
    .get("/", express_1.default.static(__dirname + "/public"))
    .use("/api", api_1.api(services))
    .listen(process.env.PORT || 3333, () => {
    console.log("server started on port 3333");
});
//# sourceMappingURL=index.js.map