import { IUserRepository } from '@modules/user/repositories/IUserRepository';

import { prismaClient } from '@shared/infra/dataBase/prisma/prismaClient';

import { User } from '../../../entities/user';
import { UserMappers } from '../mappers/userMappers';

export class UserRepository implements IUserRepository {
  public async create(user: User): Promise<void> {
    const raw = UserMappers.toPrisma(user);
    await prismaClient.user.create({
      data: {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        isAdmin: raw.isAdmin,
        phone: raw.phone,
        deleteAt: raw.deleteAt,
        UserRole: { connect: raw.roles?.map(role => ({ id: role.id })) },
      },
    });
  }

  public async findByEmail(email: string): Promise<any | null> {
    const user = await prismaClient.user.findFirst({
      include: { UserRole: true },
      where: { email, deleteAt: null },
    });

    if (!user) {
      return null;
    }

    return UserMappers.toDomain(user);
  }

  public async update(user: User): Promise<User> {
    const raw = UserMappers.toPrisma(user);
    const userUpdate = await prismaClient.user.update({
      where: { id: user.id },
      data: {
        email: raw.email,
        name: raw.name,
        updateAt: raw.updateAt,
        phone: raw.phone,
        deleteBy: raw.deleteBy,
        UserRole: { connect: raw.roles?.map(role => ({ id: role.id })) },
      },
      include: { UserRole: true },
    });

    return UserMappers.toDomain(userUpdate);
  }

  public async findById(id: string): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: { id, deleteAt: null },
      include: { UserRole: true },
    });

    if (!user) {
      return null;
    }

    return UserMappers.toDomain(user);
  }

  public async delete(id: string): Promise<void> {
    await prismaClient.user.delete({ where: { id } });
  }
}
