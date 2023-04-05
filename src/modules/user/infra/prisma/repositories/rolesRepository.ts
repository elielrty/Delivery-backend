import { IRolesRepository } from '@modules/user/repositories/IRolesRepository';

import { prismaClient } from '@shared/infra/dataBase/prisma/prismaClient';

import { Roles } from '../../../entities/roles';
import { RolesMappers } from '../mappers/rolesMappers';

export class RolesRepository implements IRolesRepository {
  public async create(Roles: Roles): Promise<void> {
    const raw = RolesMappers.toPrisma(Roles);
    await prismaClient.role.create({ data: raw });
  }

  // public async findByAll(): Promise<Roles[]> {
  //   const Roles = await prismaClient.role.findMany();

  // }

  public async update(Roles: Roles): Promise<Roles> {
    const raw = RolesMappers.toPrisma(Roles);
    const RolesUpdate = await prismaClient.role.update({
      where: { id: Roles.id },
      data: raw,
    });

    return RolesMappers.toDomain(RolesUpdate);
  }

  public async findByRole(role: string): Promise<Roles | null> {
    const Roles = await prismaClient.role.findFirst({ where: { role } });

    if (!Roles) {
      return null;
    }

    return RolesMappers.toDomain(Roles);
  }

  public async findById(id: string): Promise<Roles | null> {
    const Roles = await prismaClient.role.findUnique({ where: { id } });

    if (!Roles) {
      return null;
    }

    return RolesMappers.toDomain(Roles);
  }

  public async delete(id: string): Promise<void> {
    await prismaClient.role.delete({ where: { id } });
  }
}
