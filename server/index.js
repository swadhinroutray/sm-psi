const path = require("path");
require("dotenv").config({ path: path.resolve(".env") });

const express = require("express");
const app = express();
const port = process.env.SERVER_PORT || 8001;
const db = require("./config/mongo");
const routes = require("./routes/routes");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

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
