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


  
  escanearQRMuestra () {
    this.navCtrl.navigateForward('/controlescalidad');
  }


  guardarContinuar () {
    
  }


}
