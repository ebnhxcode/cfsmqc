import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from "@ionic/angular";

//import { Http, Headers, RequestOptions /*Response*/ } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



// API REST.
import { cfsmBackendConfig } from '../../servicios/apirest/cfsm-backend-config';
import { authPassportConfig } from '../../servicios/authbasic/auth-passport-config';

@Component({
  selector: 'app-listasmuestras',
  templateUrl: './listasmuestras.page.html',
  styleUrls: ['./listasmuestras.page.scss'],
})
export class ListasmuestrasPage implements OnInit {

  url_base = authPassportConfig.url_base_qa;
  headers = new Headers(authPassportConfig.headers);
  options = new RequestOptions({ headers: this.headers });

  muestras: any[];


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public http: Http
  ) { }

  ngOnInit() {
    this.cargarInformacionInicial();
  }


  cargarInformacionInicial () {

    /*
    const tokens = JSON.parse(localStorage.getItem('tokens'))

    this.headers.append('Authorization', `${tokens.token_type} ${tokens.access_token}`);
    this.headers.append('X-CSRF-TOKEN', tokens.refresh_token);
    this.options = new RequestOptions({ headers: this.headers });
    */

    //console.log(this.options);

    const tokens = JSON.parse(localStorage.getItem('tokens'))

    let headers = new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json',
      'withCredentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `${tokens.token_type} ${tokens.access_token}`,
      'X-CSRF-TOKEN': `${tokens.access_token}`
    });

    this.options = new RequestOptions({ headers: this.headers });



    let self = this;
    this.http.get(`${this.url_base}/api/muestras/index_for_app`, this.options ).subscribe( res => { 
      self.muestras = res.json().muestras; 
    });

    
  }



  irHome () {
    this.navCtrl.navigateForward('/home');
    
  }




}
