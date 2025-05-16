import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  http = inject(HttpClient);
  BASE_URL = 'http://localhost:3333';

  cadastrarUsuario(dados: any) {
    return this.http.post(`${this.BASE_URL}/usuarios/cadastrar`, dados);
  }
}
