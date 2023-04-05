import { CategoryCommerce } from '@modules/commerce/entities/categoryCommerce';

export class CategoryCommerceViewModel {
  static toHTTP(category: CategoryCommerce) {
    const props = {
      type: category.type,
      name: category.name,
    };
    const { id } = category;

    return { id, ...{ props } };
  }
}
