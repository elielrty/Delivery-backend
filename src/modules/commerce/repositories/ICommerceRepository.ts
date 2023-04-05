import { Commerce } from '../entities/commerce';

export interface ICommerceRepository {
  create(category: Commerce): Promise<void>;
  update(category: Commerce): Promise<Commerce>;
  findByName(name: string): Promise<Commerce | null>;
  findById(id: string): Promise<Commerce | null>;
  delete(id: string): Promise<void>;
}
