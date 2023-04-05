import { ICommerceRepository } from '@modules/commerce/repositories/ICommerceRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteCommerceService {
  constructor(
    @inject('CommerceRepository')
    private readonly commerceRepository: ICommerceRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const commerce = await this.commerceRepository.findById(id);

    if (!commerce) {
      throw new AppError('Comercio não encontrada!', 404);
    }

    commerce.deleteBy = user_id;

    await this.commerceRepository.update(commerce);
    await this.commerceRepository.delete(id);
  }
}

export { DeleteCommerceService };
