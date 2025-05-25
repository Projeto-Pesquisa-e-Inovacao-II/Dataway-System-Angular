import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../global';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  http = inject(HttpClient);

  constructor() {}

  getTrafegoEvasaoData(idUsuario: number, concessao: string) {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('concessao', concessao);
    console.log(params);
    return this.http.get(`${BASE_URL}/grafico_trafego_evasao`, { params });
  }

  getPracaAlerta(idUsuario: number, concessao: string, mes: number) {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('mes', mes)
      .set('concessao', concessao);

    return this.http.get(`${BASE_URL}/grafico_trafego_evasao/praca_alerta`, { params });
  }

  getEvasaoData(idUsuario: number, mes: number, concessao: string) {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('mes', mes)
      .set('concessao', concessao);
    return this.http.get(`${BASE_URL}/grafico_trafego_evasao/total_evasao`, { params });
  }
}
