import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { 
    path: 'dashboard', 
    loadChildren: './dashboard/dashboard.module#DashboardPageModule' 
  },
  
];

/**
 * Se copia y pega la misma estructura que el enrutador por defecto
 * el cambio mas significativo es que se cambia de RouterModule.forRoot() a RouterModule.forChild(), debido a que
 * estas rutas son de childRoot
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
