import { Component, OnInit } from '@angular/core';
import { Contact } from '../create-contact/shared/contact.model';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ContactService } from '../create-contact/shared/contact.serivce';
import { Subscription } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
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
  eventsubscription: Subscription;
  modalRef: BsModalRef;
  constructor(
    private service: ContactService,
    private modalService: BsModalService
  ) {
    this.eventsubscription = this.service
      .getReloadEvent()
      .subscribe(() => {
        this.getContacts();
      });
  }

  ngOnInit(): void {
    this.getContacts();
  }
  editModal(contact: Contact): void {
    const initialState = {
      contact,
    };
    this.modalRef = this.modalService.show(UpdateModalComponent, {
      initialState,
    });
  }

  deleteModal(contact: Contact): void {
    const initialState = {
      contact,
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      initialState,
    });
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedContactList = this.contactList.slice(startItem, endItem);
  }

  onKey(name: string): void {
    this.filtredContactList = this.contactList.filter((contact) =>
      contact.nome.toUpperCase().match(name.toUpperCase())
    );
  }
  getContacts(): void {
    this.service
      .getContactList()
      .subscribe((CONTACTLIST) => (this.contactList = CONTACTLIST));
    this.paginatedContactList = this.contactList.slice(0, this.itemsPerPage);
  }
}
