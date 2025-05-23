import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../interfaces/employee/employee';
import { CreateEmployeeService } from '../../service/create-employee.service';

@Component({
  selector: 'app-cadastrar-funcionario',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrl: './cadastrar-funcionario.component.scss'
})
export class CadastrarFuncionarioComponent {
  constructor(private createEmployeeService: CreateEmployeeService) {}

  employee: Employee = {
    name: '',
    birthDate: '',
    email: '',
    password: '',
    role: '',
    cpf: '',
  }
  
  createEmployee() {
    this.createEmployeeService.createEmployee(this.employee);
  }
}
