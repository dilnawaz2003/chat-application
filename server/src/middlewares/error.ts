import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/error-handler";
import mongoose from "mongoose";

export const errorMiddleWare = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  let message = err.message || "Internal Server Error";
  let statusCode = err.statusCode || 500;

  if (err instanceof mongoose.Error.ValidationError) {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(" ,");
    statusCode = 400;
  }

  // if (err.code === 11000) {
  //   const field = Object.keys(err.keyPattern)[0];
  //   message = `Duplicate field value for "${field}". Please use another value.`;
  //   statusCode = 400;
  // }

  // CastError (e.g., invalid ObjectId format)
  if (err instanceof mongoose.Error.CastError) {
    message = `Invalid value for field: ${err.path}`;
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
    },
  });
};
