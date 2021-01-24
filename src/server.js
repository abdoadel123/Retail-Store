import express from "express";
require("express-async-errors"); // wrap async errors within the app.
import cors from "cors";
import { router } from "./routes/index";
import { errorHandling } from "./middleware/errorHandler";
const http = require("http");

let server = express(),
  corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

let serverApp = http.createServer(server);
//console.log(serverApp);
server.use(cors(corsOptions));

// for application/x-www-form-urlencoded requests
server.use(express.urlencoded({ extended: true }));

// for application/json requests
server.use(express.json());

server.use("/users", router);
// Error handler middleware.
server.use(errorHandling);

// route not found fallback
server.all("*", (req, res, next) => {
  res.status(404).send("not found!!");
});

export { serverApp };
