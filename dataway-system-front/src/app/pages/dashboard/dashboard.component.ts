import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { HeaderComponent } from '../../components/header/header/header.component';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { DashboardGraficoTrafegoEvasao } from '../../interfaces/dashboard/dashboard-data-structure';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);
Chart.register(MatrixController, MatrixElement);
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  } // TYPESCRIPT DO MODAL DA OCORRENCIA
  onModalBackgroundClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal();
    }
  }
  public dadosTrafegoEvasao: DashboardGraficoTrafegoEvasao[] = [];
  public monthFilter: number = 0;
  public nomeConcessao: string = '';
  public praca: string = '';
  public evasoes: string = '';
  public impactoFinanceiro: string = '';
  public checkButtonValue: boolean = false;
  public actualMonth: string = localStorage.getItem('mes') || '';

  ngOnInit(): void {
    this.nomeConcessao =
      this.route.snapshot.paramMap.get('nomeConcessao') || '';

    if (this.nomeConcessao === '') {
      this.router.navigate(['/app']);
    }

    this.getTrafegoEvasaoData(this.nomeConcessao);
    this.getPracaAlerta(
      Number(localStorage.getItem('idUsuario')),
      this.nomeConcessao,
      Number(localStorage.getItem('mesNumber'))
    );
    this.getEvasaoData(
      Number(localStorage.getItem('mesNumber')),
      this.nomeConcessao
    );
    this.getImpactoFinanceiroData(
      Number(localStorage.getItem('mesNumber')),
      this.nomeConcessao
    );
    this.getPercentualEvasaoImpacto();
    this.getCategorias();
  }

  ngAfterViewInit(): void {
    // this.lineChart = new Chart('lineCanvas', this.configLine);
    this.barChart = new Chart('barCanvas', this.configBarAndLine);
    this.lineChart = new Chart('horizontalBarChart', this.config);
  }

  public meses: string[] = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  handleFilterChange(period: number) {
    this.monthFilter = period;
    console.log(this.monthFilter);
    this.meses = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];

    if (this.monthFilter === 1) {
      this.meses = [localStorage.getItem('mes') || ''];
    }

    if (this.monthFilter === 6) {
      var mesNumero = localStorage.getItem('mesNumber');

      this.meses = this.meses.slice(
        Number(mesNumero) - 1,
        Number(mesNumero) + 5
      );
    }

    if (this.monthFilter === 12) {
      this.meses = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ];
    }

    this.barChart.data.labels = this.meses;
    this.barChart.update();
  }

  getPracaAlerta(idUsuario: number, concessao: string, mes: number) {
    this.dashboardService
      .getPracaAlerta(idUsuario, concessao, mes)
      .subscribe((data: any) => {
        this.praca = data[0]?.praca;
        console.log(data[0]?.praca);
      });

    console.log(this.praca);
  }

  getTrafegoEvasaoData(concessao: string) {
    const idUsuario: number = Number(localStorage.getItem('idUsuario') ?? 0);

    this.dashboardService
      .getTrafegoEvasaoData(idUsuario, concessao)
      .subscribe((data: any) => {
        console.log(data[2].dados);
        this.dadosTrafegoEvasao = data.map((item: any) => ({
          mes: item.mes,
          dados: [
            {
              trafego: item.dados[0].trafego,
              evasao: item.dados[0].evasoes,
            },
          ],
        }));
        console.log(this.dadosTrafegoEvasao);

        // this.barAndLine = this.dadosTrafegoEvasao.map(
        //   (item: DashboardGraficoTrafegoEvasao) => {
        //     return item.mes;
        //   }
        // );
        // console.log(this.barAndLine);

        this.evasoesData = this.dadosTrafegoEvasao.map(
          (item: DashboardGraficoTrafegoEvasao) => {
            return Number(item.dados[0].evasao);
          }
        );

        // this.trafegoData = this.dadosTrafegoEvasao.map(
        //   (item: DashboardGraficoTrafegoEvasao) => {
        //     return Number(item.dados[0].trafego);
        //   }
        // );

        this.barChart.data.datasets[0].data = this.evasoesData;
        // this.barChart.data.datasets[1].data = this.trafegoData;
        this.barChart.update();

        console.log(this.barChart.data);
      });
  }

  getEvasaoData(mes: number, concessao: string) {
    const idUsuario: number = Number(localStorage.getItem('idUsuario') ?? 0);
    this.dashboardService
      .getEvasaoData(idUsuario, mes, concessao)
      .subscribe((data: any) => {
        console.log(data[0].evasoes);
        this.evasoes = data[0].evasoes;
      });
  }

  getImpactoFinanceiroData(mes: number, concessao: string) {
    const idUsuario: number = Number(localStorage.getItem('idUsuario') ?? 0);
    this.dashboardService
      .getImpactoFinanceiro(idUsuario, mes, concessao)
      .subscribe((data: any) => {
        console.log(data[0].impacto);
        this.impactoFinanceiro = data[0].impactoFinanceiro;
      });
  }

  valoresParaComparacao: any = {
    evasaoMesAnterior: 0,
    evasaoMesAtual: 0,
    evasaoAumentando: false,
    impactoMesAnterior: 0,
    impactoMesAtual: 0,
    impactoAumentando: false,
    percentualEvasao: 0,
    percentualImpacto: 0,
  };

  getPercentualEvasaoImpacto() {
    this.dashboardService
      .getPercentualEvasaoImpacto(
        Number(localStorage.getItem('idUsuario')),
        Number(localStorage.getItem('mesNumber')),
        this.nomeConcessao
      )
      .subscribe((data: any) => {
        console.log(data[0]);
        //evasaoMesAnterior, evasaoMesAtual, impactoMesAnterior, impactoMesAtual
        this.valoresParaComparacao = {
          evasaoMesAnterior: data[0].evasaoMesAnterior,
          evasaoMesAtual: data[0].evasaoMesAtual,
          impactoMesAnterior: data[0].impactoMesAnterior,
          impactoMesAtual: data[0].impactoMesAtual,
        };

        const comparacao = data[0].impactoMesAnterior - data[0].impactoMesAtual;
        const percentualComparacaoImpacto =
          (Number(comparacao) / Number(data[0].impactoMesAnterior)) * 100;

        const comparacaoEvasao =
          data[0].evasaoMesAnterior - data[0].evasaoMesAtual;
        const percentualComparacaoEvasao =
          (Number(comparacaoEvasao) / Number(data[0].evasaoMesAnterior)) * 100;

        console.log(comparacao);
        console.log(percentualComparacaoEvasao);

        if (comparacao < 0) {
          console.log('diminuindo');
          this.valoresParaComparacao.impactoAumentando = false;
        }
        if (comparacao > 0) {
          console.log('aumentando');
          this.valoresParaComparacao.impactoAumentando = true;
        }

        if (comparacaoEvasao < 0) {
          console.log('evasao diminuindo');
          this.valoresParaComparacao.evasaoAumentando = false;
        }
        if (comparacaoEvasao > 0) {
          console.log('evasao aumentando');
          this.valoresParaComparacao.evasaoAumentando = true;
        }
        this.valoresParaComparacao.percentualImpacto = Math.abs(
          Number(percentualComparacaoImpacto.toFixed(0))
        );
        this.valoresParaComparacao.percentualEvasao = Math.abs(
          Number(percentualComparacaoEvasao.toFixed(0))
        );
        console.log(this.valoresParaComparacao);
      });
  }

  rankingCategoria: any = {
    categoria: '',
    total: 0,
  };

  getCategorias() {
    const idUsuario: number = Number(localStorage.getItem('idUsuario') ?? 0);
    const mes: number = Number(localStorage.getItem('mesNumber') ?? 0);
    const concessao: string = this.nomeConcessao;
    this.dashboardService
      .getCategorias(idUsuario, mes, concessao)
      .subscribe((data: any) => {
        console.log(data);
        this.data.datasets[0].data = data.map((item: any) => item.total);
        this.data.labels = data.map((item: any) => item.categoria);
        this.lineChart.update();
      });
  }

  //gráfico horizontal
  public data: any = {
    labels: [],
    datasets: [
      {
        label: 'Valores',
        data: [],
        backgroundColor: [
          'rgba(102, 230, 230, 0.8)',
          'rgba(56, 195, 224, 0.8)',
          'rgba(42, 157, 204, 0.8)',
        ],
        borderColor: [
          'rgba(102, 230, 230, 1)',
          'rgba(56, 195, 224, 1)',
          'rgba(42, 157, 204, 1)',
        ],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  public config: any = {
    type: 'doughnut',
    data: this.data,
    options: {
      cutout: '70%',
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: false,
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        y: {
          display: false,
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          displayColors: false,
        },
      },
    },
  };

  //gráfico de linha
  public labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  public backgroundPlugin: any = {
    id: 'custom_canvas_background_color',
    beforeDraw: (chartF: any) => {
      var {
        ctx,
        chartArea: { left, top, width, height },
      } = chartF;
      ctx.save();
      ctx.fillStyle = 'rgba(65, 183, 213, 0.64)';
      ctx.fillRect(left, top, width, height);
      ctx.restore();
    },
  };

  public dataLine: any = {
    labels: this.labels,
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: 'rgba(108, 230, 232, 0.56)',
        backgroundColor: 'rgba(108, 230, 232, 0.56)',
        tension: 0,
      },
      // {
      //   label: 'Avanços Automáticos',
      //   data: [10, 30, 50, 65, 60, 80, 90],
      //   fill: true,
      //   borderColor: '#ff6384',
      //   backgroundColor: 'rgba(255, 99, 132, 0.2)',
      //   tension: 0.3
    ],
  };

  public configLine: any = {
    type: 'line',
    data: this.dataLine,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
              weight: 'bold',
            },
            padding: 1,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
              weight: 'bold',
            },
          },
        },
      },
    },
    plugins: [this.backgroundPlugin],
  };

  // Dados heatmap

  public dias: string[] = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo',
  ];

  public MAX = 600000;
  public BASE_COLOR = [40, 225, 230];

  public dataPoints: any = [];

  //provisorio pra gerar os dados
  private generateDataPoints() {
    for (let m = 1; m <= 12; m++) {
      for (let d = 1; d <= 7; d++) {
        const v =
          d >= 5
            ? Math.floor(Math.random() * 200000) + 300000
            : Math.floor(Math.random() * 70000) + 10000;
        this.dataPoints.push({ x: m, y: d, v });
      }
    }
  }

  public configHeatMap: any = {
    type: 'matrix',
    data: {
      datasets: [
        {
          data: this.dataPoints,
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.5)',
          backgroundColor: (ctx: any) => {
            const v = ctx.dataset.data[ctx.dataIndex].v;
            const t = 1 - v / this.MAX;
            const [r, g, b] = this.BASE_COLOR;
            const alpha = 0.3 + 1 * t;
            return `rgba(${r},${g},${b},${alpha})`;
          },
          width: (ctx: any) => {
            const area = ctx.chart.chartArea;
            return area ? area.width / 12 - 7 : undefined;
          },
          height: (ctx: any) => {
            const area = ctx.chart.chartArea;
            return area ? area.height / 7 - 20 : undefined;
          },
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title() {
              return '';
            },
            label(ctx: any) {
              const v = ctx.raw.v;
              return `Evasões: ${v}`;
            },
          },
        },
      },

      scales: {
        x: {
          min: 1,
          max: 12,
          offset: true,
          grid: {
            display: false,
          },

          ticks: {
            font: {
              size: 12,
              weight: 'bold',
            },
            padding: 1,
            callback: (value: any) => {
              return this.meses[value - 1].toUpperCase();
            },
          },
        },
        y: {
          min: 1,
          max: 7,
          offset: true,
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
              weight: 'bold',
            },
            padding: 1,
            callback: (value: any) => {
              return this.dias[value - 1];
            },
          },
        },
      },
    },
  };

  // dados bar and line
  // private trafegoData: number[] = [];
  private evasoesData: number[] = [];

  public dataBarAndLine: any = {
    labels: this.meses,
    datasets: [
      {
        label: 'Evasões',
        data: this.evasoesData,
        backgroundColor: ['rgb(0, 151, 178)'],
        borderColor: ['rgb(0, 151, 178)'],
        fill: false,
      },
      // {
      //   label: 'Tráfego',
      //   data: this.trafegoData,
      //   borderColor: 'rgb(191, 191, 191)',
      //   backgroundColor: ['rgb(191, 191, 191)'],
      //   borderWidth: 1,
      //   borderRadius: 4,
      // },
    ],
  };

  public configBarAndLine: any = {
    type: 'bar',

    data: this.dataBarAndLine,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true,
          grid: {
            display: false,
          },
        },
      },
    },
  };
  public lineChart!: Chart;
  public barChart!: Chart;
}
