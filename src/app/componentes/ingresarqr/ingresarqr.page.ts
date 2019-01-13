import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from "@ionic/angular";

import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-ingresarqr',
  templateUrl: './ingresarqr.page.html',
  styleUrls: ['./ingresarqr.page.scss'],
})
export class IngresarqrPage implements OnInit {

  ingreso = {
    codigo: "",
  };

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public http: Http
  ) { }

  ngOnInit() {
  }

  guardarContinuar () {
    this.navCtrl.navigateForward('/controlescalidad');
  }

}
