import { inject, Injectable } from '@angular/core';
import { Employee } from '../../interfaces/employee/employee';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../../../global';

@Injectable({
  providedIn: 'root',
})
export class CreateEmployeeService {
  constructor() {}
  http = inject(HttpClient);

  createEmployee(employeeData: Employee) {
    return this.http.post(`${BASE_URL}/create_employee`, employeeData);
  }

  getEmployees(idUsuario: number) {
    const params = new HttpParams().set('idUsuario', idUsuario);
    return this.http.get<Employee[]>(`${BASE_URL}/create_employee/list`, { params });
  }
}
