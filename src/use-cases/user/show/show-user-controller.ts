import { NextFunction, Request, Response } from "express";
import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";
import { ShowUser } from "./show-user";

export class ShowUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    try {
      const userRepository = new PostgresShowUserPerUserIdRepository();

      const showUser = new ShowUser(userRepository);

      const user = await showUser.execute(userId);

      return res.status(200).json({
        email: user.userEmail,
        fullName: user.userFullName,
      });
    } catch (e) {
      next(e);
    }
  }
}
