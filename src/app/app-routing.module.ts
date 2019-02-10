import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/authentication/auth-guard.service';

const routes: Routes = [
  /**
   * Default route redirect
   */
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  /**
   * Public routes, for login and register
   */
  { 
    path: 'login', 
    loadChildren: './public/login/login.module#LoginPageModule' 
  },
  { 
    path: 'registro',
    loadChildren: './public/registro/registro.module#RegistroPageModule' 
  },

  /**
   * Prueba para el login con ionic
   */
  {
    path: 'members',
    //canActivate: [AuthGuardService],
    loadChildren: './members/member-routing.module#MemberRoutingModule'
  },



  /**
   * Authenticated user|member routes for root or main routes
   */
  { 
    path: 'mantenedor', 
    loadChildren: './componentes/mantenedor/mantenedor.module#MantenedorPageModule' 
  },
  { 
    path: 'home',
    loadChildren: './componentes/home/home.module#HomePageModule' 
  },
  { 
    path: 'home/:?scan',
    loadChildren: './componentes/home/home.module#HomePageModule' 
  },
  { 
    path: 'autoayuda',
    loadChildren: './componentes/autoayuda/autoayuda.module#AutoayudaPageModule' 
  },
  { 
    path: 'reportes',
    loadChildren: './componentes/reportes/reportes.module#ReportesPageModule' 
  },
  { 
    path: 'opciones',
    loadChildren: './componentes/opciones/opciones.module#OpcionesPageModule' 
  },



  /**
  * Specific routes for module system based, in this case QC of proof
  */
  { 
    path: 'ingresarqr',
    loadChildren: './componentes/home/ingresarqr/ingresarqr.module#IngresarqrPageModule' 
  },
  { 
    path: 'listasmuestras',
    loadChildren: './componentes/home/listasmuestras/listasmuestras.module#ListasmuestrasPageModule' 
  },
  { 
    path: 'controlescalidad/:muestra_qr',
    loadChildren: './componentes/home/listasmuestras/controlescalidad/controlescalidad.module#ControlescalidadPageModule' 
  },
  { 
    path: 'calidadcondicionmenu/:muestra_id',
    loadChildren: './componentes/home/listasmuestras/controlescalidad/calidadcondicionmenu/calidadcondicionmenu.module#CalidadcondicionmenuPageModule' 
  },
  { 
    path: 'modalformulariocalidadcondicion', 
    loadChildren: './componentes/home/listasmuestras/controlescalidad/calidadcondicionmenu/modals/modalformulariocalidadcondicion/modalformulariocalidadcondicion.module#ModalformulariocalidadcondicionPageModule' 
  },

  { 
    path: 'calculocalidad/:muestra_id',
    loadChildren: './componentes/home/listasmuestras/controlescalidad/calidadcondicionmenu/calculocalidad/calculocalidad.module#CalculocalidadPageModule' 
  },
  { 
    path: 'modalformulariocalidad', 
    loadChildren: './componentes/home/listasmuestras/controlescalidad/calidadcondicionmenu/calculocalidad/modals/modalformulariocalidad/modalformulariocalidad.module#ModalformulariocalidadPageModule' 
  },
  { 
    path: 'calculocondicion/:muestra_id',
    loadChildren: './componentes/home/listasmuestras/controlescalidad/calidadcondicionmenu/calculocondicion/calculocondicion.module#CalculocondicionPageModule' 
  },
  { 
    path: 'modalformulariocondicion', 
    loadChildren: './componentes/home/listasmuestras/controlescalidad/calidadcondicionmenu/calculocondicion/modals/modalformulariocondicion/modalformulariocondicion.module#ModalformulariocondicionPageModule' 
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
