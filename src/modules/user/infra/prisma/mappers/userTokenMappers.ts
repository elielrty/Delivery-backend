import { UserToken } from '@modules/user/entities/userToken';
import { UserToken as RawUserToken } from '@prisma/client';

export class UserTokenMappers {
  static toPrisma(userToken: UserToken) {
    return {
      id: userToken.id,
      expires_date: userToken.expires_date,
      fcm_token: userToken.fcm_token,
      refresh_token: userToken.refresh_token,
      user_id: userToken.user_id,
      createBy: userToken.createBy ? userToken.createBy : userToken.user_id,
      updateBy: userToken.updateBy,
      updateAt: userToken.updateAt,
      deleteBy: userToken.deleteBy,
    };
  }

  static toDomain(raw: RawUserToken): UserToken {
    return new UserToken(
      {
        expires_date: raw.expires_date,
        fcm_token: raw.fcm_token,
        refresh_token: raw.refresh_token,
        user_id: raw.user_id,
      },
      raw.id,
    );
  }

  static toDomainArray(raws: RawUserToken[]): UserToken[] {
    const userTokens: UserToken[] = [];

    raws.map(raw =>
      userTokens.push(
        new UserToken(
          {
            expires_date: raw.expires_date,
            fcm_token: raw.fcm_token,
            refresh_token: raw.refresh_token,
            user_id: raw.user_id,
          },
          raw.id,
        ),
      ),
    );

    return userTokens;
  }
}
