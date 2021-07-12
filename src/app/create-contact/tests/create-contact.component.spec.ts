import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CONTACTLIST } from 'src/app/contact-list/tests/contact-list.mock';
import { CreateContactComponent } from '../create-contact.component';
import { ContactService } from '../shared/contact.serivce';
import { UFLIST } from './create-contact.mock';

describe('CreateContactComponent', () => {
  let component: CreateContactComponent;
  let fixture: ComponentFixture<CreateContactComponent>;
  let service: ContactService;
  const testForm = <NgForm> { resetForm: () => null };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [CreateContactComponent],
      providers: [ContactService],
    }).compileComponents();
    service = TestBed.inject(ContactService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a form', () => {
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });
  it('should have "Nome" input', () => {
    const input = fixture.debugElement.queryAll(By.css('#nome'));
    expect(input).toBeTruthy();
  });
  it('should have "cpf" input', () => {
    const input = fixture.debugElement.queryAll(By.css('#cpf'));
    expect(input).toBeTruthy();
  });
  it('should have "cep" input', () => {
    const input = fixture.debugElement.queryAll(By.css('#cep'));
    expect(input).toBeTruthy();
  });
  it('should have "logradouro" input', () => {
    const input = fixture.debugElement.queryAll(By.css('#logradouro'));
    expect(input).toBeTruthy();
  });
  it('should have "bairro" input', () => {
    const input = fixture.debugElement.queryAll(By.css('#bairro'));
    expect(input).toBeTruthy();
  });
  it('should have "localidade" input', () => {
    const input = fixture.debugElement.queryAll(By.css('#localidade'));
    expect(input).toBeTruthy();
  });
  it('should have "uf" input', () => {
    const input = fixture.debugElement.queryAll(By.css('#uf'));
    expect(input).toBeTruthy();
  });
  it('should have submit button', () => {
    const button = fixture.debugElement.queryAll(By.css('#btn-submit'));
    expect(button).toBeTruthy();
  });
  it('should call onSubmit when click in submit button', fakeAsync(() => {
    spyOn(component, 'onSubmit');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.onSubmit).toHaveBeenCalled();
  }));
  it('should instance ContactService', () => {
    expect(service).toBeTruthy();
  });
  it('should return an Observable<string[]>', () => {
    expect(service).toBeTruthy();
    service.getUfList().subscribe((res) => expect(res).toBe(UFLIST));
  });
  it('should call createContact when call onSubmit', () => {
    component.contactFormGroup.patchValue({
      ...CONTACTLIST[0],
    });
    spyOn(service, 'createContact');
    const form = fixture.debugElement.nativeElement.querySelector('form');
    component.onSubmit(testForm);
    expect(service.createContact).toHaveBeenCalled();
  });
  it('should added i on contact', () => {
    const contact = CONTACTLIST[0];
    delete contact.id;
    service.createContact(contact);
    expect(contact.id).toBeDefined();
  });
  it('should delete contact contact', () => {
    const contacts = CONTACTLIST;
    localStorage.contacts = JSON.stringify(contacts);
    service.deleteContact(contacts[0].id);
    const recoverdContacts = localStorage.contacts
      ? JSON.parse(localStorage.contacts)
      : [];
    expect(contacts.length).toBeGreaterThan(recoverdContacts.length);
  });
});
