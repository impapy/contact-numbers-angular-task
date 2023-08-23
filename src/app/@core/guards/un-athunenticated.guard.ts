import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountManagerService } from '../services/account-manager.service';

@Injectable({
  providedIn: 'root',
})
export class UnAuthenticatedGuard implements CanActivate {
  constructor(
    private authService: AccountManagerService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated;

    if (!isAuthenticated) {
      return true; 
    } else {
      return this.router.createUrlTree(['/']); 
    }
  }
}
