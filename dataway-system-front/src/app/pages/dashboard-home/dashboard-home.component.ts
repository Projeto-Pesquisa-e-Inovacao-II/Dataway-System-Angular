import { Component, Output, output } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { HomeCardsComponent } from '../../components/HomeCards/home-cards/home-cards.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeDashboardService } from '../../services/home-dashboard/home-dashboard.service';
import { HomeDashboard } from '../../interfaces/homeDashboard/home-dashboard';
import { iif } from 'rxjs';
import { BarComponent } from "../../components/bar/bar.component";

@Component({
  selector: 'app-dashboard-home',
  imports: [HeaderComponent, HomeCardsComponent, CommonModule, BarComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent {
  concessao: any = [];
  monthInCard: string = '';
  nomeDoUsuario: string = localStorage.getItem('nomeUsuario') || '';
  mesSelected: number = Number(localStorage.getItem('mesNumber')) || 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private homeDashboardService: HomeDashboardService
  ) {}

  ngOnInit() {
    this.getDistinctConcessoes();
    const month = this.route.snapshot.paramMap.get('mes');
    if (month) {
      this.handleMonths(Number(month));
    }

    if (!month) {
      localStorage.removeItem('mes');
      localStorage.removeItem('mesNumber');
      this.mesSelected = 0;
      this.monthInCard = '';
    }
  }

  handleFilterDashboard(item: string) {
    this.router.navigate(['/dashboard', item]);
  }

  handleFilterCards(month: string) {
    this.router.navigate(['/app', month]);
  }

  lotes: HomeDashboard[] = [];

  getDistinctConcessoes() {
    const idUsuario = Number(localStorage.getItem('idUsuario'));

    const monthFilter = Number(this.route.snapshot.paramMap.get('mes'));
    console.log(monthFilter);

    if (monthFilter) {
      console.log('Month filter:', monthFilter);
    }

    this.homeDashboardService
      .getDistinctConcessoes(idUsuario, monthFilter)
      .subscribe({
        next: (res: any) => {
          res.forEach((element: any) => {
            const lote: HomeDashboard = {
              nomeConcessao: element.concessao,
              trafego: element.trafego,
              valor: element.valor,
              impactoFinanceiro: element.impactoFinanceiro,
            };
            lote.evasoes = Number(Number(element.evasoes).toFixed(2));
            lote.impactoFinanceiroPorcentagem = Number(
              (
                (Number(element.impactoFinanceiro) / Number(element.valor)) *
                100
              ).toFixed(2)
            );
            // this.homeDashboardService
            //   .getEvasao(idUsuario, element.concessao, monthFilter)
            //   .subscribe({
            //     next: (evasaoRes: any) => {
            //       lote.evasoes = evasaoRes[0]?.evasoes !== undefined ? Number(evasaoRes[0].evasoes).toFixed(2) : 0;
            //     },
            //     error: (err) => {
            //       console.error('Error fetching evasao:', err);
            //     },
            //   });
            this.lotes.push(lote);
            console.log('Lote:', lote);
          });
          console.log('Distinct concessions:', res);
          console.log(this.lotes);
        },
        error: (err) => {
          console.error('Error fetching distinct concessions:', err);
        },
      });
  }

  getEvasao(mes: number, concessao: string) {
    const idUsuario = Number(localStorage.getItem('idUsuario'));
    this.homeDashboardService.getEvasao(idUsuario, concessao, mes).subscribe({
      next: (res: any) => {
        return res[0].evasoes;
      },
      error: (err) => {
        console.error('Error fetching evasao:', err);
      },
    });
  }

  public handleMonths(month: number) {
    const monthNames = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const monthNumber = Number(month);
    month = monthNumber;
    this.monthInCard = monthNames[month - 1];

    localStorage.setItem('mes', this.monthInCard);
    localStorage.setItem('mesNumber', month.toString());
    this.mesSelected = monthNumber;
  }
}
