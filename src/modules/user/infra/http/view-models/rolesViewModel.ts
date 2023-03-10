import { Roles } from '@modules/user/entities/roles';

export class rolesViewModel {
  static toHTTP(roles: Roles) {
    const props = {
      name: roles.role,
    };
    const { id } = roles;

    return { id, ...{ props } };
  }
}
