import { ICreateCategoryCommerceDTO } from '@modules/commerce/dtos/ICreateCategoryCommerceDTO';
import { CategoryCommerce } from '@modules/commerce/entities/categoryCommerce';
import { ICategoryCommerceRepository } from '@modules/commerce/repositories/ICategoryCommerceRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

interface IRequest extends ICreateCategoryCommerceDTO {
  id: string;
}

@injectable()
export class UpdateCategoryCommerceService {
  constructor(
    @inject('CategoryCommerceRepository')
    private readonly categoryCommerceRepository: ICategoryCommerceRepository,
  ) {}

  public async execute({
    id,
    user_id,
    name,
    type,
  }: IRequest): Promise<CategoryCommerce> {
    const category = await this.categoryCommerceRepository.findById(id);

    if (!category) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    const categoryWithValidName =
      await this.categoryCommerceRepository.findByName(name);

    if (categoryWithValidName && categoryWithValidName.id !== id) {
      throw new AppError('Nome já em uso!');
    }

    category.name = name;
    category.type = type;
    category.updateBy = user_id;
    category.updateAt = new Date();

    await this.categoryCommerceRepository.update(category);

    return category;
  }
}
