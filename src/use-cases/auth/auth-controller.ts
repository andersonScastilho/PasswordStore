import { Request, Response } from "express";

import { AuthUser } from "./auth-user";

import { PostgresShowUserRepository } from "../../repositories/postgres/user/postgres-show-user-repository";
export class AuthController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Missing data",
        });
      }

      const userRepository = new PostgresShowUserRepository();
      const auth = new AuthUser(userRepository);

      const token = await auth.execute({ email, password });

      return res.status(200).json({ token });
    } catch (e) {
      return res.status(401).json({
        error: "Não foi possivel se autenticar",
      });
    }
  }
}
