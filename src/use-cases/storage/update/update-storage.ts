import { ShowStorageRepository } from "repositories/storage/show-storage-repository";
import {
  UpdateStorageParams,
  UpdateStorageRepository,
} from "repositories/storage/update-storage-repository";

export class UpdateStorage {
  constructor(
    private updateStorageReposirory: UpdateStorageRepository,
    private showStorageRepository: ShowStorageRepository
  ) {}

  async execute({
    storageId,
    account,
    description,
    link,
    usageLocation,
    userId,
  }: UpdateStorageParams) {
    const storage = await this.showStorageRepository.show(storageId, userId);

    if (!storage) {
      throw Error("Storage not found");
    }

    const updatedStorage = await this.updateStorageReposirory.update({
      storageId: storageId,
      account: account,
      userId: userId,
      description: description,
      link: link,
      usageLocation: usageLocation,
    });

    return updatedStorage;
  }
}