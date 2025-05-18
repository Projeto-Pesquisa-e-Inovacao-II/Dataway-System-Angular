export interface DashboardTrafegoEvasao {
  evasao: string;
  trafego: string;
}

export interface DashboardGraficoTrafegoEvasao {
  mes: string;
  dados: DashboardTrafegoEvasao[];
}