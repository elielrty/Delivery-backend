import { authConfig } from '@config/auth';
import { User } from '@modules/user/entities/user';
import { UserToken } from '@modules/user/entities/userToken';
import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserTokensRepository } from '@modules/user/repositories/IUserTokensRepository';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const findUserByEmail = await this.userRepository.findByEmail(email);

    if (!findUserByEmail) {
      throw new AppError('E-mail ou senha incorretos!', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      findUserByEmail.password,
    );

    if (!passwordMatched) {
      throw new AppError('E-mail ou senha incorretos!', 401);
    }

    const {
      token_secret,
      token_expires_in,
      refresh_token_secret,
      refresh_token_expires_in,
      refresh_token_expire_days,
    } = authConfig.jwt;

    const token = sign({}, token_secret, {
      subject: findUserByEmail.id,
      expiresIn: token_expires_in,
    });

    const refresh_token = sign({}, refresh_token_secret, {
      subject: findUserByEmail.id,
      expiresIn: refresh_token_expires_in,
    });

    const now = new Date();
    const expires_date = this.dateProvider.addDays(
      now,
      refresh_token_expire_days,
    );
    expires_date.setUTCDate(this.dateProvider.getDay(now));

    const userToken = new UserToken({
      user_id: findUserByEmail.id,
      refresh_token,
      expires_date,
      fcm_token: false,
    });

    await this.userTokensRepository.create(userToken);

    return {
      user: findUserByEmail,
      token,
      refresh_token,
    };
  }
}
