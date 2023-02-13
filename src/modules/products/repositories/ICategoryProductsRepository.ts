import { CategoryProduct } from '../entities/categoryProduct';

export interface ICategoryProductRepository {
  create(category: CategoryProduct): Promise<void>;
  update(category: CategoryProduct): Promise<CategoryProduct>;
  findByName(name: string): Promise<CategoryProduct | null>;
  findById(id: string): Promise<CategoryProduct | null>;
  delete(id: string): Promise<void>;
}
