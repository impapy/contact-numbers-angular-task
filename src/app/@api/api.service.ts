import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _baseUrl: string | undefined = environment.ApiUrl;

  constructor(
    private http: HttpClient // @Optional() @Inject('API_BASE_URL') baseUrl?: string
  ) {
    //his._baseUrl = baseUrl;
  }

  private buildUrl(resourceUrl: string): string {
    return `${this._baseUrl}${resourceUrl}`.replace(/[?&]$/, '');
  }

  private createDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
    });
  }

  private createJsonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error occurred:', error.error.message);
    } else {
      this.logServerErrorDetails(error);
    }
    return throwError(error);
  }

  private logServerErrorDetails(error: HttpErrorResponse): void {
    const { status, message, error: errors } = error;
    if (status === 422) {
      const joinedErrors = errors.Errors.join(', ');
      console.error(`status-code: ${status}, errors: ${joinedErrors}`);
    } else {
      console.error(`status-code: ${status}, message: ${message}`);
    }
  }

  private makeRequest<T>(
    method: string,
    resourceUrl: string,
    body?: any,
    options: HttpHeaders = this.createDefaultHeaders()
  ): Observable<T> {
    const url = this.buildUrl(resourceUrl);
    const requestOptions = { headers: options };

    return this.http
      .request<T>(method, url, { body, ...requestOptions })
      .pipe(catchError((error) => this.handleError(error)));
  }

  get<T>(
    resourceUrl: string,
    options: HttpHeaders = this.createDefaultHeaders()
  ): Observable<T> {
    return this.makeRequest<T>('GET', resourceUrl, undefined, options);
  }

  post<T>(
    resourceUrl: string,
    body: any,
    options: HttpHeaders = this.createJsonHeaders()
  ): Observable<T> {
    return this.makeRequest<T>(
      'POST',
      resourceUrl,
      JSON.stringify(body),
      options
    );
  }

  put<T>(
    resourceUrl: string,
    body: any,
    options: HttpHeaders = this.createJsonHeaders()
  ): Observable<T> {
    return this.makeRequest<T>(
      'PUT',
      resourceUrl,
      JSON.stringify(body),
      options
    );
  }

  patch<T>(
    resourceUrl: string,
    body: any,
    options: HttpHeaders = this.createJsonHeaders()
  ): Observable<T> {
    return this.makeRequest<T>(
      'PATCH',
      resourceUrl,
      JSON.stringify(body),
      options
    );
  }

  delete<T>(
    resourceUrl: string,
    options: HttpHeaders = this.createDefaultHeaders()
  ): Observable<T> {
    return this.makeRequest<T>('DELETE', resourceUrl, undefined, options);
  }
}
