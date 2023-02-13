import { ICreateCategoryProductDTO } from '@modules/products/dtos/ICreateCategoryProductsDTO';
import { CategoryProduct } from '@modules/products/entities/categoryProduct';
import { ICategoryProductRepository } from '@modules/products/repositories/ICategoryProductsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

interface IRequest extends ICreateCategoryProductDTO {
  id: string;
}

@injectable()
export class UpdateCategoryProductService {
  constructor(
    @inject('CategoryProductsRepository')
    private categoryProductRepository: ICategoryProductRepository,
  ) {}

  public async execute({
    id,
    name,
    type,
    user_id,
  }: IRequest): Promise<CategoryProduct> {
    const categoryProducts = await this.categoryProductRepository.findById(id);

    if (!categoryProducts) {
      throw new AppError('Categoria não encontrado!', 404);
    }

    categoryProducts.name = name;
    categoryProducts.type = type;
    categoryProducts.updateAt = new Date();
    categoryProducts.updateBy = user_id;

    await this.categoryProductRepository.update(categoryProducts);

    return categoryProducts;
  }
}
