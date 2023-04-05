import { Roles } from '@modules/user/entities/roles';
import { IRolesRepository } from '@modules/user/repositories/IRolesRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

@injectable()
export class FindRoleByIdService {
  constructor(
    @inject('RolesRepository')
    private readonly rolesRepository: IRolesRepository,
  ) {}

  public async execute(id: string): Promise<Roles> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    return role;
  }
}
