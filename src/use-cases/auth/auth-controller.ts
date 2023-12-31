import { NextFunction, Request, Response } from "express";

import { AuthUser } from "./auth-user";

import { PostgresShowUserPerEmailRepository } from "../../repositories/postgres/user/postgres-show-user-email-repository";
import { PostgresCreateRefreshToken } from "repositories/postgres/refresh_token/postgres-create-refresh_token-repository";
import { PostgresDeleteRefreshTokenRepository } from "repositories/postgres/refresh_token/postgres-delete-refresh_token-repository";
import { z } from "zod";

const BodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export class AuthController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = BodySchema.parse(req.body);

      if (!email || !password) {
        return res.status(400).json({
          error: "Missing data",
        });
      }

      const showUserPerEmailRepository =
        new PostgresShowUserPerEmailRepository();
      const createRefreshTokenRepository = new PostgresCreateRefreshToken();
      const deleteRefreshTokenRepository =
        new PostgresDeleteRefreshTokenRepository();

      const auth = new AuthUser(
        showUserPerEmailRepository,
        createRefreshTokenRepository,
        deleteRefreshTokenRepository
      );

      const token = await auth.execute({ email, password });

      return res.status(200).json(token);
    } catch (e) {
      next(e);
    }
  }
}
