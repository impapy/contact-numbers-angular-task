import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountClientService } from 'src/app/@api/account-client.service';
import { IUser } from 'src/app/@models/account/IUser';
import { IUserAddInput } from 'src/app/@models/account/UserAddInput';

@Injectable({
  providedIn: 'root',
})
export class AccountManagerService {
  private returnUrl!: string;
  toastr: any;

  constructor(
    private accountClient: AccountClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get isAuthenticated(): boolean {
    let isLogedInUser = false;

    const token = localStorage.getItem('token');

    if (token) {
      isLogedInUser = true;
    }
    return isLogedInUser;
  }

  private saveUserData(data: { token: string; user: IUser }) {
    localStorage.setItem('token', data.token);
  }

  login(credentials: IUserAddInput) {
    this.accountClient.login(credentials).subscribe(
      ({ data }) => {
        this.saveUserData(data);

        this.router.navigateByUrl(this.returnUrl);
      },
      (err) => {
        console.log(err.error);
        this.toastr.error(`${err.error.message}`)
      }
    );
  }

  logut() {
    localStorage.removeItem('token');
    this.router.navigate(['/account/login']);
  }
}
