import { Product } from '../entities/product';

export interface IProductRepository {
  create(product: Product): Promise<void>;
  update(product: Product): Promise<Product>;
  findByName(name: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  delete(id: string): Promise<void>;
}
