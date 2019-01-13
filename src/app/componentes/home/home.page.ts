import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController, NavParams } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor (
    public navCtrl: NavController,
    public router: Router
  ){}


  /**
   * Funcion de los botones de la seccion del QR
   */
  escanearQRMuestra () {
    this.navCtrl.navigateForward('/controlescalidad');
  }
  ingresarQRMuestra () {
    this.navCtrl.navigateForward('/ingresarqr');
  }


  
  /**
   * Funciones del submenú
   */
  irListadosMuestras () {
    this.navCtrl.navigateForward('/listasmuestras');
  }


}
