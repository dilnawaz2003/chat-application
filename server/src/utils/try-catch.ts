import { Request, Response, NextFunction } from "express";

const TryCatch =
  (
    passesFunc: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await passesFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default TryCatch;
