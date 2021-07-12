import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { CONTACTLIST } from 'src/app/contact-list/tests/contact-list.mock';
import { ContactService } from 'src/app/create-contact/shared/contact.serivce';
import { DeleteModalComponent } from '../delete-modal.component';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;
  let service: ContactService;
  let modalService: BsModalRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()],
      declarations: [DeleteModalComponent],
      providers: [BsModalRef],
    }).compileComponents();
    service = TestBed.inject(ContactService);
    modalService = TestBed.inject(BsModalRef);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
    component.contact = CONTACTLIST[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call service deleteContact', () => {
    spyOn(service, 'deleteContact');
    component.deleteContact();
    expect(service.deleteContact).toHaveBeenCalled();
  });
  it('should call modal service hide', () => {
    spyOn(modalService, 'hide');
    component.deleteContact();
    expect(modalService.hide).toHaveBeenCalled();
  });
});
