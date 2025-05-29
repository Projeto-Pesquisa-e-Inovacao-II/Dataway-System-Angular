import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserData } from '../../interfaces/perfil/user-data';
import { BASE_URL } from '../../../global';
@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  http = inject(HttpClient);
  getUserData(idUsuario: string) {
    const params = new HttpParams().set('idUsuario', idUsuario);
    return this.http.get(`${BASE_URL}/get_user_data`, { params });
  }

  updateUserData(userData: UserData) {
    const idUsuario = localStorage.getItem('idUsuario') ?? '';
    const params = new HttpParams().set('idUsuario', idUsuario);
    return this.http.put(`${BASE_URL}/update_user_data`, userData, {
      params,
    });
  }

  deleteUser(idUsuario: string) {
    const params = new HttpParams().set('idUsuario', idUsuario);
    return this.http.delete(`${BASE_URL}/delete_user_data`, { params });
  }
}
