import { Response } from "express";

const successResponse = (
  res: Response,
  message: string = "success",
  statusCode: number = 200,
  data: any
) => {
  res
    .status(statusCode)
    .json({ success: true, responseMessage: message, ...data });
};

export default successResponse;
