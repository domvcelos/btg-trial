import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { UpdateModalComponent } from './update-modal/update-modal.component';
import {
  NgxBootstrapIconsModule,
  trash,
  pencilSquare,
} from 'ngx-bootstrap-icons';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const icons = {
    trash,
    pencilSquare,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TypeaheadModule.forRoot(),
        NgBootstrapFormValidationModule.forRoot(),
        NgBootstrapFormValidationModule,
        NgxMaskModule.forRoot(),
        AccordionModule.forRoot(),
        NgxBootstrapIconsModule.pick(icons),
        HttpClientModule,
        PaginationModule,
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
      ],
      declarations: [
        AppComponent,
        CreateContactComponent,
        ContactListComponent,
        DeleteModalComponent,
        UpdateModalComponent,
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have app-create-contact tag', () => {
    expect(
      fixture.nativeElement.querySelector('app-create-contact')
    ).toBeTruthy();
  });
  it('should have app-contact-list tag', () => {
    expect(
      fixture.nativeElement.querySelector('app-contact-list')
    ).toBeTruthy();
  });
});
