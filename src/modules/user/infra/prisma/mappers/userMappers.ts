import { User } from '@modules/user/entities/user';
import { User as RawUser } from '@prisma/client';

export class UserMappers {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      phone: user.phone,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        isAdmin: raw.isAdmin,
        phone: raw.phone,
      },
      raw.id,
    );
  }
}
