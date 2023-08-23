import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnAuthenticatedGuard } from './@core/guards/un-athunenticated.guard';
import { AuthGuard } from './@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'account',
    canActivate: [UnAuthenticatedGuard],
    loadChildren: () =>
      import('./account-management/account-management.module').then(
        (m) => m.AccountManagementModule
      ),
  },
  {
    path: 'dashboard',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./dashborad/dashborad.module').then((m) => m.DashboradModule),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./@shared/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
