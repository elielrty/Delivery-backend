import { randomUUID } from 'crypto';

import { Replace } from '@shared/helpers/Replace';

export interface IUserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string | null;
  isAdmin: boolean;
  createdAt: Date;
  deleteAt?: Date | null;
  updateAt?: Date | null;
  createBy?: string | null;
  updateBy?: string | null;
  deleteBy?: string | null;
}

export class User {
  private readonly _id: string;
  private readonly props: IUserProps;

  constructor(props: Replace<IUserProps, { createdAt?: Date }>, id?: string) {
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

  public set email(email: string) {
    this.props.email = email;
  }

  public get email() {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password() {
    return this.props.password;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public get phone() {
    return this.props.phone || '';
  }

  public set isAdmin(isAdmin: boolean) {
    this.props.isAdmin = isAdmin;
  }

  public get isAdmin() {
    return this.props.isAdmin;
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

  public set createBy(createBy: string | null | undefined) {
    this.props.createBy = createBy;
  }

  public get createBy(): string | null | undefined {
    return this.props.createBy;
  }

  public set updateBy(updateBy: string | null | undefined) {
    this.props.updateBy = updateBy;
  }

  public get updateBy(): string | null | undefined {
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
