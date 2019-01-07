import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController, NavParams } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  control = {
    region_id:'',
    productor_id:'',
    especie_id:'',
    variedad_id:'',
    calibre:'',
    categoria_id:'',
    embalaje_id:'',
    etiqueta_id:'',
    peso:'',
  }

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
