import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountManagerService } from '../services/account-manager.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AccountManagerService,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated;

    if (isAuthenticated) {
      return true;
    } else {
      return this.router.createUrlTree(['/account/login'], {
        queryParams: { returnUrl: route.path },
      });
    }
  }
}
