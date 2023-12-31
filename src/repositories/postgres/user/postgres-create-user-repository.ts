import { User } from "entities/User";

import { prismaClient } from "database/prisma-client";

import { CreateUserRepository } from "repositories/user/create-user-repository";
import { UserSchema } from "models/user-schema";

export class PostgresCreateUserRepository implements CreateUserRepository {
  async create(user: User): Promise<void> {
    const { userEmail, userFullName, userPassword, userId } = user;

    const createdUser = await prismaClient.user.create({
      data: {
        email: userEmail,
        fullName: userFullName,
        id: userId,
        password_hash: userPassword,
      },
    });

    if (!createdUser) {
      throw Error("Não foi possivel criar o usuario");
    }

    return;
  }
}
