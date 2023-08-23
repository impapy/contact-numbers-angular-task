export interface IUserAddInput {
  username: string;
  password: string;
}
export class UserAddInput implements IUserAddInput {
  username!: string;
  password!: string;

  constructor(data?: IUserAddInput) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
