import { Component } from '@angular/core';
import { USERNAME } from '../../../../global';
import { CommonModule } from '@angular/common';
import { NotificacoesService } from '../../../services/notificacoes/notificacoes.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public nomeUsuario: string = USERNAME;
  isPopupOpen: boolean = false;
  notificacoesAtivas: boolean = true;
  idUsuario: string = localStorage.getItem('idUsuario') ?? '';

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
      popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
      this.isPopupOpen =
        popup.style.display === 'block'
          ? (this.isPopupOpen = true)
          : (this.isPopupOpen = false);
    }
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
