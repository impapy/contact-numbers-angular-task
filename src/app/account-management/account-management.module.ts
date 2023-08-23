import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountClientService } from '../@api/account-client.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent,
          },
        ],
      },
    ]),
  ],
  declarations: [LayoutComponent, LoginComponent],
  providers: [AccountClientService],
})
export class AccountManagementModule {}
