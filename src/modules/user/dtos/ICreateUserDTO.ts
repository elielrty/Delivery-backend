export interface ICreateUserDTO {
  email: string;
  password: string;
  isAdmin: boolean;
  name: string;
  phone: string | null;
  roles: string[];
}
