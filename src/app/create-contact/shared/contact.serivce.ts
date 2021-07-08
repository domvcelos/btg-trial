import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Contact } from './contact.model';
import { UFLIST } from './create-contact.mock';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private subject = new Subject<any>();
  sendReloadEvent() {
    this.subject.next();
  }
  getReloadEvent(): Observable<any> {
    return this.subject.asObservable();
  }
  createContact(contact: Contact) {
    contact.id = uuidv4();
    let storedContacts: Contact[] = localStorage.contacts
      ? JSON.parse(localStorage.contacts)
      : [];
    storedContacts.push(contact);
    localStorage.contacts = JSON.stringify(storedContacts);
    this.sendReloadEvent();
  }
  getUfList(): Observable<string[]> {
    return of(UFLIST);
  }
  getContactList(): Observable<Contact[]> {
    let contacts: Contact[] = localStorage.contacts ? JSON.parse(localStorage.contacts): [];
    return of(contacts);
  }

  deleteContact(contactId: string): void {
    const contacts: Contact[] = localStorage.contacts ? JSON.parse(localStorage.contacts): [];
    const newListcontacts: Contact[] = contacts.filter(contact => contact.id !== contactId);
    localStorage.contacts = JSON.stringify(newListcontacts);
    this.sendReloadEvent();
  }
}
