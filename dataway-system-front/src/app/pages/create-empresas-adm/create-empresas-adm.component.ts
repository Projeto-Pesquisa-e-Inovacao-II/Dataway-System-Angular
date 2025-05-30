import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { AdmPagesService } from '../../services/adm-pages/adm-pages.service';

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
  empresas: Empresa[] = [];

  constructor(private admPagesService: AdmPagesService) {}

  ngOnInit() {
    this.getEmpresas();
  }

  getEmpresas() {
    this.admPagesService.getEmpresas().subscribe((dados: any) => {
      console.log('Empresas:', this.empresas);
      console.log('Dados recebidos:', dados);
      this.empresas = dados.map((empresa: any) => ({
        nome: empresa.nomeFantasia,
        email: empresa.representanteLegal,
        telefone: empresa.codigoEmpresa,
        status: empresa.CNPJ,
      }));
    });
    console.log('Empresas:', this.empresas);
  }

  getEmpresaSearchResults(event: Event) {
    const searchTerm: string = (event.target as HTMLInputElement)?.value || '';
    console.log('Search Term:', searchTerm);
    if (!searchTerm) {
      this.getEmpresas(); // If search term is empty, fetch all empresas
      return;
    }
    this.admPagesService
      .getEmpresaSearchResults(searchTerm)
      .subscribe((dados: any) => {
        console.log('Search Results:', dados);
        this.empresas = dados.map((empresa: any) => ({
          nome: empresa.nomeFantasia,
          email: empresa.representanteLegal,
          telefone: empresa.codigoEmpresa,
          status: empresa.CNPJ,
        }));
      });
  }
}
