import { Product } from '@modules/products/entities/product';
import { IProductRepository } from '@modules/products/repositories/IProductsRepository';
// import { Product } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

@injectable()
export class FindProductsByIdService {
  constructor(
    @inject('ProductRepository')
    private ProductRepository: IProductRepository,
  ) {}

  public async execute(id: string): Promise<Product> {
    const Product = await this.ProductRepository.findById(id);

    if (!Product) {
      throw new AppError('Produto não encontrado!', 404);
    }

    return Product;
  }
}
