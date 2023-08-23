import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ContactClientService } from 'src/app/@api/contact-client.service';
import {
  ModalOptions,
  ModalService,
} from 'src/app/@core/services/modal.service';
import { SocketIoService } from 'src/app/@core/services/socket-io.service';
import { PageInfo } from 'src/app/@models/PageInfo';
import { IContact } from 'src/app/@models/contacts/Contact';
import {
  ContactsGetInput,
  ContactsSort,
} from 'src/app/@models/contacts/ContactsGetInput';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  contacts: IContact[] = [];
  pageInfo: PageInfo | undefined;
  showModal = false;
  searchTerm = '';
  oldest: ContactsSort = ContactsSort.OLDEST;
  newst: ContactsSort = ContactsSort.NEWEST;
  sort: ContactsSort = ContactsSort.NEWEST;
  constructor(
    private contactClient: ContactClientService,
    private modalService: ModalService,
    private toastr: ToastrService,
    private socketIoService: SocketIoService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.getContactsPage(
        new ContactsGetInput({
          page: 1,
          perPage: 5,
          sort: ContactsSort.NEWEST,
          filter: { searchTerm: this.searchTerm },
        })
      )
    );

    this.socketIoService.lisonToServer('res').subscribe((data) => {
      this.contacts = data?.nodes ?? [];
      this.pageInfo = data?.pageInfo;
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  onPageChange(page: number) {
    this.subs.push(
      this.getContactsPage(
        new ContactsGetInput({
          page,
          perPage: 5,
          sort: ContactsSort.NEWEST,
          filter: { searchTerm: this.searchTerm },
        })
      )
    );
  }

  private unSubscribe() {
    if (this.subs.length > 0) {
      this.subs.forEach((sub) => sub.unsubscribe());
    }
  }
  search() {
    this.getContactsPage(
      new ContactsGetInput({
        page: 1,
        perPage: 5,
        sort: ContactsSort.NEWEST,
        filter: { searchTerm: this.searchTerm },
      })
    );
  }
  getContactsPage(params: ContactsGetInput): Subscription {
    return this.contactClient.getPage(params).subscribe((data) => {
      this.contacts = data?.nodes ?? [];
      this.pageInfo = data?.pageInfo;
    });
  }

  openModal(contactId?: string) {
    this.modalService.toggleModalSubject.next(
      new ModalOptions(true, contactId)
    );
  }

  updateContacts(data: { isUpdateMode: boolean; item: IContact }) {
    if (!data.isUpdateMode) {
      this.contacts.unshift(data.item);
    } else {
      const itemIndex = this.contacts?.findIndex(
        (_item) => _item._id === data.item._id
      );

      if (itemIndex !== -1) {
        this.contacts[itemIndex] = data.item;
      }
    }
  }

  deleteContact(id: string) {
    this.subs.push(
      this.contactClient.deleteContact(id).subscribe(
        () => {
          this.contacts = this.contacts.filter((item) => item._id != id);
          this.toastr.success('Item has been deleted successfully');
        },
        (err) => {
          this.toastr.success("Item hasn't been deleted");
        }
      )
    );
    this.socketIoService.emitToServer('update');
  }

  onSelect(value: any) {
    this.sort = value.target.options[value.target.options.selectedIndex].text;
    this.getContactsPage(
      new ContactsGetInput({
        page: 1,
        perPage: 5,
        sort: this.sort,
        filter: { searchTerm: this.searchTerm },
      })
    );
  }
}
