import { randomUUID } from 'crypto';

import { Replace } from '@shared/helpers/Replace';

export interface IProductProps {
  id?: string;
  name: string;
  description: string;
  value: string;
  isDiscount: boolean;
  category_id: string;
  createdAt: Date;
  deleteAt?: Date | null;
  updateAt?: Date | null;
  createBy?: string;
  updateBy?: string;
  deleteBy?: string | null;
}

export class Product {
  private readonly _id: string;
  private readonly props: IProductProps;

  constructor(
    props: Replace<IProductProps, { createdAt?: Date }>,
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

  public set value(value: string) {
    this.props.value = value;
  }

  public get value() {
    return this.props.value;
  }

  public set isDiscount(isDiscount: boolean) {
    this.props.isDiscount = isDiscount;
  }

  public get isDiscount() {
    return this.props.isDiscount;
  }

  public set category_id(category_id: string) {
    this.props.category_id = category_id;
  }

  public get category_id() {
    return this.props.category_id;
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
