import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CUSTOM_ERROR_MESSAGES,
  NgBootstrapFormValidationModule,
} from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from 'src/utils/custom-errors';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {
  NgxBootstrapIconsModule,
  trash,
  pencilSquare,
} from 'ngx-bootstrap-icons';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/pagination';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
const icons = {
  trash,
  pencilSquare,
};
@NgModule({
  declarations: [
    AppComponent,
    CreateContactComponent,
    ContactListComponent,
    DeleteModalComponent,
  ],
  imports: [
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
  ],
  providers: [
    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true,
    },
    PaginationConfig,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
