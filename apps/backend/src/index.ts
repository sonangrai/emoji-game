import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "../../.env" });
import routes from "./routes";
import connectDb from "./db/dbConnect";
import next from "next";
import path from "path";

const PORT = process.env.PORT;

const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev, dir: path.join(__dirname, "../../frontend") });
const handle = nextApp.getRequestHandler();

const app = express();

app.use(cors());

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

    app.listen(PORT, () => {
      console.log("Server Up in PORT:", PORT);
    });
  });
}

app.listen(PORT, () => {
  console.log("Server <Dev> Up in PORT:", PORT);
});
