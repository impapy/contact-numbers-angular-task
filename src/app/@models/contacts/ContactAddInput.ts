export interface IContactAddEditInput {
  name: string;
  phone: string;
  address: string;
  notes: string;
}
export class ContactAddEditInput implements IContactAddEditInput {
  name!: string;
  phone!: string;
  address!: string;
  notes!: string;

  constructor(data?: IContactAddEditInput) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
