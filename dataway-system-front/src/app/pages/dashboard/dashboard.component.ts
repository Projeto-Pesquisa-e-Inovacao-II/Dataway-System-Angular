import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { HeaderComponent } from "../../components/header/header/header.component";
Chart.register(...registerables);
Chart.register(MatrixController, MatrixElement);
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  //gráfico horizontal
  public data: any = {
    labels: ['MOTO', 'PASSEIO', 'COMERCIAL'],
    datasets: [
      {
        label: 'Valores',
        data: [5, 10, 18],
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
    type: 'bar',
    data: this.data,
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          max: 20,
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
        y: {
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
      plugins: {
        legend: {
          display: false,
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
  public meses: any = [
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
  public dias: any = [
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
  public barAndLine: any[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  public dataBarAndLine: any = {
    labels: this.barAndLine,
    datasets: [
      {
        label: 'Evasões',
        data: [5, 7, 6, 8, 10, 9, 6, 7, 9, 10, 9, 20],
        borderColor: 'orange',
        backgroundColor: [
          'rgb(191, 191, 191)',
        ],
        fill: false,
      },
      {
        label: 'Tráfego',
        data: [10, 12, 15, 14, 20, 18, 10, 13, 16, 19, 22, 28],
        backgroundColor: [
          'rgb(108, 229, 232)',
          'rgb(65, 184, 213)',
          'rgb(45, 139, 186)',
          'rgb(47, 95, 152)',
        ],
        borderColor: [
          'rgb(108, 229, 232)',
          'rgb(65, 184, 213)',
          'rgb(45, 139, 186)',
          'rgb(47, 95, 152)',
        ],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  public configBarAndLine: any = {
    type: 'bar',

    data: this.dataBarAndLine,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          grid: {
          display: false
        }
        },
        y: {
          stacked: true,
          grid: {
          display: false
        }
        },
      },
    },
  };
  public chart: any;

  ngOnInit(): void {
    this.generateDataPoints();
    // this.chart = new Chart('horizontalBarChart', this.config);
    this.chart = new Chart('lineCanvas', this.configLine);
    // this.chart = new Chart('heatMapCanvas', this.configHeatMap);
    this.chart = new Chart('barCanvas', this.configBarAndLine);
  }
}
