import { ICreateCategoryProductDTO } from '@modules/products/dtos/ICreateCategoryProductsDTO';
import { CategoryProduct } from '@modules/products/entities/categoryProduct';
import { ICategoryProductRepository } from '@modules/products/repositories/ICategoryProductsRepository';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

@injectable()
export class CreateCategoryProductService {
  constructor(
    @inject('CategoryProductRepository')
    private readonly categoryProductRepository: ICategoryProductRepository,
  ) {}

  public async execute({
    name,
    type,
    user_id,
  }: ICreateCategoryProductDTO): Promise<CategoryProduct> {
    const checkCategoryProduct =
      await this.categoryProductRepository.findByName(name);

    if (checkCategoryProduct) {
      throw new AppError('Category Product already exists', 400);
    }

    const category = new CategoryProduct({
      name,
      type,
      createBy: user_id,
    });

    await this.categoryProductRepository.create(category);

    return category;
  }
}
