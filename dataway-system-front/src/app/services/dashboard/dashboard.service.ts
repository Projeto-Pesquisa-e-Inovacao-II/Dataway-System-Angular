import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  http = inject(HttpClient);
  BASE_URL = 'http://localhost:3333';

  constructor() { }

  getTrafegoEvasaoData(idUsuario: number) {
    const params = new HttpParams().set('idUsuario', idUsuario);
    return this.http.get(`${this.BASE_URL}/grafico_trafego_evasao`, { params });
  }
}
