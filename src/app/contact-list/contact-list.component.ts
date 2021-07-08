import { Component, OnInit } from '@angular/core';
import { Contact } from '../create-contact/shared/contact.model';
import { ContactListService } from './shared/contact-list.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contactList: Contact[];
  constructor(private service: ContactListService) {}

  ngOnInit(): void {
    this.service
      .getContactList()
      .subscribe((CONTACTLIST) => (this.contactList = CONTACTLIST));
    console.log(this.contactList)
  }
  editModal(contact: Contact) {
    console.log(`edit ${contact}`);
  }
  deleteModal(contact: Contact) {
    console.log(`delete ${contact}`);
  }
}
