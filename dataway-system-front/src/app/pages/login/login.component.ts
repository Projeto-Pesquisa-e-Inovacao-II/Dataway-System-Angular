import { Component } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../interfaces/login/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    document.body.classList.add('login-body');
  }

  user: User = {
    email: '',
    senha: '',
  };

  postLogin() {
    const dados = {
      email: this.user.email,
      senha: this.user.senha,
    };
    this.loginService.postLogin(dados).subscribe(
      (res: any) => {
        console.log('foi', res);
        const idUsuario = res.idUsuario;
        localStorage.setItem('idUsuario', idUsuario);
        location.href = '/dashboard';
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

}
