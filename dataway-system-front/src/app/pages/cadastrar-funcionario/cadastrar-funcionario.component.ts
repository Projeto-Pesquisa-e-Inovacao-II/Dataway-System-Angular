import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../interfaces/employee/employee';
import { CreateEmployeeService } from '../../services/create-employee/create-employee.service';

@Component({
  selector: 'app-cadastrar-funcionario',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrl: './cadastrar-funcionario.component.scss',
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
  };

  createEmployee() {
    this.employee = {
      name: this.employee.name,
      birthDate: this.employee.birthDate,
      email: this.employee.email,
      password: this.employee.password,
      role: this.employee.role,
      cpf: this.employee.cpf,
    };

    console.log(this.employee);

    this.createEmployeeService.createEmployee(this.employee).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Erro ao cadastrar:', error);
      },
    });
    return;
  }
}
