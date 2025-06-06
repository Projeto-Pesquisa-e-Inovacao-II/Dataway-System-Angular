import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../global';

@Injectable({
  providedIn: 'root',
})
export class NotificacoesService {
  constructor() {}

  http = inject(HttpClient);
  getNotificacoes(idUsuario: string) {
    const params = new HttpParams().set('idUsuario', idUsuario);
    return this.http.get(`${BASE_URL}/notificacoes`, { params });
  }

  updateNotificacoes(idUsuario: string, notificacoesAtivas: number) {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('notificacoesAtivas', notificacoesAtivas);
    return this.http.put(`${BASE_URL}/notificacoes`, null, { params });
  }
}
