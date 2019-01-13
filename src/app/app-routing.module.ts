import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './componentes/login/login.module#LoginPageModule' },
  { path: 'mantenedor', loadChildren: './componentes/mantenedor/mantenedor.module#MantenedorPageModule' },
  { path: 'login', loadChildren: './componentes/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './componentes/home/home.module#HomePageModule' },
  { path: 'autoayuda', loadChildren: './componentes/autoayuda/autoayuda.module#AutoayudaPageModule' },
  { path: 'reportes', loadChildren: './componentes/reportes/reportes.module#ReportesPageModule' },
  { path: 'controlescalidad', loadChildren: './componentes/controlescalidad/controlescalidad.module#ControlescalidadPageModule' },
  { path: 'opciones', loadChildren: './componentes/opciones/opciones.module#OpcionesPageModule' },
  { path: 'registro', loadChildren: './componentes/registro/registro.module#RegistroPageModule' },
  { path: 'calidadcondicionmenu', loadChildren: './componentes/calidadcondicionmenu/calidadcondicionmenu.module#CalidadcondicionmenuPageModule' },
  { path: 'listasmuestras', loadChildren: './componentes/listasmuestras/listasmuestras.module#ListasmuestrasPageModule' },
  { path: 'ingresarqr', loadChildren: './componentes/ingresarqr/ingresarqr.module#IngresarqrPageModule' },
  { path: 'calculocalidad', loadChildren: './componentes/calculocalidad/calculocalidad.module#CalculocalidadPageModule' },
  { path: 'calculocondicion', loadChildren: './componentes/calculocondicion/calculocondicion.module#CalculocondicionPageModule' },
  { path: 'modalformulariocalidad', loadChildren: './componentes/calculocalidad/modals/modalformulariocalidad/modalformulariocalidad.module#ModalformulariocalidadPageModule' },
  { path: 'modalformulariocondicion', loadChildren: './componentes/calculocondicion/modals/modalformulariocondicion/modalformulariocondicion.module#ModalformulariocondicionPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
