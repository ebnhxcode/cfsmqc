import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalFormularioCondicionPage } from './modal-formulario-condicion.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFormularioCondicionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalFormularioCondicionPage]
})
export class ModalFormularioCondicionPageModule {}
