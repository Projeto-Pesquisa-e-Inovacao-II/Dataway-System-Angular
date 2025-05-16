import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SuporteComponent } from './pages/suporte/suporte.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/perfil', component: PerfilComponent },
  { path: 'dashboard/suporte', component: SuporteComponent },
  { path: '**', redirectTo: '' }
];