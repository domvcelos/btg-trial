import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Contact } from '../create-contact/shared/contact.model';
import { ContactService } from '../create-contact/shared/contact.serivce';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {
  contact: Contact;
  ufs: string[];
  contactFormGroup: FormGroup;
  public name: string;
  constructor(public bsModalRef: BsModalRef, private service: ContactService) {}

  ngOnInit(): void {
    this.contactFormGroup = new FormGroup({
      nome: new FormControl(this.contact.nome, [Validators.required]),
      cpf: new FormControl(this.contact.cpf, [Validators.required]),
      cep: new FormControl(this.contact.cep, [Validators.required]),
      logradouro: new FormControl(this.contact.logradouro, [Validators.required]),
      bairro: new FormControl(this.contact.bairro, [Validators.required]),
      localidade: new FormControl(this.contact.localidade, [Validators.required]),
      uf: new FormControl(this.contact.uf, [Validators.required]),
      id: new FormControl(this.contact.id, [Validators.required]),
    });
    this.service.getUfList().subscribe((UFLIST) => (this.ufs = UFLIST));
  }
  onSubmit() {
    this.service.editContact(this.contactFormGroup.value);
    this.bsModalRef.hide();
  }
  onReset() {
    this.contactFormGroup.reset();
  }
}
