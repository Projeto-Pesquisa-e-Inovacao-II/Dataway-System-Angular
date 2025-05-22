import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-funcionario',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrl: './cadastrar-funcionario.component.scss'
})
export class CadastrarFuncionarioComponent {
  employee: any = {
    name: '',
    birthDate: '',
    email: '',
    password: '',
    role: '',
    cpf: '',
  }
  
  createEmployee() {
  
  }
}
