import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { User } from '@modules/user/entities/user';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

interface IRequest extends Omit<ICreateUserDTO, 'password'> {
  id: string;
  user_id: string;
}

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    id,
    user_id,
    name,
    email,
    isAdmin,
    phone,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    const userWithValidEmail = await this.userRepository.findByEmail(email);

    if (userWithValidEmail && userWithValidEmail.id !== id) {
      throw new AppError('E-mail já usado!');
    }

    user.name = name;
    user.email = email;
    user.phone = phone || '';
    user.isAdmin = isAdmin;
    user.updateBy = user_id;

    await this.userRepository.update(user);

    return user;
  }
}
