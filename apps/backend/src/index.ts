import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
dotenv.config();
import routes from "./routes";
import connectDb from "./db/dbConnect";

const app = express();
app.use(cors());

//Validating json usage
app.use(express.json());

const PORT = process.env.PORT;

/**
 * Creating an http server
 */
let server = http.createServer(app);

//Implemented the server in the socket
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

/**
 * Routes
 */
app.use("/api/", routes);

// io.on("connection", function (socket) {
//   console.log("A user connected");

//   //Whenever someone disconnects this piece of code executed
//   socket.on("disconnect", function () {
//     console.log("A user disconnected");
//   });
// });

// DB
connectDb();

server.listen(PORT, () => {
  console.log("Server Up in PORT:", PORT);
});
