import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header/header.component';
import { BarComponent } from '../../components/bar/bar.component';
import { NotasService } from '../../services/notas/notas.service';
import { Notas } from '../../interfaces/notas/notas';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss'],
  standalone: true,
  imports: [HeaderComponent, CommonModule, BarComponent, ReactiveFormsModule],
})
export class NotasComponent implements OnInit {
  nota: Notas[] = [];
  nomeDoUsuario = localStorage.getItem('nomeUsuario') || '';

  showModalEditar = false;
  showModalCriar = false;
  notaSelecionada: Notas | null = null;
  esconderCriarNota = false;

  editarForm: FormGroup;
  criarForm: FormGroup;
  camposEditaveis = false;

  constructor(private notaService: NotasService) {
    this.editarForm = new FormGroup({
      descricao: new FormControl('', Validators.required),
      mesReferente: new FormControl('', Validators.required),
      concessao: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
    this.editarForm.disable();

    this.criarForm = new FormGroup({
      descricao: new FormControl('', Validators.required),
      mesReferente: new FormControl('', Validators.required),
      concessao: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getNotas();
  }

  normalizarStatus(status: string | null | undefined): string {
  if (!status) return '';

  const s = status.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();

  if (s.includes('critico')) return 'Critico';
  if (s.includes('alerta')) return 'Alerta';
  if (s.includes('estavel')) return 'Estavel';

  return '';
}

  getNotas() {
    this.notaService.getNotas().subscribe((data: any) => {
      this.nota = data.map((item: any) => ({
        descricao: item.Descricao,
        mesReferente: item.MesReferente,
        concessao: item.Concessao,
        status: this.normalizarStatus(item.Status),
      }));
    });
  }

  abrirModalNota(nota: Notas) {
    this.notaSelecionada = { ...nota };
    this.editarForm.setValue({
      descricao: nota.descricao || '',
      mesReferente: nota.mesReferente || '',
      concessao: nota.concessao || '',
      status: this.normalizarStatus(nota.status) || '',
    });
    this.editarForm.disable();
    this.camposEditaveis = false;
    this.showModalEditar = true;
  }

  criarNota() {
    this.criarForm.reset();
    this.showModalCriar = true;
  }

  ativarEdicao() {
    if (this.editarForm.disabled) {
      this.editarForm.enable();
      this.camposEditaveis = true;
    }
  }

  salvarEdicao() {
    if (this.editarForm.valid) {
      this.notaSelecionada = { ...this.editarForm.value };
      // this.notaService.atualizarNota(...);
      this.fecharModais();
    }
  }

  salvarCriacao() {
    if (this.criarForm.valid) {
      const novaNota = { ...this.criarForm.value };
      // this.notaService.criarNota(...);
      this.esconderCriarNota = true;
      this.fecharModais();
    }
  }

  excluirNota() {
    if (this.notaSelecionada) {
      // this.notaService.excluirNota(...);
      this.fecharModais();
    }
  }

  fecharModais() {
    this.showModalEditar = false;
    this.showModalCriar = false;
    this.camposEditaveis = false;
  }

 onModalBackgroundClick(event: MouseEvent, tipo: 'editar' | 'criar') {
  const target = event.target as HTMLElement;

  if (target && target.classList && target.classList.contains('modal')) {
    this.fecharModais();
  }
}

}