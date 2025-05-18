export interface DashboardTrafegoEvasao {
  evasao: number;
  trafego: number;
}

export interface DashboardGraficoTrafegoEvasao {
  mes: string;
  dados: DashboardTrafegoEvasao[];
}