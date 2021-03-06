import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Contact } from './shared/contact.model';
import { ContactService } from './shared/contact.serivce';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss'],
})
export class CreateContactComponent implements OnInit {
  ufs: string[];
  contactFormGroup: FormGroup;
  constructor(private service: ContactService) {}

  ngOnInit(): void {
    this.contactFormGroup = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      logradouro: new FormControl('', [Validators.required]),
      bairro: new FormControl('', [Validators.required]),
      localidade: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
    });
    this.service.getUfList().subscribe((UFLIST) => (this.ufs = UFLIST));
  }
  onSubmit(form: NgForm): void {
    if (this.contactFormGroup.valid) {
      this.service.createContact(this.contactFormGroup.value);
      form.resetForm();
    }
  }
}
