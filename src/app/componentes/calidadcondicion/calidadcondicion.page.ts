import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from "@ionic/angular";

import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-calidadcondicion',
  templateUrl: './calidadcondicion.page.html',
  styleUrls: ['./calidadcondicion.page.scss'],
})
export class CalidadcondicionPage implements OnInit {

  servicio: {
    nota_calidad:0,
    nota_condicion:0,
  }

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public http: Http
  ) { }


  irHome () {
    this.navCtrl.navigateForward('/home');
    
  }

  irControlCalidad () {
    this.navCtrl.navigateForward('/controlescalidad');
  }
  

  

  ngOnInit() {
    
  }

}
