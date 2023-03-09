import { Roles } from '@modules/user/entities/roles';
import { Roles as RawRoles } from '@prisma/client';

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
      },
      raw.id,
    );
  }
}
