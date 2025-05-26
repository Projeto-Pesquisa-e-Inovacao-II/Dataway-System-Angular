import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header/header.component';
import { Employee } from '../../interfaces/employee/employee';
import { CreateEmployeeService } from '../../services/create-employee/create-employee.service';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss'
})
export class ListEmployeesComponent {
  showManageIcons = false;
  constructor(private createEmployeeService: CreateEmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  employees: Employee[] = [{
    name: '',
    birthDate: '',
    email: '',
    password: '',
    role: '',
    cpf: '',
  }];

  getEmployees() {
    const idUsuario: number = Number(localStorage.getItem('idUsuario') ?? 0);
    this.createEmployeeService.getEmployees(idUsuario).subscribe((data: Employee[]) => {
      console.log(data)
    }
    );
  }

  toggleManageIcons() {
    this.showManageIcons = !this.showManageIcons;
  }

  deleteEmployee(index: number) {
    this.employees.splice(index, 1);
  }
}
