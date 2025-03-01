"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const routes_1 = __importDefault(require("./routes"));
const dbConnect_1 = __importDefault(require("./db/dbConnect"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//Validating json usage
app.use(express_1.default.json());
const PORT = process.env.PORT;
/**
 * Creating an http server
 */
let server = http_1.default.createServer(app);
//Implemented the server in the socket
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
/**
 * Routes
 */
app.use("/api/", routes_1.default);
// io.on("connection", function (socket) {
//   console.log("A user connected");
//   //Whenever someone disconnects this piece of code executed
//   socket.on("disconnect", function () {
//     console.log("A user disconnected");
//   });
// });
// DB
(0, dbConnect_1.default)();
server.listen(PORT, () => {
    console.log("Server Up in PORT:", PORT);
});
