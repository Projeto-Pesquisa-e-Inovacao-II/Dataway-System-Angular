import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SuporteComponent } from './pages/suporte/suporte.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/perfil', component: PerfilComponent },
  { path: 'dashboard/suporte', component: SuporteComponent },
  { path: '', component: DashboardComponent },
  { path: '**', redirectTo: '' },
];
