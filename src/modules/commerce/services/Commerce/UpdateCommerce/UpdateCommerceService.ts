import { ICreateCommerceDTO } from '@modules/commerce/dtos/ICreateCommerceDTO';
import { Commerce } from '@modules/commerce/entities/commerce';
import { ICategoryCommerceRepository } from '@modules/commerce/repositories/ICategoryCommerceRepository';
import { ICommerceRepository } from '@modules/commerce/repositories/ICommerceRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

interface IRequest extends ICreateCommerceDTO {
  id: string;
}

@injectable()
export class UpdateCommerceService {
  constructor(
    @inject('CommerceRepository')
    private readonly commerceRepository: ICommerceRepository,
    @inject('CategoryCommerceRepository')
    private readonly categoryCommerceRepository: ICategoryCommerceRepository,
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute({
    id,
    user_id,
    name,
    category_id,
    cnpj,
    isOpen,
    phone,
    users,
  }: IRequest): Promise<Commerce> {
    const commerce = await this.commerceRepository.findById(id);

    if (!commerce) {
      throw new AppError('Comercio não encontrado!', 404);
    }

    const commerceWithValidName = await this.commerceRepository.findByName(
      name,
    );

    if (commerceWithValidName && commerceWithValidName.id !== id) {
      throw new AppError('Nome já em uso!');
    }

    const checkCategoryCommerceById =
      await this.categoryCommerceRepository.findById(category_id);

    if (!checkCategoryCommerceById) {
      throw new AppError('categoria de comercio não encontrada!', 404);
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

    if (isOpen !== undefined) {
      commerce.isOpen = isOpen;
    }

    commerce.name = name;
    commerce.cnpj = cnpj;
    commerce.phone = phone;
    commerce.category = checkCategoryCommerceById;
    commerce.users = usersById;
    commerce.updateBy = user_id;
    commerce.updateAt = new Date();

    await this.commerceRepository.update(commerce);

    return commerce;
  }
}
