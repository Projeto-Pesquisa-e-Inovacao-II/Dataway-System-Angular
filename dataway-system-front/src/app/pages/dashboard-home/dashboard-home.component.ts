import { Component, Output, output } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { HomeCardsComponent } from '../../components/HomeCards/home-cards/home-cards.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomeDashboardService } from '../../services/home-dashboard/home-dashboard.service';
import { HomeDashboard } from '../../interfaces/homeDashboard/home-dashboard';

@Component({
  selector: 'app-dashboard-home',
  imports: [HeaderComponent, HomeCardsComponent, CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent {
  concessao: any = [];
  constructor(
    private router: Router,
    private homeDashboardService: HomeDashboardService
  ) {}

  ngOnInit() {
    this.getDistinctConcessoes();
  }

  handleFilterDashboard(item: string) {
    this.router.navigate(['/dashboard', item]);
  }

  lotes: HomeDashboard[] = [];

  async getDistinctConcessoes() {
    const idUsuario = Number(localStorage.getItem('idUsuario'));

    this.homeDashboardService.getDistinctConcessoes(idUsuario).subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          const lote: HomeDashboard = {
            nomeConcessao: element.concessao,
            trafego: element.trafego,
            evasoes: 0
          };
          this.homeDashboardService.getEvasao(
            idUsuario,
            element.concessao,
            6
          ).subscribe({
            next: (evasaoRes: any) => {
              lote.evasoes = evasaoRes[0]?.evasoes ?? 0;
            },
            error: (err) => {
              console.error('Error fetching evasao:', err);
            },
          });
          this.lotes.push(lote);
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
    var evasoesPorcentagem: number = 0;
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
}
