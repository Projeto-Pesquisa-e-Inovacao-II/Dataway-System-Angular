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
    this.geDistinctConcessoes();
  }

  handleFilterDashboard(item: string) {
    this.router.navigate(['/dashboard', item]);
  }

  lotes: HomeDashboard[] = [];

  geDistinctConcessoes() {
    const idUsuario = Number(localStorage.getItem('idUsuario'));

    this.homeDashboardService.geDistinctConcessoes(idUsuario).subscribe({
      next: (res: any) => {
        console.log('Distinct concessions:', res);
        res.forEach((element: any) => {
          console.log('Element:', element);
          this.lotes.push({
            nomeConcessao: element.concessao,
            trafego: element.trafego,
          });
        });
        console.log(this.lotes);
      },
      error: (err) => {
        console.error('Error fetching distinct concessions:', err);
      },
    });
  }
}
