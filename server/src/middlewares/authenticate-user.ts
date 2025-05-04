import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error-handler";
import TryCatch from "../utils/try-catch";
import jwt from "jsonwebtoken";

const authenticateUser = TryCatch(
  async (
    req: Request & { userId?: string },
    res: Response,
    next: NextFunction
  ) => {
    const token = (
      req.headers.authorization ||
      (req.headers.Authorization as string | undefined)
    )?.split(" ")[1];

    if (!token) {
      return next(new ErrorHandler("Access token is missing or invalid", 404));
    }

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    req.userId = decoded.userId as string;

    next();
  }
);

export default authenticateUser;
