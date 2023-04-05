import { ICreateCommerceDTO } from '@modules/commerce/dtos/ICreateCommerceDTO';
import { Commerce } from '@modules/commerce/entities/commerce';
import { ICategoryCommerceRepository } from '@modules/commerce/repositories/ICategoryCommerceRepository';
import { ICommerceRepository } from '@modules/commerce/repositories/ICommerceRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

@injectable()
export class CreateCommerceService {
  constructor(
    @inject('CommerceRepository')
    private readonly commerceRepository: ICommerceRepository,
    @inject('CategoryCommerceRepository')
    private readonly categoryCommerceRepository: ICategoryCommerceRepository,
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    category_id,
    cnpj,
    phone,
    user_id,
    users,
  }: ICreateCommerceDTO): Promise<Commerce> {
    const checkCommerce = await this.commerceRepository.findByName(name);

    if (checkCommerce) {
      throw new AppError('Commerce already exists', 400);
    }

    const checkCategoryCommerceById =
      await this.categoryCommerceRepository.findById(category_id);

    if (!checkCategoryCommerceById) {
      throw new AppError('category not found', 404);
    }

    const usersById = await Promise.all(
      users.map(async user => {
        const checkUserById = await this.userRepository.findById(user);

        if (checkUserById === null) {
          throw new AppError(`O Usuario ${user} não foi encontrado!`);
        }
        return checkUserById;
      }),
    );

    const commerce = new Commerce({
      category: checkCategoryCommerceById,
      cnpj,
      isOpen: false,
      phone,
      name,
      users: usersById,
      createBy: user_id,
    });

    await this.commerceRepository.create(commerce);

    return commerce;
  }
}
