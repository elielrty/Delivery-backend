import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductsDTO';
import { Product } from '@modules/products/entities/product';
import { IProductRepository } from '@modules/products/repositories/IProductsRepository';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

@injectable()
export class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private readonly ProductRepository: IProductRepository,
  ) {}

  public async execute({
    name,
    description,
    value,
    isDiscount,
    category_id,
    user_id,
  }: ICreateProductDTO): Promise<Product> {
    const checkProduct = await this.ProductRepository.findByName(description);

    if (checkProduct) {
      throw new AppError(' Product already exists', 400);
    }

    const product = new Product({
      name,
      description,
      value,
      isDiscount,
      category_id,
      createBy: user_id,
    });

    await this.ProductRepository.create(product);

    return product;
  }
}
