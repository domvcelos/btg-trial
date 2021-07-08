import { Component, OnInit } from '@angular/core';
import { Contact } from '../create-contact/shared/contact.model';
import { ContactListService } from './shared/contact-list.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { CreateContactService } from '../create-contact/shared/create-contact.serivce';
import { Subscription } from 'rxjs';
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
  constructor(
    private contactListService: ContactListService,
    private createContactService: CreateContactService
  ) {
    this.clickEventsubscription = this.createContactService
      .getReloadEvent()
      .subscribe(() => {
        console.log('load');
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
    console.log(`delete ${contact}`);
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
    this.contactListService
      .getContactList()
      .subscribe((CONTACTLIST) => (this.contactList = CONTACTLIST));
    this.paginatedContactList = this.contactList.slice(0, this.itemsPerPage);
  }
}
