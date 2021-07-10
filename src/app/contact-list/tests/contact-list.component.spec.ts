import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxBootstrapIconsModule, pencilSquare, trash
} from 'ngx-bootstrap-icons';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxMaskModule } from 'ngx-mask';
import { of } from 'rxjs';
import { ContactService } from 'src/app/create-contact/shared/contact.serivce';
import { ContactListComponent } from '../contact-list.component';
import { CONTACTLIST } from './contact-list.mock';

const icons = {
  trash,
  pencilSquare,
};

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let service: ContactService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ModalModule.forRoot(),
        NgxMaskModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        PaginationModule,
        AccordionModule.forRoot(),
        NgxBootstrapIconsModule.pick(icons),
        BrowserAnimationsModule,
      ],
      declarations: [ContactListComponent],
      providers: [ContactService],
    }).compileComponents();
    service = TestBed.inject(ContactService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getContacts()', () => {
    spyOn(component, 'getContacts');
    component.ngOnInit();
    expect(component.getContacts).toHaveBeenCalled();
  });
  it('should return an Observable<Contact[]>', () => {
    spyOn(service, 'getContactList').and.returnValue(of(CONTACTLIST));
    service.getContactList().subscribe((res) => expect(res).toBe(CONTACTLIST));
  });
  it('should have first accordion element', () => {
    const accordion = fixture.debugElement.queryAll(
      By.css('#accordion.accordion-full')
    );
    expect(accordion).toBeTruthy();
  });
  it('should have second accordion element', () => {
    const accordion = fixture.debugElement.queryAll(
      By.css('accordion#accordion-search')
    );
    expect(accordion).toBeTruthy();
  });
  it('should have render contacts element', () => {
    spyOn(service, 'getContactList').and.returnValue(of(CONTACTLIST));
    component.getContacts();
    const accordionGroupList = fixture.debugElement.queryAll(
      By.css('accordion#accordion-full accordion-group')
    );
    expect(accordionGroupList.length).toEqual(6);
  });
});
