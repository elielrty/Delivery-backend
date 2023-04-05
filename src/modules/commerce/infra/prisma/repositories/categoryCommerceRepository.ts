import { ICategoryCommerceRepository } from '@modules/commerce/repositories/ICategoryCommerceRepository';

import { prismaClient } from '@shared/infra/dataBase/prisma/prismaClient';

import { CategoryCommerce } from '../../../entities/categoryCommerce';
import { CategoryCommerceMappers } from '../mappers/categoryCommerceMappers';

export class CategoryCommerceRepository implements ICategoryCommerceRepository {
  public async create(category: CategoryCommerce): Promise<void> {
    const raw = CategoryCommerceMappers.toPrisma(category);
    await prismaClient.categoryCommerce.create({ data: raw });
  }

  public async update(category: CategoryCommerce): Promise<CategoryCommerce> {
    const raw = CategoryCommerceMappers.toPrisma(category);
    const update = await prismaClient.categoryCommerce.update({
      where: { id: category.id },
      data: raw,
    });

    return CategoryCommerceMappers.toDomain(update);
  }

  public async findById(id: string): Promise<CategoryCommerce | null> {
    const category = await prismaClient.categoryCommerce.findUnique({
      where: { id },
    });

    if (!category) {
      return null;
    }

    return CategoryCommerceMappers.toDomain(category);
  }

  public async delete(id: string): Promise<void> {
    await prismaClient.categoryCommerce.delete({ where: { id } });
  }

  public async findByName(name: string): Promise<CategoryCommerce | null> {
    const category = await prismaClient.categoryCommerce.findFirst({
      where: { name },
    });

    if (!category) {
      return null;
    }

    return CategoryCommerceMappers.toDomain(category);
  }
}
