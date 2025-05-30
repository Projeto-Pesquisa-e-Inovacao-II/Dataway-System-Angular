import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../global';

@Injectable({
  providedIn: 'root',
})
export class AdmPagesService {
  constructor() {}
  http = inject(HttpClient);

  getEmpresas() {
    return this.http.get(`${BASE_URL}/adm/empresas`);
  }

  getEmpresaSearchResults(search: string) {
    const params = new HttpParams().set('search', search.toString());
    return this.http.get(`${BASE_URL}/adm/empresasFiltradas`, { params });
  }
}
