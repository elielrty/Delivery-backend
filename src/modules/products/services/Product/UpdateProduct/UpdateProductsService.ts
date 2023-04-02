import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductsDTO';
import { Product } from '@modules/products/entities/product';
import { ICategoryProductRepository } from '@modules/products/repositories/ICategoryProductsRepository';
import { IProductRepository } from '@modules/products/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

interface IRequest extends ICreateProductDTO {
  id: string;
}

@injectable()
export class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('CategoryProductRepository')
    private categoryProductRepository: ICategoryProductRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    value,
    isDiscount,
    category_id,
    user_id,
  }: IRequest): Promise<Product> {
    const products = await this.productRepository.findById(id);

    if (!products) {
      throw new AppError('Produto não encontrado!', 404);
    }

    const category = await this.categoryProductRepository.findById(category_id);

    if (!category) {
      throw new AppError('Categoria não encontrado!', 404);
    }

    products.name = name;
    products.description = description;
    products.value = value;
    products.isDiscount = isDiscount;
    products.category_id = category.id;
    products.updateAt = new Date();
    products.updateBy = user_id;

    await this.productRepository.update(products);

    return products;
  }
}
