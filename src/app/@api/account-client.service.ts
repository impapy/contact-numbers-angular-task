import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IUserAddInput } from '../@models/account/UserAddInput';
import { Observable } from 'rxjs';

const ACCOUNT_BASE_PATH = '/users';

@Injectable({
  providedIn: 'root',
})
export class AccountClientService {
  constructor(private http: ApiService) {}

  login(credential: IUserAddInput): Observable<any> {
    const _url = `${ACCOUNT_BASE_PATH}/login`;

    return this.http.post<any>(_url, credential);
  }

  logout(): Observable<any> {
    const _url = `${ACCOUNT_BASE_PATH}/logout`;

    return this.http.post<any>(_url, {});
  }
}
