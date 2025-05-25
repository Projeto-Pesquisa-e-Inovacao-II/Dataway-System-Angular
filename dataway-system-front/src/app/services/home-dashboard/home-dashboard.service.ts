import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../global';

@Injectable({
  providedIn: 'root',
})
export class HomeDashboardService {
  http = inject(HttpClient);

  constructor() {}

  getDistinctConcessoes(idUsuario: number, monthFilter?: number) {
    const params = new HttpParams().set('idUsuario', idUsuario).set('mes', monthFilter || 0);
    console.log(params);
    return this.http.get(`${BASE_URL}/concessoes_usuario`, { params });
  }

  getEvasao(idUsuario: number, concessao: string, mes: number) {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('concessao', concessao)
      .set('mes', mes);
    return this.http.get(`${BASE_URL}/concessoes_usuario/evasoes`, { params });
  }
}
