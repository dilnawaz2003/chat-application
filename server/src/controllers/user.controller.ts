import { NextFunction, Request, Response } from "express";
import TryCatch from "../utils/try-catch";
import { uploadToCloudinary } from "../utils/cloudinary";
import UserModel from "../models/user.model";
import { getToken } from "../utils/token";
import successResponse from "../utils/success-response";
import ErrorHandler from "../utils/error-handler";

const signUp = TryCatch(async (req: Request, res: Response) => {
  const userData = req.body;
  let avatar;

  if (req.file) {
    avatar = await uploadToCloudinary(req.file);
  }

  const user = await UserModel.create({ ...userData, avatar });

  const token = getToken({ userId: user });

  const { password, ...userWithOutPass } = user;

  res.cookie("token", token, {
    sameSite: "none",
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
  });

  successResponse(res, "User Created successfully", 201, userWithOutPass);
});

export const login = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName, password } = req.body;

    const user = await UserModel.findOne({ userName });

    if (!user) next(new ErrorHandler("Invalid username of password", 404));

    const isPasswordCorrect = user?.comparePassword(password);

    if (!isPasswordCorrect)
      next(new ErrorHandler("Invalid username of password", 400));

    const token = getToken({ userId: user });

    res.cookie("token", token, {
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });

    successResponse(res, "User Created successfully", 201, user);
  }
);

export const getUserProfile = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      throw next(new ErrorHandler(`User with ${userId} does not exist`, 404));
    }
    successResponse(res, "User fetched successfully", 200, user);
  }
);

export default {
  signUp,
  login,
  getUserProfile,
};
