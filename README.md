# BTG Trial
## Trial
Detalhes sobre o projeto
Crie um CRUD, com o fluxo natural features de um cadastro de clientes, com recursos como:
* Cadastro de clientes;
* Atualização do cadastro do cliente;
* Listagem dos clientes;
* Exclusão dos clientes;

Detalhes da Implementação projeto

* O formulário deverá ter validação antes de submeter a api;
* Todos os campos são obrigatórios;
* CEP e CPF deverá conter máscaras;
* Deverá seguir o style guid do Bootstrap;
* Alteração e Exclusão deverá ter um modal de confirmação;
* Deverá conter um select para selecionar a UF;

Contrato de Dados
```json
{
    id: string;
    nome: string;
    cpf: string;
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
}
```
Não será necessário utilizar nenhuma linguagem de Backend, nem persistir os dados em um banco, tudo será salvo no LocalStorage do navegador.

Pré-requisitos
* Node.js (v8.11.3)
* Angular 9 (v9.0.2)
* Bootstrap ( v4.1.2)
* JSON Server (v0.14.0)

## Pre requisites
1. NodeJs
    * [Install node js](https://nodejs.org/en/download/)
2. Angular
    * run npm i @angular/cli
## Run the project

1. npm install
2. ng serve

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.