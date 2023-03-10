import { CategoryCommerce } from '@modules/commerce/entities/categoryCommerce';
import { ICategoryCommerceRepository } from '@modules/commerce/repositories/ICategoryCommerceRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

@injectable()
export class FindCategoryCommerceByIdService {
  constructor(
    @inject('CategoryCommerceRepository')
    private readonly categoryCommerceRepository: ICategoryCommerceRepository,
  ) {}

  public async execute(id: string): Promise<CategoryCommerce> {
    const category = await this.categoryCommerceRepository.findById(id);

    if (!category) {
      throw new AppError('Categoria não encontrada!', 404);
    }

    return category;
  }
}
