import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CONTACTLIST } from 'src/app/contact-list/tests/contact-list.mock';
import { ContactService } from 'src/app/create-contact/shared/contact.serivce';

import { UpdateModalComponent } from '../update-modal.component';

describe('UpdateModalComponent', () => {
  let component: UpdateModalComponent;
  let fixture: ComponentFixture<UpdateModalComponent>;
  let service: ContactService;
  let modalService: BsModalRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        PopoverModule.forRoot(),
      ],
      declarations: [UpdateModalComponent],
      providers: [BsModalRef],
    }).compileComponents();
    service = TestBed.inject(ContactService);
    modalService = TestBed.inject(BsModalRef);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateModalComponent);
    component = fixture.componentInstance;
    component.contact = CONTACTLIST[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call service editContact', () => {
    spyOn(service, 'editContact');
    component.onSubmit();
    expect(service.editContact).toHaveBeenCalled();

  });
  it('should call modalService hide', () => {
    spyOn(modalService, 'hide');
    component.onSubmit();
    expect(modalService.hide).toHaveBeenCalled();
  });
});
