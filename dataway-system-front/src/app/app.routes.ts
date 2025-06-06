import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SuporteComponent } from './pages/suporte/suporte.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { CadastrarFuncionarioComponent } from './pages/cadastrar-funcionario/cadastrar-funcionario.component';
import { NotasComponent } from './pages/notas/notas.component';
import { ListEmployeesComponent } from './pages/list-employees/list-employees.component';
import { LoginAdmComponent } from './pages/login-adm/login-adm.component';
import { CreateEmpresasAdmComponent } from './pages/create-empresas-adm/create-empresas-adm.component';
import { UpdateEmpresaComponent } from './pages/update-empresa/update-empresa.component';
import { CreateEmpresaComponent } from './pages/create-empresa/create-empresa.component';

export const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-adm', component: LoginAdmComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/:nomeConcessao', component: DashboardComponent },
  { path: 'app', component: DashboardHomeComponent },
  { path: 'app/perfil', component: PerfilComponent },
  { path: 'app/suporte', component: SuporteComponent },
<<<<<<< HEAD
  { path: 'app/cadastrar-funcionario', component: CadastrarFuncionarioComponent },
  { path: 'notas', component: NotasComponent },
  { path: '', component: DashboardComponent },
=======
  {
    path: 'app/cadastrar-funcionario',
    component: CadastrarFuncionarioComponent,
  },
  { path: 'list-employees', component: ListEmployeesComponent },
  { path: 'app/:mes', component: DashboardHomeComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'suporte', component: SuporteComponent },
  { path: 'cadastrar-funcionario', component: CadastrarFuncionarioComponent },
  { path: 'adm/empresa', component: CreateEmpresasAdmComponent },
  { path: 'adm/create-empresa', component: CreateEmpresaComponent },
  { path: 'adm/empresa/:idEmpresa', component: UpdateEmpresaComponent },
  { path: 'adm/login', component: LoginAdmComponent },
  { path: '', component: DashboardHomeComponent },
>>>>>>> 79c4e9065585992b9757948ecee567d98c40bb8c
  { path: '**', redirectTo: '' },

];
