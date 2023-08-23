export interface IContactsGetInput {
  filter?: ContactFilterInput;
  sort?: ContactsSort;
  page?: number;
  perPage?: number;
}
export class ContactsGetInput implements IContactsGetInput {
  filter?: ContactFilterInput;
  sort?: ContactsSort;
  page?: number;
  perPage?: number;

  constructor(data?: IContactsGetInput) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export interface IContactFilterInput {
  searchTerm?: string;
  name?: string;
  phone?: string;
  address?: string;
  notes?: string;
  islocked?: boolean;
}
export class ContactFilterInput implements IContactFilterInput {
  searchTerm?: string;
  name?: string;
  phone?: string;
  address?: string;
  notes?: string;
  islocked?: boolean;

  constructor(data?: IContactFilterInput) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export enum ContactsSort {
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST',
}
