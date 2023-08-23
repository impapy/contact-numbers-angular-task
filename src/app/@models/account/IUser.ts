export interface IUser {
  _id: string;
  username: string;
  password: string;
  userSigningKey: string;
  createdAt: Date;
  modifiedAt: Date;
  isDeleted: boolean;
}
export class User implements IUser {
  _id!: string;
  username!: string;
  password!: string;
  userSigningKey!: string;
  createdAt!: Date;
  modifiedAt!: Date;
  isDeleted!: boolean;

  constructor(data?: IUser) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
