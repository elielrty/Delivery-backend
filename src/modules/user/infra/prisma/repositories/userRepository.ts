import { IUserRepository } from '@modules/user/repositories/IUserRepository';

import { prismaClient } from '@shared/infra/dataBase/prisma/prismaClient';

import { User } from '../../../entities/user';
import { UserMappers } from '../mappers/userMappers';

export class UserRepository implements IUserRepository {
  public async create(user: User): Promise<void> {
    const raw = UserMappers.toPrisma(user);
    await prismaClient.user.create({ data: raw });
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    return UserMappers.toDomain(user);
  }

  public async update(user: User): Promise<User> {
    const raw = UserMappers.toPrisma(user);
    const userUpdate = await prismaClient.user.update({
      where: { id: user.id },
      data: raw,
    });

    return UserMappers.toDomain(userUpdate);
  }

  public async findById(id: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return UserMappers.toDomain(user);
  }

  public async delete(id: string): Promise<void> {
    await prismaClient.user.delete({ where: { id } });
  }
}
