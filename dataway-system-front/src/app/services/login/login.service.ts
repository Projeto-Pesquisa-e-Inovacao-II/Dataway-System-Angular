import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../global';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);

  postLogin(dados: any) {
    return this.http.post(`${BASE_URL}/usuarios/autenticar`, dados);
  }
}
