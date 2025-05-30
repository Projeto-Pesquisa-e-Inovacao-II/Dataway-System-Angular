import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header/header.component";

interface Empresa {
  
  nome: string;
  email: string;
  telefone: string;
  status: string;
}

@Component({
  selector: 'app-create-empresas-adm',
  imports: [CommonModule],
  templateUrl: './create-empresas-adm.component.html',
  styleUrl: './create-empresas-adm.component.scss',
})
export class CreateEmpresasAdmComponent {
  // Add more example empresas
  empresas: Empresa[] = [
    {
      nome: 'Empresa Alpha',
      email: 'contato@alpha.com',
      telefone: '(11) 1234-5678',
      status: 'Ativo',
    },
    {
      nome: 'Empresa Beta',
      email: 'contato@beta.com',
      telefone: '(21) 8765-4321',
      status: 'Inativo',
    },
    {
      nome: 'Empresa Gamma',
      email: 'contato@gamma.com',
      telefone: '(31) 1122-3344',
      status: 'Ativo',
    }
  ];

  ngOnInit() {}
}
