import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalformulariocondicionPage } from './modalformulariocondicion.page';

const routes: Routes = [
  {
    path: '',
    component: ModalformulariocondicionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalformulariocondicionPage]
})
export class ModalformulariocondicionPageModule {}
