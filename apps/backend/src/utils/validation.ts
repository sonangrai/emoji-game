import { validationResult } from "express-validator";
import ResponseObj from "../controller/response";
import { NextFunction, Request, Response } from "express";

const validationCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let respObject = new ResponseObj(400, errors, "Validation error occurred");
    return res.status(400).send(respObject);
  }

  next();
};

export default validationCheck;
