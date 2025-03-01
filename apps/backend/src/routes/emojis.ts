import { addEmojis, getEmojis, getAllEmojis } from "../controller/emojis";
import Router from "express";
import { check } from "express-validator";

const router = Router();

// GET the emojis Questions
router.get("/", getEmojis);

// GET all emojis Questions
router.get("/all/", getAllEmojis);

// POST the emojis
router.post(
  "/",
  [
    check("emojis").notEmpty().withMessage("Emojis are required field"),
    check("answer").notEmpty().withMessage("Answer is required"),
    check("hints").notEmpty().withMessage("Hints is required"),
  ],
  addEmojis
);

export default router;
