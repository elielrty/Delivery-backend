import { ICreateRolesDTO } from '@modules/user/dtos/ICreateRolesDTO';
import { Roles } from '@modules/user/entities/roles';
import { IRolesRepository } from '@modules/user/repositories/IRolesRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

interface IRequest extends Omit<ICreateRolesDTO, 'createBy'> {
  id: string;
  user_id: string;
}

@injectable()
export class UpdateUserService {
  constructor(
    @inject('RolesRepository')
    private readonly rolesRepository: IRolesRepository,
  ) {}

  public async execute({ id, user_id, role }: IRequest): Promise<Roles> {
    const roleCheckById = await this.rolesRepository.findById(id);

    if (!roleCheckById) {
      throw new AppError('Role não encontrada!', 404);
    }

    const userWithValidRole = await this.rolesRepository.findByRole(role);

    if (userWithValidRole && userWithValidRole.id !== id) {
      throw new AppError('Role já usado!');
    }

    roleCheckById.role = role;
    roleCheckById.updateBy = user_id;
    roleCheckById.updateAt = new Date();

    await this.rolesRepository.update(roleCheckById);

    return roleCheckById;
  }
}
