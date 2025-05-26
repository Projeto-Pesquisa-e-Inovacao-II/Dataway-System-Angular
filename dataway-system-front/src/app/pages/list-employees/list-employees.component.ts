import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header/header.component';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss'
})
export class ListEmployeesComponent {
  showManageIcons = false;

  employees = [
    { nome: 'Victor Almeida dos Santos', email: 'victor..com', tipoConta: 'Comum' },
    { nome: 'Victor Almeida dos Santos', email: 'victor..com', tipoConta: 'Comum' },
    { nome: 'Victor Almeida dos Santos', email: 'victor..com', tipoConta: 'Super' }
  ];

  toggleManageIcons() {
    this.showManageIcons = !this.showManageIcons;
  }

  deleteEmployee(index: number) {
    this.employees.splice(index, 1);
  }
}
