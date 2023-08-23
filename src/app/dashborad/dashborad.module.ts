import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { ContactClientService } from '../@api/contact-client.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../@shared/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: '',
            redirectTo: 'contacts',
            pathMatch: 'full',
          },
          {
            path: 'contacts',
            loadChildren: () =>
              import('./contacts/contacts.module').then(
                (m) => m.ContactsModule
              ),
          },
        ],
      },
    ]),
  ],
  declarations: [LayoutComponent],
  providers: [ContactClientService],
})
export class DashboradModule {}
