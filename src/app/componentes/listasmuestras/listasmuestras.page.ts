import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from "@ionic/angular";

import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-listasmuestras',
  templateUrl: './listasmuestras.page.html',
  styleUrls: ['./listasmuestras.page.scss'],
})
export class ListasmuestrasPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public http: Http
  ) { }

  ngOnInit() {
  }


  irHome () {
    this.navCtrl.navigateForward('/home');
    
  }

}
