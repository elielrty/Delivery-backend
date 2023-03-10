import { Roles } from '../entities/roles';

export interface IRolesRepository {
  create(Roles: Roles): Promise<void>;
  update(Roles: Roles): Promise<Roles>;
  findById(id: string): Promise<Roles | null>;
  delete(id: string): Promise<void>;
}
