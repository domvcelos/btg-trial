import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Contact } from './contact.model';
import { v4 as uuidv4 } from 'uuid';
import { UFLIST } from '../tests/create-contact.mock';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  _subject = new Subject<any>();
  sendReloadEvent(): void {
    this._subject.next();
  }
  getReloadEvent(): Observable<any> {
    return this._subject.asObservable();
  }
  createContact(contact: Contact): void {
    contact.id = uuidv4();
    const storedContacts: Contact[] = localStorage.contacts
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
    const contacts: Contact[] = localStorage.contacts
      ? JSON.parse(localStorage.contacts)
      : [];
    return of(contacts);
  }

  deleteContact(contactId: string): void {
    const contacts: Contact[] = localStorage.contacts
      ? JSON.parse(localStorage.contacts)
      : [];
    const newListcontacts: Contact[] = contacts.filter(
      (contact) => contact.id !== contactId
    );
    localStorage.contacts = JSON.stringify(newListcontacts);
    this.sendReloadEvent();
  }
  editContact(contact: Contact): void {
    const contacts: Contact[] = localStorage.contacts
      ? JSON.parse(localStorage.contacts)
      : [];
    const newListcontacts: Contact[] = contacts.filter(
      (contactStored) => contactStored.id !== contact.id
    );
    newListcontacts.push(contact);
    localStorage.contacts = JSON.stringify(newListcontacts);
    this.sendReloadEvent();
  }
}
