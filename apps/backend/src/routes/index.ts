import { Router } from "express";
import user from "./user";
import room from "./room";
import emojis from "./emojis";

const router = Router();

//USER ROUTES
router.use("/user", user);

//ROOM ROUTES
// router.use("/room", room);

//EMOJIS ROUTES
// router.use("/emojis", emojis);

export default router;
