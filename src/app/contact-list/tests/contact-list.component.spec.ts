import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxBootstrapIconsModule,
  pencilSquare,
  trash,
} from 'ngx-bootstrap-icons';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxMaskModule } from 'ngx-mask';
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
  let modalService: BsModalService;

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
    modalService = TestBed.inject(BsModalService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getContacts() when trigger getReloadEvent', () => {
    spyOn(component, 'getContacts');
    service._subject.next();
    expect(component.getContacts).toHaveBeenCalled();
  });
  it('should be open editModal', () => {
    spyOn(modalService, 'show');
    component.editModal(CONTACTLIST[0]);
    expect(modalService.show).toHaveBeenCalled();
  });
  it('should be open deleteModal', () => {
    spyOn(modalService, 'show');
    component.deleteModal(CONTACTLIST[0]);
    expect(modalService.show).toHaveBeenCalled();
  });
  it('should be change page', () => {
    component.contactList = CONTACTLIST;
    const pageEvent = {
      itemsPerPage: component.itemsPerPage,
      page: 2,
    };
    component.pageChanged(pageEvent);
    expect(component.paginatedContactList[0]).toEqual(component.contactList[6]);
  });
  it('should call getContacts()', () => {
    spyOn(component, 'getContacts');
    component.ngOnInit();
    expect(component.getContacts).toHaveBeenCalled();
  });
  it('should have first accordion element', () => {
    const accordion = fixture.debugElement.queryAll(
      By.css('#accordion.accordion-all')
    );
    expect(accordion).toBeTruthy();
  });
  it('should have second accordion element', () => {
    const accordion = fixture.debugElement.queryAll(
      By.css('accordion#accordion-search')
    );
    expect(accordion).toBeTruthy();
  });
  it('should have render all contacts element', () => {
    component.paginatedContactList = CONTACTLIST.slice(
      0,
      component.itemsPerPage
    );
    fixture.detectChanges();
    const accordionGroupList = fixture.debugElement.queryAll(
      By.css('accordion#accordion-all accordion-group')
    );
    expect(accordionGroupList.length).toEqual(
      component.paginatedContactList.length
    );
  });
  it('should have render filtered contacts element', () => {
    component.contactList = CONTACTLIST;
    component.contactName = component.contactList[3].nome;
    component.onKey(component.contactName);
    fixture.detectChanges();
    const accordionGroupList = fixture.debugElement.queryAll(
      By.css('accordion#accordion-search accordion-group')
    );
    expect(accordionGroupList.length).toEqual(1);
    expect(
      accordionGroupList[0].nativeElement.textContent.trim().split('\n')[0]
    ).toEqual(component.contactName);
  });
  it('should call edit modal', fakeAsync(() => {
    component.paginatedContactList = CONTACTLIST.slice(
      0,
      component.itemsPerPage
    );
    fixture.detectChanges();
    spyOn(component, 'editModal');
    const btnId = `#edit-btn-${component.paginatedContactList[0].id}`;
    const button = fixture.debugElement.nativeElement.querySelector(btnId);
    button.click();
    tick();
    expect(component.editModal).toHaveBeenCalled();
  }));
  it('should call delete modal', fakeAsync(() => {
    component.paginatedContactList = CONTACTLIST.slice(
      0,
      component.itemsPerPage
    );
    fixture.detectChanges();
    spyOn(component, 'deleteModal');
    const btnId = `#delete-btn-${component.paginatedContactList[0].id}`;
    const button = fixture.debugElement.nativeElement.querySelector(btnId);
    button.click();
    tick();
    expect(component.deleteModal).toHaveBeenCalled();
  }));
});
