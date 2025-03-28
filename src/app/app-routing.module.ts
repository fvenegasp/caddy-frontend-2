import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar componentes
import { DashboardComponent } from './components/caddy/dashboard/dashboard.component';
import { EstadoImplementacionComponent } from './components/estado-implementacion/estado-implementacion.component';
import { CanalDenunciasComponent } from './components/canal-denuncias/canal-denuncias.component';
import { CapacitacionesComponent } from './components/capacitaciones/capacitaciones.component';
import { RiesgosComponent } from './components/riesgos/riesgos.component';
import { MejoraContinuaComponent } from './components/mejora-continua/mejora-continua.component';
import { ReportesComponent } from './components/reportes/reportes.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'estado-implementacion', component: EstadoImplementacionComponent },
  { path: 'canal-denuncias', component: CanalDenunciasComponent },
  { path: 'capacitaciones', component: CapacitacionesComponent },
  { path: 'riesgos', component: RiesgosComponent },
  { path: 'mejora-continua', component: MejoraContinuaComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 