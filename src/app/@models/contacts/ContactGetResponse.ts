import { PageInfo } from '../PageInfo';
import { Contact } from './Contact';

export interface IContactGetResponse {
  pageInfo: PageInfo;
  nodes: Contact[];
}
export class ContactGetResponse implements IContactGetResponse {
  pageInfo!: PageInfo;
  nodes!: Contact[];

  constructor(data?: IContactGetResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
