import { User } from '@modules/user/entities/user';
import { ICategoryProductRepository } from '@modules/products/repositories/ICategoryProductsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';
import { CategoryProduct } from '@prisma/client';

@injectable()
export class FindCategoryProductsByIdService {
  constructor(
    @inject('CategoryProductRepository')
    private CategoryProductRepository: ICategoryProductRepository,
  ) {}

  public async execute(id: string): Promise<CategoryProduct> {
    const CategoryProduct = await this.CategoryProductRepository.findById(id);

    if (!CategoryProduct) {
      throw new AppError('Categoria não encontrado!', 404);
    }

    return CategoryProduct;
  }
}
