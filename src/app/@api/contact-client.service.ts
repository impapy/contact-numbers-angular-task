import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { IContactGetResponse } from '../@models/contacts/ContactGetResponse';
import { ContactsGetInput } from '../@models/contacts/ContactsGetInput';
import { IApiResponse } from '../@models/IApiResponse';
import { IContactAddEditInput } from '../@models/contacts/ContactAddInput';
import { IContact } from '../@models/contacts/Contact';

const CONTACTS_BASE_PATH = '/contacts';
@Injectable()
export class ContactClientService {
  constructor(private http: ApiService) {}

  getById(id: string): Observable<IContact | undefined> {
    const _url = `${CONTACTS_BASE_PATH}/${id}`;

    return this.http
      .get<IApiResponse<IContact>>(_url)
      .pipe(map((result: IApiResponse<IContact>) => result.data));
  }

  getPage(
    contactsGetInput: ContactsGetInput
  ): Observable<IContactGetResponse | undefined> {
    const _url = `${CONTACTS_BASE_PATH}/all`;

    return this.http
      .post<IApiResponse<IContactGetResponse>>(_url, contactsGetInput)
      .pipe(map((result: IApiResponse<IContactGetResponse>) => result.data));
  }

  addContact(body: IContactAddEditInput): Observable<IContact | undefined> {
    const _url = CONTACTS_BASE_PATH;

    return this.http
      .post<IApiResponse<IContact>>(_url, body)
      .pipe(map((result: IApiResponse<IContact>) => result.data));
  }

  editContact(
    id: string,
    body: IContactAddEditInput
  ): Observable<IContact | undefined> {
    const _url = `${CONTACTS_BASE_PATH}/${id}`;

    return this.http
      .patch<IApiResponse<IContact>>(_url, body)
      .pipe(map((result: IApiResponse<IContact>) => result.data));
  }

  deleteContact(id: string): Observable<any> {
    const _url = `${CONTACTS_BASE_PATH}/${id}`;

    return this.http
      .delete<IApiResponse<IContact>>(_url)
      .pipe(map((result: IApiResponse<IContact>) => result.data));
  }
}
