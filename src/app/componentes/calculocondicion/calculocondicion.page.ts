import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController, AlertController, NavParams } from "@ionic/angular";

import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-calculocondicion',
  templateUrl: './calculocondicion.page.html',
  styleUrls: ['./calculocondicion.page.scss'],
})
export class CalculocondicionPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public http: Http
  ) { }

  ngOnInit() {
  }

  irCalidadCondicionMenu () {
    this.navCtrl.navigateForward('/calidadcondicionmenu');
  }
  irHome () {
    this.navCtrl.navigateForward('/home'); 
  }

}
