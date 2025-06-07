import { Component } from '@angular/core';
import { USERNAME } from '../../../../global';
import { CommonModule } from '@angular/common';
import { NotificacoesService } from '../../../services/notificacoes/notificacoes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public nomeUsuario: string = USERNAME;
  isPopupOpen: boolean = false;
  isEditingConfig: boolean = false;
  notificacoesAtivas: boolean = true;
  idUsuario: string = localStorage.getItem('idUsuario') ?? '';
  

  frequencia: 'semanal' | 'semanal' | 'ambos' = 'semanal';
  horarioSemanal: string = '08:00';

  constructor(private notificacoes: NotificacoesService) {}

  ngOnInit() {
    this.getNotificacoesAtivas();
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

  handlePopup() {
    const popup = document.querySelector('.popup') as HTMLElement;
    if (popup) {
      popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
      this.isPopupOpen =
        popup.style.display === 'flex'
          ? (this.isPopupOpen = true)
          : (this.isPopupOpen = false);
    }

    if (!this.isPopupOpen) {
      this.isEditingConfig = false;
    }
  }

  startEditConfig() {
    this.isEditingConfig = !this.isEditingConfig;
  }

  onToggleNotification(evt: Event) {
    const chk = evt.target as HTMLInputElement;
    this.notificacoesAtivas = chk.checked;
    // Se ele desativou, poderíamos limpar imediatamente qualquer configuração:
    if (!this.notificacoesAtivas) {
      this.resetConfig();
    }
    // Se ativou, o restante do formulário (radio, horários) fica acessível.
  }

  cancelConfig() {
    // Resetamos quaisquer alterações que o usuário tenha feito:
    this.resetConfig();
    this.isEditingConfig = false;
  }

  saveConfig() {
    if (
      (this.frequencia === 'semanal' || this.frequencia === 'ambos') &&
      !this.horarioSemanal
    ) {
      alert('Selecione um horário para notificações semanais.');
      return;
    }

    const configuracaoSalva = {
      frequencia: this.frequencia,
      horarioSemanal:
        this.frequencia === 'semanal' || this.frequencia === 'ambos'
          ? this.horarioSemanal
          : null,
    };

    this.notificacoes
      .updateParametrizacao(this.idUsuario, configuracaoSalva.frequencia)
      .subscribe((response: any) => {
        console.log(response);
        this.isEditingConfig = false;
        this.handlePopup();
      });
  }

  private resetConfig() {
    this.notificacoesAtivas = false;
    this.frequencia = 'semanal';
    this.horarioSemanal = '08:00';
  }

  handlePerfil() {
    window.location.href = '/perfil';
  }

  handleNotificationUpdate(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.notificacoesAtivas = (event.target as HTMLInputElement).checked;

    const ativarNotificacoes = this.notificacoesAtivas === true ? 1 : 0;
    this.notificacoes
      .updateNotificacoes(this.idUsuario, ativarNotificacoes)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  getNotificacoesAtivas() {
    this.notificacoes
      .getNotificacoes(this.idUsuario)
      .subscribe((response: any) => {
        console.log(response[0].notificacoesAtivas);
        this.notificacoesAtivas =
          response[0].notificacoesAtivas == 0 ? false : true;
      });
    console.log(this.notificacoesAtivas);
  }
}
