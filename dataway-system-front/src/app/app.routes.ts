import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SuporteComponent } from './pages/suporte/suporte.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { CadastrarFuncionarioComponent } from './pages/cadastrar-funcionario/cadastrar-funcionario.component';
import { ListEmployeesComponent } from './pages/list-employees/list-employees.component';

export const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'app', component: DashboardHomeComponent },
  { path: 'app/perfil', component: PerfilComponent },
  { path: 'app/suporte', component: SuporteComponent },
  { path: 'app/cadastrar-funcionario', component: CadastrarFuncionarioComponent },
  { path: 'list-employees', component: ListEmployeesComponent },
  { path: '', component: DashboardComponent },
  { path: '**', redirectTo: '' },
];
