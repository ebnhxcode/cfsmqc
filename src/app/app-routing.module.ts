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
    path: 'members', /** Las rutas deben pasar por este path para checkear sesion propia de la app */
    canActivate: [AuthGuardService], /** Middleware */
    loadChildren: './members/member-routing.module#MemberRoutingModule' /** Path del enrutador con sesion */
  },



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
