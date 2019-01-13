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
  { path: 'modal-formulario-calidad', loadChildren: './components/calculocalidad/modals/modal-formulario-calidad/modal-formulario-calidad.module#ModalFormularioCalidadPageModule' },
  { path: 'modal-formulario-condicion', loadChildren: './components/calculocondicion/modals/modal-formulario-condicion/modal-formulario-condicion.module#ModalFormularioCondicionPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
