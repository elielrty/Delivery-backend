import { CategoryProduct } from '@modules/products/entities/categoryProduct';
import { ICategoryProductRepository } from '@modules/products/repositories/ICategoryProductsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

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
