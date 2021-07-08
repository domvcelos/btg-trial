import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Contact } from '../create-contact/shared/contact.model';
import { ContactService } from '../create-contact/shared/contact.serivce';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  closeBtnName: string;
  contact: Contact;
  constructor(public bsModalRef: BsModalRef, private service: ContactService) {}

  ngOnInit(): void {}

  deleteContact(): void {
    this.service.deleteContact(this.contact.id);
    this.bsModalRef.hide();
  }
}
