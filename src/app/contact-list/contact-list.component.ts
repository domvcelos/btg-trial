import { Component, OnInit } from '@angular/core';
import { Contact } from '../create-contact/shared/contact.model';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ContactService } from '../create-contact/shared/contact.serivce';
import { Subscription } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contactName: string;
  contactList: Contact[];
  filtredContactList: Contact[];
  paginatedContactList: Contact[];
  itemsPerPage = 6;
  searchInput: string;
  clickEventsubscription: Subscription;
  modalRef: BsModalRef;
  constructor(
    private service: ContactService,
    private modalService: BsModalService
  ) {
    this.clickEventsubscription = this.service
      .getReloadEvent()
      .subscribe(() => {
        this.getContacts();
      });
  }

  ngOnInit(): void {
    this.getContacts();
  }
  editModal(contact: Contact) {
    console.log(`edit ${contact}`);
  }

  deleteModal(contact: Contact) {
    const initialState = {
      contact: contact
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, {initialState});
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedContactList = this.contactList.slice(startItem, endItem);
  }

  onKey(event) {
    this.filtredContactList = this.contactList.filter(function (contact) {
      return contact.nome.toUpperCase().match(event.toUpperCase());
    });
  }
  getContacts() {
    this.service
      .getContactList()
      .subscribe((CONTACTLIST) => (this.contactList = CONTACTLIST));
    this.paginatedContactList = this.contactList.slice(0, this.itemsPerPage);
  }
}
