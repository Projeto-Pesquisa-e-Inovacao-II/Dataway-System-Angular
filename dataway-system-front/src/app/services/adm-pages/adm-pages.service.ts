import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../global';
import { Empresa } from '../../interfaces/empresa/empresa';

@Injectable({
  providedIn: 'root',
})
export class AdmPagesService {
  constructor() {}
  http = inject(HttpClient);

  getEmpresas() {
    return this.http.get(`${BASE_URL}/adm/empresas`);
  }

  getEmpresa(idEmpresa: string) {
    const params = new HttpParams().set('idEmpresa', idEmpresa.toString());
    return this.http.get(`${BASE_URL}/adm/empresa`, { params });
  }

  getEmpresaSearchResults(search: string) {
    const params = new HttpParams().set('search', search.toString());
    return this.http.get(`${BASE_URL}/adm/empresasFiltradas`, { params });
  }

  updateEmpresa(idEmpresa: string, empresa: Empresa, concessoes: string[]) {
    console.log('Updating empresa:', empresa);
    console.log('Empresa ID:', idEmpresa);
    console.log('Empresa cnpj:', empresa.CNPJ);
    console.log('Empresa status:', empresa.ativo);

    const body = {
      idEmpresa: idEmpresa,
      nomeFantasia: empresa.nomeFantasia,
      representanteLegal: empresa.representanteLegal,
      CNPJ: empresa.CNPJ,
      codigoEmpresa: empresa.codigoEmpresa,
      ativo: empresa.ativo,
      concessoes: concessoes,
    };
    return this.http.put(`${BASE_URL}/adm/empresa`, body);
  }

  createEmpresa(empresa: Empresa, concessoes: string[]) {
    console.log('Creating empresa:', empresa);
    const body = {
      nomeFantasia: empresa.nomeFantasia,
      razaoSocial: empresa.razaoSocial,
      representanteLegal: empresa.representanteLegal,
      CNPJ: empresa.CNPJ,
      codigoEmpresa: empresa.codigoEmpresa,
      ativo: empresa.ativo,
      concessoes: concessoes,
    };
    return this.http.post(`${BASE_URL}/adm/cadastrar-empresa`, body);
  }

  softDeleteEmpresa(idEmpresa: number) {
    const params = new HttpParams().set('idEmpresa', idEmpresa.toString());
    return this.http.put(
      `${BASE_URL}/adm/empresa/desativar/${idEmpresa}`,
      params
    );
  }

  getConcessoes() {
    return this.http.get(`${BASE_URL}/adm/concessoes`);
  }
}
