import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactsComponent } from './contacts.component';
import { RouterModule } from '@angular/router';
import { ContactClientService } from 'src/app/@api/contact-client.service';
import { PaginatorComponent } from 'src/app/@shared/components/paginator/paginator.component';

@NgModule({
  declarations: [ContactFormComponent, ContactsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactsComponent,
      },
    ]),
    PaginatorComponent,
  ],
  providers: [ContactClientService],
})
export class ContactsModule {}
