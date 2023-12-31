import { prismaClient } from "database/prisma-client";
import { Storage } from "entities/Storage";
import { StorageSchema } from "models/storage-schema";
import { CreateStorageRepository } from "repositories/storage/create-storage-repository";

export class PostgresStorageRepository implements CreateStorageRepository {
  async create(storage: Storage): Promise<StorageSchema> {
    const {
      account,
      description,
      link,
      password,
      usageLocation,
      userId,
      storageId,
    } = storage;

    const createdStorage = await prismaClient.storage.create({
      data: {
        account,
        id: storageId,
        password,
        usageLocation,
        description,
        link,
        userId,
      },
    });

    if (!createdStorage) {
      throw Error("Não foi possivel armazenar os dados");
    }

    return createdStorage;
  }
}
