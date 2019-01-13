import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListasmuestrasPage } from './listasmuestras.page';

const routes: Routes = [
  {
    path: '',
    component: ListasmuestrasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListasmuestrasPage]
})
export class ListasmuestrasPageModule {}
