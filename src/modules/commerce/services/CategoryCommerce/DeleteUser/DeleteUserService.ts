import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuario não encontrado!', 404);
    }

    user.deleteBy = user_id;

    await this.userRepository.update(user);
    await this.userRepository.delete(id);
  }
}

export { DeleteUserService };
