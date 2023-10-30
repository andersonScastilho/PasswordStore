import { User } from "entities/user/User";
import { NotFound } from "helpers/classes/NotFound";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";

export class ShowUser {
  constructor(private showUserRepository: ShowUserPerUserIdRepository) {}
  async execute(userId: string) {
    const userSchema = await this.showUserRepository.show(userId);

    if (!userSchema) {
      throw new NotFound("User not found");
    }

    const user = new User({
      email: userSchema.email,
      fullName: userSchema.fullName,
      userId: userSchema.id,
      password: userSchema.password_hash,
      verifiedEmail: userSchema.verifiedEmail,
    });

    return user;
  }
}
