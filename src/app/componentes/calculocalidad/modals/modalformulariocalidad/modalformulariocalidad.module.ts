import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalformulariocalidadPage } from './modalformulariocalidad.page';

const routes: Routes = [
  {
    path: '',
    component: ModalformulariocalidadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalformulariocalidadPage]
})
export class ModalformulariocalidadPageModule {}
