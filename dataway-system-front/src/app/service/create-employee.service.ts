import { inject, Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee/employee';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../global';

@Injectable({
  providedIn: 'root',
})
export class CreateEmployeeService {
  constructor() {}
  http = inject(HttpClient);

  createEmployee(employeeData: Employee) {
    return this.http.post(`${BASE_URL}usuarios/cadastrar`, employeeData);
  }
}
