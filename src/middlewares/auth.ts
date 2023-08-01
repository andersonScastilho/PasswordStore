import Auth from "entities/Auth";
import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ errors: ["Login required"] });
    }
    const id = Auth.validAuth(authorization);

    req.params = { userId: id };
    return next();
  } catch (e) {
    return res.status(401).json({ errors: ["Token expired or invalid"] });
  }
};
