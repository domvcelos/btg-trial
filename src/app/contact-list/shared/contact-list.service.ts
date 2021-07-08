import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { of } from 'rxjs';
import { Contact } from 'src/app/create-contact/shared/contact.model';
import { environment } from 'src/environments/environment';
import { CONTACTLIST } from './contact-list.mock';

@Injectable({
  providedIn: 'root',
})
export class ContactListService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.API_URL;
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.httpClient
      .post<Contact>(`${this.apiUrl}/contact`, contact)
      .pipe(take(1));
  }

  putContact(contact: Contact): Observable<Contact> {
    return this.httpClient
      .put<any>(`${this.apiUrl}/contact/${contact.id}`, contact)
      .pipe(take(1));
  }

  //   getContactList(): Observable<Contact[]> {
  //     return this.httpClient.get<any>(`${this.apiUrl}/contact`).pipe(take(1));
  //   }

  getContactList(): Observable<Contact[]> {
    return of(CONTACTLIST);
  }

  deleteContact(contactId: string): Observable<any> {
    return this.httpClient
      .delete<any>(`${this.apiUrl}/contact/${contactId}`)
      .pipe(take(1));
  }
}
