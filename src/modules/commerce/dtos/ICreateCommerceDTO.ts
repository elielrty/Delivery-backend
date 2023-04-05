export interface ICreateCommerceDTO {
  name: string;
  cnpj: string;
  isOpen?: boolean;
  phone: string;
  category_id: string;
  user_id: string;
  users: string[];
}
