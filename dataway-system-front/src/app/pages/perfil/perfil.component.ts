import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { PerfilService } from '../../services/perfil/perfil.service';
import { UserData } from '../../interfaces/perfil/user-data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { log } from 'console';
import { HeaderComponent } from "../../components/header/header/header.component";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  constructor(private perfilService: PerfilService) {}
  isEditing = false;
  userData: UserData = {
    email: '',
    telefone: '',
    representanteLegal: '',
    nomeFantasia: '',
  };
  ngOnInit() {
    const idUsuario = localStorage.getItem('idUsuario');
    if (idUsuario) {
      this.getUserData(idUsuario);
      console.log(this.userData);
    }
  }

  getUserData(idUsuario: string) {
    this.perfilService.getUserData(idUsuario).subscribe((res: any) => {
      console.log(res[0]);
      this.userData.email = res[0].email;
      this.userData.telefone = res[0].telefone;
      this.userData.representanteLegal = res[0].representanteLegal;
      this.userData.nomeFantasia = res[0].nomeFantasia;
    });
  }

  updateUserData() {
    console.log(this.userData);
    this.perfilService.updateUserData(this.userData).subscribe(() => {});
    this.isEditing = false;
    console.log('Dados atualizados com sucesso!');
  }

  confirmationCode: string = '';
  deleteUser() {
    console.log(this.confirmationCode);
    if (this.confirmationCode == '1654789') {
      const idUsuario = localStorage.getItem('idUsuario');
      if (idUsuario) {
        this.perfilService.deleteUser(idUsuario).subscribe(() => {
          localStorage.removeItem('idUsuario');
          location.href = '/login';
        });
      }
    }
  }

  confirmDelete(): void {
    const popup = document.getElementById('popup');
    if (popup) popup.style.display = 'block';
  }
}
