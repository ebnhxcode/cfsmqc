import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalformulariocalidadcondicionPage } from './modalformulariocalidadcondicion.page';

const routes: Routes = [
  {
    path: '',
    component: ModalformulariocalidadcondicionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalformulariocalidadcondicionPage]
})
export class ModalformulariocalidadcondicionPageModule {}
