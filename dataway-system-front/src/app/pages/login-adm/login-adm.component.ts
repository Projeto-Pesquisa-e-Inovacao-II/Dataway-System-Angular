import { Component } from '@angular/core';
import { AdmPagesService } from '../../services/adm-pages/adm-pages.service';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../interfaces/login/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-adm',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-adm.component.html',
  styleUrl: './login-adm.component.scss',
})
export class LoginAdmComponent {
  constructor(private loginService: LoginService) {}

  user: User = {
    email: '',
    senha: '',
  };

  handleAdmLogin() {
    const loginData = {
      email: this.user.email,
      senha: this.user.senha,
    };
    console.log('Attempting to log in with data:', loginData);
    this.loginService.postLoginAdm(loginData).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        console.log('User ID:', response.cpf);
        console.log('User Type:', response.tipoUsuario);
        const idUsuario = response.cpf;
        const tipoUsuario = response.tipoUsuario;

        if(tipoUsuario == 'admin'.toLowerCase()) {
          localStorage.clear();
          localStorage.setItem('adm', 'true');
        }
        localStorage.setItem('idUsuario', idUsuario);
        location.href = '/adm/empresa';
      },
      (error) => {
        console.error('Login failed:', error);
        // Handle login failure, e.g., show an error message
      }
    );
  }
}
