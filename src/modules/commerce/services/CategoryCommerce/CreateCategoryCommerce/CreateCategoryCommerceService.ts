import { ICreateCategoryCommerceDTO } from '@modules/commerce/dtos/ICreateCategoryCommerceDTO';
import { CategoryCommerce } from '@modules/commerce/entities/categoryCommerce';
import { ICategoryCommerceRepository } from '@modules/commerce/repositories/ICategoryCommerceRepository';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

@injectable()
export class CreateCategoryCommerceService {
  constructor(
    @inject('CategoryCommerceRepository')
    private readonly categoryCommerceRepository: ICategoryCommerceRepository,
  ) {}

  public async execute({
    name,
    type,
    user_id,
  }: ICreateCategoryCommerceDTO): Promise<CategoryCommerce> {
    const checkCategoryCommerce =
      await this.categoryCommerceRepository.findByName(name);

    if (checkCategoryCommerce) {
      throw new AppError('Category Commerce already exists', 400);
    }

    const category = new CategoryCommerce({
      type,
      name,
      createBy: user_id,
    });

    await this.categoryCommerceRepository.create(category);

    return category;
  }
}
