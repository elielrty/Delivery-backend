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

export { prismaClient };
