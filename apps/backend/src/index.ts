import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";

dotenv.config({ path: "../../.env" });
import routes from "./routes";
import connectDb from "./db/dbConnect";
import next from "next";
import path from "path";
import http from "http";
import { initSocket } from "./socket";

const PORT = process.env.PORT;

const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev, dir: path.join(__dirname, "../../frontend") });
const handle = nextApp.getRequestHandler();

const app = express();
const httpServer = http.createServer(app);

app.use(cors());

initSocket(httpServer);

//Validating json usage
app.use(express.json());

/**
 * Routes
 */
app.use("/api/", routes);

connectDb();

if (!dev) {
  nextApp.prepare().then(() => {
    app.get("*", (req, res) => {
      return handle(req, res);
    });

    httpServer.listen(PORT, () => {
      console.log("Server Up in PORT:", PORT);
    });
  });
}

if (dev)
  httpServer.listen(PORT, () => {
    console.log("Server <Dev> Up in PORT:", PORT);
  });
