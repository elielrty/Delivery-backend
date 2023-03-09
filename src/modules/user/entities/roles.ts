import { randomUUID } from 'crypto';

import { Replace } from '@shared/helpers/Replace';

export interface IRolesProps {
  id?: string;
  role: string;
  createdAt: Date;
  deleteAt?: Date | null;
  updateAt?: Date | null;
  createBy?: string | null;
  updateBy?: string | null;
  deleteBy?: string | null;
}

export class Roles {
  private readonly _id: string;
  private readonly props: IRolesProps;

  constructor(props: Replace<IRolesProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public set role(role: string) {
    this.props.role = role;
  }

  public get role() {
    return this.props.role;
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
