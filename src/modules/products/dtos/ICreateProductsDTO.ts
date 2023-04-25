import { Decimal } from '@prisma/client/runtime';

export interface ICreateProductDTO {
  name: string;
  description: string;
  value: Decimal;
  isDiscount: boolean;
  category_id: string;
  user_id: string;
}
