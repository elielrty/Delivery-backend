import { randomUUID } from 'crypto';

import { Replace } from '@shared/helpers/Replace';

export interface IUserTokenProps {
  id?: string;
  refresh_token: string;
  fcm_token: boolean;
  expires_date: Date;
  user_id: string;
  createdAt: Date;
  deleteAt?: Date | null;
  updateAt?: Date | null;
  createBy?: string | null;
  updateBy?: string | null;
  deleteBy?: string | null;
}

export class UserToken {
  private readonly _id: string;
  private readonly props: IUserTokenProps;

  constructor(
    props: Replace<IUserTokenProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public set refresh_token(refresh_token: string) {
    this.props.refresh_token = refresh_token;
  }

  public get refresh_token() {
    return this.props.refresh_token;
  }

  public set fcm_token(fcm_token: boolean) {
    this.props.fcm_token = fcm_token || false;
  }

  public get fcm_token(): boolean {
    return this.props.fcm_token;
  }

  public set expires_date(expires_date: Date) {
    this.props.expires_date = expires_date;
  }

  public get expires_date() {
    return this.props.expires_date;
  }

  public set user_id(user_id: string) {
    this.props.user_id = user_id;
  }

  public get user_id() {
    return this.props.user_id;
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
