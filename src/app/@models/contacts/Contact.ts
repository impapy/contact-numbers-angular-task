export interface IContact {
  _id: string;
  name: string;
  phone: string;
  address: string;
  notes: string;
  islocked: boolean;
  createdAt: Date;
  modifiedAt: Date;
  isDeleted: boolean;
}
export class Contact implements IContact {
  _id!: string;
  name!: string;
  phone!: string;
  address!: string;
  notes!: string;
  islocked!: boolean;
  createdAt!: Date;
  modifiedAt!: Date;
  isDeleted!: boolean;

  constructor(data?: IContact) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
