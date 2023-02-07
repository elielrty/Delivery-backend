import { randomUUID } from 'crypto';

import { Replace } from '@shared/helpers/Replace';

export interface ICategoryCommerceProps {
  id?: string;
  name: string;
  description: string;
  createdAt: Date;
  deleteAt?: Date | null;
  updateAt?: Date | null;
  createBy?: string;
  updateBy?: string;
  deleteBy?: string | null;
}

export class CategoryCommerce {
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

  public set description(description: string) {
    this.props.description = description;
  }

  public get description() {
    return this.props.description;
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
