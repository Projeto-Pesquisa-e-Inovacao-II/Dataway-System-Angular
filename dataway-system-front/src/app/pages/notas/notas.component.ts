import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header/header.component';
import { NotasService } from '../../services/notas/notas.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  imports: [HeaderComponent, CommonModule],
  styleUrl: './notas.component.scss'
})
export class NotasComponent implements OnInit {
  notas: any[] = [];

  constructor(private notasService: NotasService) {}

  ngOnInit() {
    const cpf = localStorage.getItem('cpf');
    if (cpf) {
      this.notasService.getNotasPorUsuario(cpf).subscribe(notas => {
        this.notas = notas;
      });
    }
  }
}