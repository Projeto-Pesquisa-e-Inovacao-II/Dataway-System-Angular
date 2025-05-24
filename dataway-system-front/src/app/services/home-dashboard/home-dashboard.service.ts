import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../global';

@Injectable({
  providedIn: 'root',
})
export class HomeDashboardService {
  http = inject(HttpClient);

  constructor() {}

  geDistinctConcessoes(idUsuario: number) {
    const params = new HttpParams().set('idUsuario', idUsuario);
    console.log(params);
    return this.http.get(`${BASE_URL}/concessoes_usuario`, { params });
  }
}
