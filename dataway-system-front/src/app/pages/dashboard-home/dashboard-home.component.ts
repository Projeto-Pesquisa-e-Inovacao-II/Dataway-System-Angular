import { Component, Output, output } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { HomeCardsComponent } from '../../components/HomeCards/home-cards/home-cards.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  imports: [HeaderComponent, HomeCardsComponent, CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent {
  teste1: any = {};
  concessao: any = [];

  ngOnInit() {
    this.concessao = [
      {
        id: 1,
        title: 'Concessão 1',
        description: 'Descrição da concessão 1',
        status: '123012',
        data: '2023-10-01',
      },
      {
        id: 2,
        title: 'Concessão 2',
        description: 'Descrição da concessão 2',
        status: '130213',
        data: '2023-10-02',
      },
      {
        id: 3,
        title: 'Concessão 3',
        description: 'Descrição da concessão 3',
        status: '12313',
        data: '2023-10-03',
      },
      {
        id: 4,
        title: 'Concessão 4',
        description: 'Descrição da concessão 4',
        status: '130213',
        data: '2023-10-04',
      },
    ]

    console.log(this.concessao[0].title);
  }
}
