import { User } from '@modules/user/entities/user';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

@injectable()
export class FindUserByIdService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    return user;
  }
}
