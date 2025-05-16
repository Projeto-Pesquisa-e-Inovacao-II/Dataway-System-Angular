import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  http = inject(HttpClient);
  BASE_URL = 'http://localhost:3333';

  getUserData(idUsuario: string) {
    const params = new HttpParams().set('idUsuario', idUsuario);
    return this.http.get(`${this.BASE_URL}/get_user_data`, { params });
  }
}
