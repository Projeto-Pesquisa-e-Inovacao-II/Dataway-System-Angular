import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { AdmPagesService } from '../../services/adm-pages/adm-pages.service';
import { Empresa } from '../../interfaces/empresa/empresa';
import { Router } from '@angular/router';
import { HeaderAdmComponent } from '../../components/headerAdm/header-adm/header-adm.component';

@Component({
  selector: 'app-create-empresas-adm',
  imports: [CommonModule, HeaderAdmComponent],
  templateUrl: './create-empresas-adm.component.html',
  styleUrl: './create-empresas-adm.component.scss',
})
export class CreateEmpresasAdmComponent {
  // Add more example empresas
  empresas: Empresa[] = [];
  constructor(
    private admPagesService: AdmPagesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEmpresas();
  }

  getEmpresas() {
    this.admPagesService.getEmpresas().subscribe((dados: any) => {
      console.log('Empresas:', this.empresas);
      console.log('Dados recebidos:', dados);
      this.empresas = dados.map((empresa: any) => ({
        idEmpresa: empresa.idEmpresa,
        nomeFantasia: empresa.nomeFantasia,
        representanteLegal: empresa.representanteLegal,
        CNPJ: empresa.CNPJ,
        codigoEmpresa: empresa.codigoEmpresa,
        ativo: empresa.ativo,
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
          idEmpresa: empresa.idEmpresa,
          nomeFantasia: empresa.nomeFantasia,
          representanteLegal: empresa.representanteLegal,
          CNPJ: empresa.CNPJ,
          codigoEmpresa: empresa.codigoEmpresa,
          ativo: empresa.ativo,
        }));
      });
  }

  handleUpdateEmpresa(empresa: Empresa) {
    this.router.navigate([`/adm/empresa/${empresa.idEmpresa}`]);
  }

  openModalConfirmation(empresa: Empresa) {
    const confirmation = confirm(
      `Tem certeza que deseja excluir a empresa ${empresa.nomeFantasia}?`
    );
    if (confirmation) {
      this.admPagesService.softDeleteEmpresa(empresa.idEmpresa).subscribe(() => {
        console.log(
          `Empresa ${empresa.nomeFantasia} excluída com sucesso!`
        );
        this.getEmpresas(); // Refresh the list of empresas after deletion
      });
    }
  }

  handleNovaEmpresa() {
    this.router.navigate(['/adm/create-empresa']);
  }
}
