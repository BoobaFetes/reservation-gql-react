import express from "express";
import { api } from "./api";
import { createServices } from "@reservation-gql-react/business-layer";

const services = createServices(`${__dirname}/db/reservation-gql-react.db`);

express()
  .get("/", express.static(__dirname + "/public"))
  .use("/api", api(services))
  .listen(process.env.PORT || 3333, () => {
    console.log("server started on port 3333");
  });
