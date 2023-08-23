import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class ModalOptions {
  showModal: boolean;
  contactId?: string;

  constructor(_showModal: boolean, _contactId?: string) {
    this.showModal = _showModal;
    this.contactId = _contactId;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  toggleModalSubject: BehaviorSubject<ModalOptions> = new BehaviorSubject(
    new ModalOptions(false)
  );
}
