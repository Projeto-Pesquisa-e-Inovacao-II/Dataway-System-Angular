import { Component } from '@angular/core';
import { USERNAME } from '../../../../global';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public nomeUsuario: string = USERNAME;
  isPopupOpen: boolean = false;
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
    window.location.href = '/app/perfil';
  }
}
