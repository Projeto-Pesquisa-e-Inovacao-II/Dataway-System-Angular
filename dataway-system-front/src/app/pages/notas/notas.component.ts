import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header/header.component';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  imports: [HeaderComponent, CommonModule],
  styleUrl: './notas.component.scss'
})
export class NotasComponent {
  notas = [
    { cor: 'vermelho' },
    { cor: 'laranja' },
    { cor: 'verde' },
    { cor: 'vermelho' },
    { cor: 'laranja' },
    { cor: 'verde' },
    { cor: 'vermelho' },
    { cor: 'vermelho' }
  ];
}
