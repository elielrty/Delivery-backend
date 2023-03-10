export interface ICreateProductDTO {
  name: string;
  description: string;
  value: string;
  isDiscount: boolean;
  category_id: string;
  user_id: string;
}
