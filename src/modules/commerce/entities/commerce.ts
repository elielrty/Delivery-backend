import { User } from '@modules/user/entities/user';
import { randomUUID } from 'crypto';

import { Replace } from '@shared/helpers/Replace';

import { CategoryCommerce } from './categoryCommerce';

export interface ICategoryCommerceProps {
  id?: string;
  name: string;
  cnpj: string;
  isOpen: boolean;
  phone: string;
  users?: User[];
  category: CategoryCommerce;
  createdAt: Date;
  deleteAt?: Date | null;
  updateAt?: Date | null;
  createBy?: string;
  updateBy?: string;
  deleteBy?: string | null;
}

export class Commerce {
  private readonly _id: string;
  private readonly props: ICategoryCommerceProps;

  constructor(
    props: Replace<ICategoryCommerceProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name() {
    return this.props.name;
  }

  public get users(): User[] | undefined {
    return this.props.users;
  }

  public set users(users: User[] | undefined) {
    this.props.users = users;
  }

  public get category(): CategoryCommerce {
    return this.props.category;
  }

  public set category(category: CategoryCommerce) {
    this.props.category = category;
  }

  public set cnpj(cnpj: string) {
    this.props.cnpj = cnpj;
  }

  public get cnpj() {
    return this.props.cnpj;
  }

  public set isOpen(isOpen: boolean) {
    this.props.isOpen = isOpen;
  }

  public get isOpen() {
    return this.props.isOpen;
  }

  public set phone(phone: string) {
    this.props.cnpj = phone;
  }

  public get phone() {
    return this.props.phone;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get deleteAt(): Date | null | undefined {
    return this.props.deleteAt;
  }

  public set deleteAt(deleteAt: Date | null | undefined) {
    this.props.deleteAt = deleteAt;
  }

  public get updateAt(): Date | null | undefined {
    return this.props.updateAt;
  }

  public set updateAt(updateAt: Date | null | undefined) {
    this.props.updateAt = updateAt;
  }

  public set createBy(createBy: string | undefined) {
    this.props.createBy = createBy;
  }

  public get createBy(): string | undefined {
    return this.props.createBy;
  }

  public set updateBy(updateBy: string | undefined) {
    this.props.updateBy = updateBy;
  }

  public get updateBy(): string | undefined {
    return this.props.updateBy;
  }

  public set deleteBy(deleteBy: string | null | undefined) {
    this.props.deleteBy = deleteBy;
  }

  public get deleteBy(): string | null | undefined {
    return this.props.deleteBy;
  }

  public get id() {
    return this._id;
  }
}
