import { CategoryProduct } from '@modules/products/entities/categoryProduct';

export class CategoryProductViewModel {
  static toHTTP(category: CategoryProduct) {
    const props = {
      type: category.type,
      name: category.name,
    };
    const { id } = category;

    return { id, ...{ props } };
  }
}
