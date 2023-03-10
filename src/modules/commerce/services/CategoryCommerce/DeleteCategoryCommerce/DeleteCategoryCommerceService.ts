import { ICategoryCommerceRepository } from '@modules/commerce/repositories/ICategoryCommerceRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteCategoryCommerceService {
  constructor(
    @inject('CategoryCommerceRepository')
    private readonly categoryCommerceRepository: ICategoryCommerceRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const category = await this.categoryCommerceRepository.findById(id);

    if (!category) {
      throw new AppError('categoria não encontrada!', 404);
    }

    category.deleteBy = user_id;

    await this.categoryCommerceRepository.update(category);
    await this.categoryCommerceRepository.delete(id);
  }
}

export { DeleteCategoryCommerceService };
