import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  BASE_URL = 'http://localhost:3333';

  postLogin(dados: any) {
    return this.http.post(`${this.BASE_URL}/usuarios/autenticar`, dados);
  }
}
