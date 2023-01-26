import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { User } from '@modules/user/entities/user';
import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    isAdmin,
    name,
    password,
    phone,
  }: ICreateUserDTO): Promise<User> {
    const userCheckByEmail = await this.userRepository.findByEmail(email);

    if (userCheckByEmail) {
      throw new AppError('E-mail já cadastrado!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = new User({
      email,
      isAdmin,
      name,
      password: hashedPassword,
      phone,
    });

    await this.userRepository.create(user);

    /*
    const templatePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'views',
      'accountConfirmation.hbs',
    );

    const variables = {
      name: user.name,
      code: '8899',
    };

    this.mailProvider.sendMail({
      to: {
        name: user.name,
        address: user.email,
      },
      subject: '[Mr League] Confirmação de e-mail',
      templateData: {
        file: templatePath,
        variables,
      },
    });
    */
    return user;
  }
}
