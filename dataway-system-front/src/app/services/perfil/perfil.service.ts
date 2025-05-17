import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserData } from '../../interfaces/perfil/user-data';
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

  updateUserData(userData: UserData) {
    const idUsuario = localStorage.getItem('idUsuario') ?? '';
    const params = new HttpParams().set('idUsuario', idUsuario);
    return this.http.put(`${this.BASE_URL}/update_user_data`, userData, {
      params,
    });
  }

  deleteUser(idUsuario: string) {
    const params = new HttpParams().set('idUsuario', idUsuario);
    return this.http.delete(`${this.BASE_URL}/delete_user_data`, { params });
  }
}
