import express from "express";
import { config } from "dotenv";
import { DataContext, Configuration } from "./core/index.js";

function setupEnvironment() {
  const envFound = config();

  if (envFound.error) {
    throw new Error("Couldn't find .env file");
  }
}

function startServer() {
  let app = express();
  app.use(express.static('./'));

  let port = process.env.NODE_PORT || 3000;

  app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });

  DataContext.init();

  Configuration.setup(app);
}

try {
  setupEnvironment();
  startServer();
} catch (e) {
  console.log("Can't start API Server ", e);
}
