import { ICategoryProductRepository } from '@modules/products/repositories/ICategoryProductsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

interface IRequest {
  id: string;
  product_id: string;
}

@injectable()
class DeleteCategoryProductService {
  constructor(
    @inject('CategoryProductRepository')
    private CategoryProductRepository: ICategoryProductRepository,
  ) {}

  public async execute({ id, product_id }: IRequest): Promise<void> {
    const product = await this.CategoryProductRepository.findById(id);

    if (!product) {
      throw new AppError('Categoria nao encontrada!', 404);
    }

    product.deleteBy = product_id;

    await this.CategoryProductRepository.update(product);
    await this.CategoryProductRepository.delete(id);
  }
}

export { DeleteCategoryProductService };
