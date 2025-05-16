import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { PerfilService } from '../../services/perfil/perfil.service';

@Component({
  selector: 'app-perfil',
  imports: [AsideComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  constructor(private perfilService: PerfilService) {}

  userData: any = {
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
}
