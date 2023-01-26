import { User } from '@modules/user/entities/user';

export class userViewModel {
  static toHTTP(user: User) {
    const props = {
      email: user.email,
      isAdmin: user.isAdmin,
      name: user.name,
      phone: user.phone,
    };
    const { id } = user;

    return { id, ...{ props } };
  }
}
