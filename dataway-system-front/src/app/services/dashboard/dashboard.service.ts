import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../global';
import { PracaPorc } from '../../interfaces/pracaPorc/praca-porc';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  http = inject(HttpClient);

  constructor() {}

  getTrafegoEvasaoData(idUsuario: string, concessao: string) {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('concessao', concessao);
    console.log(params);
    return this.http.get(`${BASE_URL}/grafico_trafego_evasao`, { params });
  }

  getPracaAlerta(idUsuario: string, concessao: string, mes: number) {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('mes', mes)
      .set('concessao', concessao);

    return this.http.get(`${BASE_URL}/grafico_trafego_evasao/praca_alerta`, {
      params,
    });
  }

  getEvasaoData(idUsuario: string, mes: number, concessao: string) {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('mes', mes)
      .set('concessao', concessao);
    return this.http.get(`${BASE_URL}/grafico_trafego_evasao/total_evasao`, {
      params,
    });
  }

  getImpactoFinanceiro(idUsuario: string, mes: number, concessao: string) {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('mes', mes)
      .set('concessao', concessao);
    return this.http.get(
      `${BASE_URL}/grafico_trafego_evasao/impacto_financeiro`,
      { params }
    );
  }

  getPercentualEvasaoImpacto(
    idUsuario: string,
    mes: number,
    concessao: string
  ) {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('mes', mes)
      .set('concessao', concessao);
    return this.http.get(
      `${BASE_URL}/grafico_trafego_evasao/comparacao_evasao_impacto`,
      { params }
    );
  }

  getCategorias(idUsuario: string, mes: number, concessao: string) {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('mes', mes)
      .set('concessao', concessao);
    return this.http.get(`${BASE_URL}/grafico_trafego_evasao/categorias`, {
      params,
    });
  }

  getPercentualPraca(idUsuario: string, mes: number, concessao: string) {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('mes', mes)
      .set('concessao', concessao);
    return this.http.get<PracaPorc[]>(`${BASE_URL}/grafico_trafego_evasao/porcetagem_praca`, {
      params,
    });
  }
}
