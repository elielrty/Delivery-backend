import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

prismaClient.$use(async (params, next) => {
  if (params.action === 'delete') {
    // Change action to an update
    params.action = 'update';
    // Set field value
    params.args.data = { deleteAt: new Date() };
  }
  return next(params);
});

prismaClient.$use(async (params, next) => {
  if (params.action === 'findUnique' || params.action === 'findFirst') {
    // Change to findFirst - you cannot filter
    // by anything except ID / unique with findUnique
    params.action = 'findFirst';
    // Add 'deleted' filter
    // ID filter maintained
    params.args.where.deleteAt = null;
  }
  if (params.action === 'findMany') {
    // Find many queries
    if (params.args.where) {
      if (params.args.where.deleteAt === undefined) {
        // Exclude deleted records if they have not been explicitly requested
        params.args.where.deleteAt = null;
      }
    } else {
      params.args.where = { deleteAt: null };
    }
  }

  return next(params);
});

export { prismaClient };
