import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
//import { ControlescalidadPage } from '../controlescalidad/controlescalidad.page';

const routes = [
  {
    path: '',
    component: HomePage,
    /*children: [
      {
        path: 'controlescalidad',
        component: ControlescalidadPage
      }
    ]*/
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule {}
