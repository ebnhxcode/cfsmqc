import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalFormularioCalidadPage } from './modal-formulario-calidad.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFormularioCalidadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalFormularioCalidadPage]
})
export class ModalFormularioCalidadPageModule {}
