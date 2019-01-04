import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ControlescalidadPage } from './controlescalidad.page';

const routes: Routes = [
  {
    path: '',
    component: ControlescalidadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ControlescalidadPage]
})
export class ControlescalidadPageModule {}
