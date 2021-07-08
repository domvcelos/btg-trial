import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Contact } from 'src/app/create-contact/shared/contact.model';
import { environment } from 'src/environments/environment';


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

  getContactList(): Observable<Contact[]> {
    let contacts: Contact[] = localStorage.contacts ? JSON.parse(localStorage.contacts): [];
    return of(contacts);
  }

  deleteContact(contactId: string): Observable<any> {
    return this.httpClient
      .delete<any>(`${this.apiUrl}/contact/${contactId}`)
      .pipe(take(1));
  }
}
