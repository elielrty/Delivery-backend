import { IRolesRepository } from '@modules/user/repositories/IRolesRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteRoleService {
  constructor(
    @inject('RolesRepository')
    private readonly rolesRepository: IRolesRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError('Role não encontrada!', 404);
    }

    role.deleteBy = user_id;

    await this.rolesRepository.update(role);
    await this.rolesRepository.delete(role.id);
  }
}

export { DeleteRoleService };
