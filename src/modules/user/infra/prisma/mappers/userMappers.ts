import { User } from '@modules/user/entities/user';
import { User as RawUser, Role as RawRole } from '@prisma/client';

import { RolesMappers } from './rolesMappers';

export type UserWithRoles = RawUser & { UserRole: RawRole[] };

export class UserMappers {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      phone: user.phone,
      roles: user.roles,
      deleteAt: user.deleteAt,
      updateBy: user.updateBy,
      updateAt: user.updateAt,
      deleteBy: user.deleteBy,
    };
  }

  static toDomain(raw: UserWithRoles): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        isAdmin: raw.isAdmin,
        phone: raw.phone,
        roles: raw.UserRole ? RolesMappers.toDomainArray(raw.UserRole) : [],
      },
      raw.id,
    );
  }

  static toDomainArray(raws: UserWithRoles[]): User[] {
    const roles = raws.map(user => {
      return new User(
        {
          name: user.name,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
          phone: user.phone,
          roles: user.UserRole ? RolesMappers.toDomainArray(user.UserRole) : [],
        },
        user.id,
      );
    });
    return roles;
  }
}
