import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'mantenedor',
    loadChildren: './mantenedor/mantenedor.module#MantenedorPageModule'
  },
  { path: 'mantenedor', loadChildren: './mantenedor/mantenedor.module#MantenedorPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'autoayuda', loadChildren: './autoayuda/autoayuda.module#AutoayudaPageModule' },
  { path: 'reportes', loadChildren: './reportes/reportes.module#ReportesPageModule' },
  { path: 'controlescalidad', loadChildren: './controlescalidad/controlescalidad.module#ControlescalidadPageModule' },
  { path: 'opciones', loadChildren: './opciones/opciones.module#OpcionesPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
