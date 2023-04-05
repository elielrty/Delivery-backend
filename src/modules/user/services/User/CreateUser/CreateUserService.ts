import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { User } from '@modules/user/entities/user';
import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { IRolesRepository } from '@modules/user/repositories/IRolesRepository';
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
    @inject('RolesRepository')
    private readonly rolesRepository: IRolesRepository,
  ) {}

  public async execute({
    email,
    isAdmin,
    name,
    password,
    phone,
    roles,
  }: ICreateUserDTO): Promise<User> {
    const userCheckByEmail = await this.userRepository.findByEmail(email);

    if (userCheckByEmail) {
      throw new AppError('E-mail já cadastrado!');
    }

    const rolesById = await Promise.all(
      roles.map(async role => {
        const checkRoleById = await this.rolesRepository.findById(role);

        if (checkRoleById === null) {
          throw new AppError(`A role ${role} não foi encontrada!`);
        }
        return checkRoleById;
      }),
    );

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = new User({
      email,
      isAdmin,
      name,
      password: hashedPassword,
      phone,
      roles: rolesById,
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
