import { Commerce } from '@modules/commerce/entities/commerce';
import { ICommerceRepository } from '@modules/commerce/repositories/ICommerceRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

@injectable()
export class FindCommerceByIdService {
  constructor(
    @inject('CommerceRepository')
    private readonly commerceRepository: ICommerceRepository,
  ) {}

  public async execute(id: string): Promise<Commerce> {
    const commerce = await this.commerceRepository.findById(id);

    if (!commerce) {
      throw new AppError('Comercio não encontrada!', 404);
    }

    return commerce;
  }
}
