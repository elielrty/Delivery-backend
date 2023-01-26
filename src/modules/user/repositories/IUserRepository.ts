import { User } from '../entities/user';

export interface IUserRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  delete(id: string): Promise<void>;
}
