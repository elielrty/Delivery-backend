import ICreateUserTokenDTO from '../dtos/ICreateUserTokenDTO';
import { UserToken } from '../entities/userToken';

export interface IUserTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | null>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserToken | null>;
  findByUserIdAndFCMToken(user_id: string): Promise<UserToken[]>;
}
