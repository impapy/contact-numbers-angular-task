import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { ContactClientService } from 'src/app/@api/contact-client.service';
import {
  ModalOptions,
  ModalService,
} from 'src/app/@core/services/modal.service';
import { SocketIoService } from 'src/app/@core/services/socket-io.service';
import { IContact } from 'src/app/@models/contacts/Contact';
import { ContactAddEditInput } from 'src/app/@models/contacts/ContactAddInput';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  @Output() onSubmit: EventEmitter<{ isUpdateMode: boolean; item: IContact }> =
    new EventEmitter();

  contactId: string | undefined;
  showModal: boolean = false;
  form!: FormGroup;
  ponePattern = '^01[0125]{1}[0-9]{8}$';
  subs: Subscription[] = [];

  constructor(
    private contactClientService: ContactClientService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private toastr: ToastrService,
    private socketIoService: SocketIoService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.subs.push(
      this.modalService.toggleModalSubject.subscribe((options) => {
        this.showModal = options.showModal;
        if (options.contactId) {
          this.contactId = options.contactId;
          this.getContact(options.contactId);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  private unSubscribe() {
    if (this.subs.length > 0) {
      this.subs.forEach((sub) => sub.unsubscribe());
    }
  }

  getContact(id: string) {
    this.subs.push(
      this.contactClientService.getById(id).subscribe((contact) => {
        this.form.patchValue({
          name: contact?.name,
          phone: contact?.phone,
          address: contact?.address,
          notes: contact?.notes,
        });
      })
    );
  }

  submit() {
    const value = this.form.value;
    if (!value && this.form.invalid) {
      return;
    }
    let action$!: Observable<any>;

    if (!this.contactId) {
      action$ = this.contactClientService.addContact(
        new ContactAddEditInput({
          ...value,
        })
      );
      this.socketIoService.emitToServer('update');
    } else {
      action$ = this.contactClientService.editContact(
        this.contactId,
        new ContactAddEditInput({
          ...value,
        })
      );
      this.socketIoService.emitToServer('update');
    }

    this.subs.push(
      action$.subscribe(
        (contact) => {
          if (contact)
            this.onSubmit.next({
              isUpdateMode: this.contactId ? true : false,
              item: contact,
            });
          this.toastr.success('Changes have been saved successfully');
        },
        (err) => {
          this.toastr.error(err);
        }
      )
    );
    this.closeModal();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(this.ponePattern)]],
      address: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }

  closeModal() {
    this.contactId = undefined;
    this.form.reset({});
    this.modalService.toggleModalSubject.next(new ModalOptions(false));
  }
}
