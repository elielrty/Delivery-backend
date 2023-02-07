import { CategoryCommerce } from '../entities/categoryCommerce';

export interface ICategoryCommerceRepository {
  create(category: CategoryCommerce): Promise<void>;
  update(category: CategoryCommerce): Promise<CategoryCommerce>;
  findByName(name: string): Promise<CategoryCommerce | null>;
  findById(id: string): Promise<CategoryCommerce | null>;
  delete(id: string): Promise<void>;
}
