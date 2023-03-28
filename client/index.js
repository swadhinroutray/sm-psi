import * as path from "path";
import * as dotenv from "dotenv";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config({ path: ".env" });

import express from "express";
import * as db from "./config/mongo.js";
import routes from "./routes/routes.js";

const app = express();

const port = process.env.CLIENT_PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connectMongo();

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

async function shutDown() {
  console.log("Received kill signal, shutting down gracefully");
  await db.disconnectMongo();
  console.log("Server Shutdown");
  process.exit(0);
}
