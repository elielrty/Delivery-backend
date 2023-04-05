import { IUserTokensRepository } from '@modules/user/repositories/IUserTokensRepository';

import { prismaClient } from '@shared/infra/dataBase/prisma/prismaClient';

import { UserToken } from '../../../entities/userToken';
import { UserTokenMappers } from '../mappers/userTokenMappers';

export class UserTokensRepository implements IUserTokensRepository {
  public async create(userToken: UserToken): Promise<UserToken> {
    const raw = UserTokenMappers.toPrisma(userToken);

    const token = await prismaClient.userToken.create({ data: raw });

    return UserTokenMappers.toDomain(token);
  }
  public async findByRefreshToken(
    refresh_token: string,
  ): Promise<UserToken | null> {
    const userToken = await prismaClient.userToken.findFirst({
      where: { refresh_token },
    });

    if (!userToken) {
      return null;
    }

    return UserTokenMappers.toDomain(userToken);
  }

  public async deleteById(id: string): Promise<void> {
    await prismaClient.userToken.delete({ where: { id } });
  }

  public async findByUserIdAndFCMToken(user_id: string): Promise<UserToken[]> {
    const userToken = await prismaClient.userToken.findMany({
      where: { user_id, fcm_token: true },
    });

    return UserTokenMappers.toDomainArray(userToken);
  }

  public async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | null> {
    const userToken = await prismaClient.userToken.findFirst({
      where: { refresh_token, user_id },
    });

    if (!userToken) {
      return null;
    }

    return UserTokenMappers.toDomain(userToken);
  }
}
