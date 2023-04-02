import { IProductRepository } from '@modules/products/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const Product = await this.productRepository.findById(id);

    if (!Product) {
      throw new AppError('Produto não encontrado!', 404);
    }

    Product.deleteBy = user_id;

    await this.productRepository.update(Product);
    // await this.productRepository.delete(id);
  }
}

export { DeleteProductService };
