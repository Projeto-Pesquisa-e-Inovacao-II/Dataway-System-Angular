import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header/header.component';
import { BarComponent } from '../../components/bar/bar.component';
import { NotasService } from '../../services/notas/notas.service';
import { Notas } from '../../interfaces/notas/notas';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  imports: [HeaderComponent, CommonModule, BarComponent],
  styleUrl: './notas.component.scss'
})
export class NotasComponent {
  constructor(private notaService:NotasService){}
  public nota:Notas[]=[]
  nomeDoUsuario: string = localStorage.getItem('nomeUsuario') || '';
  ngOnInit(): void {
    this.getNotas()
    
  }
  getNotas() {
    this.notaService.getNotas().subscribe((data:any)=>{
       console.log(data)
      this.nota=data.map((item:any)=>({
        descricao:item.Descricao,
        mesReferente:item.MesReferente,
        concessao:item.Concessao,
        status:item.Status
      }))
      console.log(this.nota)
    })
  }

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

  Statusnota = [
    { titulo: 'Alerta' },
    { titulo: 'Crítico' },
    { titulo: 'Estável' }
  ];
}



