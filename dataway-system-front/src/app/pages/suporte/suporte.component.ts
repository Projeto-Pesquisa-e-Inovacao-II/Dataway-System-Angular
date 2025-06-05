import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { SuportServiceService } from '../../services/suportService/suport-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suporte',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './suporte.component.html',
  styleUrl: './suporte.component.scss',
})
export class SuporteComponent {
  constructor(private suportService: SuportServiceService) {}
  // https://nodemailer.com/
  // https://www.w3schools.com/nodejs/nodejs_email.asp
  USER_EMAIL = localStorage.getItem('email') ?? '';
  ID_USUARIO = localStorage.getItem('idUsuario') ?? '';
  emailStructure = {
    emailTo: this.USER_EMAIL,
    assunto: '',
    mensagem: '',
  };

  ngOnInit() {}

  enviarEmail() {
    if (
      this.emailStructure.emailTo &&
      this.emailStructure.assunto &&
      this.emailStructure.mensagem
    ) {
      // Aqui você pode chamar o serviço de envio de email
      this.suportService.enviarEmail(
        this.emailStructure.emailTo,
        this.emailStructure.assunto,
        this.emailStructure.mensagem
      ).subscribe(
        (response: any) => {
          console.log('Email enviado com sucesso:', response);
        },
        (error) => {
          console.error('Mensagem failed:', error);
        }
      );
      console.log('Email enviado com sucesso!');

    } else {
      console.error('Por favor, preencha todos os campos.');
    }
  }
}
