import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../global';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  http = inject(HttpClient);

  cadastrarUsuario(dados: any) {
    return this.http.post(`${BASE_URL}usuarios/cadastrar`, dados);
  }
}
