import { Roles } from '@modules/user/entities/roles';
import { Role as RawRoles } from '@prisma/client';

export class RolesMappers {
  static toPrisma(Roles: Roles) {
    return {
      id: Roles.id,
      role: Roles.role,
      updateBy: Roles.updateBy,
      updateAt: Roles.updateAt,
      deleteBy: Roles.deleteBy,
    };
  }

  static toDomain(raw: RawRoles): Roles {
    return new Roles(
      {
        role: raw.role,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }

  static toDomainArray(raws: RawRoles[]): Roles[] {
    const roles = raws.map(role => {
      return new Roles(
        {
          role: role.role,
          createdAt: role.createdAt,
        },
        role.id,
      );
    });
    return roles;
  }
}
