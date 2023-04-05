import { ICreateRolesDTO } from '@modules/user/dtos/ICreateRolesDTO';
import { Roles } from '@modules/user/entities/roles';
import { IRolesRepository } from '@modules/user/repositories/IRolesRepository';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/error/AppError';

@injectable()
export class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private readonly rolesRepository: IRolesRepository,
  ) {}

  public async execute({ createBy, role }: ICreateRolesDTO): Promise<Roles> {
    const checkByRole = await this.rolesRepository.findByRole(role);

    if (checkByRole) {
      throw new AppError('Role já cadastrado!');
    }

    const roleNew = new Roles({ role, createBy });

    await this.rolesRepository.create(roleNew);

    return roleNew;
  }
}
