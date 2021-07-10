import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CreateContactComponent } from '../create-contact.component';
import { ContactService } from '../shared/contact.serivce';
import { UFLIST } from './create-contact.mock';

describe('CreateContactComponent', () => {
  let component: CreateContactComponent;
  let fixture: ComponentFixture<CreateContactComponent>;
  let service: ContactService;

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
  it('should call onSubmit when click in submit button', () => {
    spyOn(component, 'onSubmit');
    const button = fixture.debugElement.query(By.css('#btn-submit'));
    button.triggerEventHandler('click', null);
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
    });
  });
  it('should instance ContactService', () => {
    expect(service).toBeTruthy();
  });
  it('should return an Observable<string[]>', () => {
    expect(service).toBeTruthy();
    service.getUfList().subscribe((res) => expect(res).toBe(UFLIST));
  });
  it('should call createContact when call onSubmit', () => {
    spyOn(service, 'createContact');
    component.onSubmit();
    expect(service.createContact).toHaveBeenCalled();
  });
  it('should call onReset when call onSubmit', () => {
    spyOn(component, 'onReset');
    component.onSubmit();
    expect(component.onReset).toHaveBeenCalled();
  });
  it('should call contactFormGroup.reset when call onReset', () => {
    spyOn(component.contactFormGroup, 'reset');
    component.onReset();
    expect(component.contactFormGroup.reset).toHaveBeenCalled();
  });
});
