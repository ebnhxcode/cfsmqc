import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from "@ionic/angular";

//import { Http, Headers, RequestOptions /*Response*/ } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';



// API REST.
import { cfsmBackendConfig } from '../../servicios/apirest/cfsm-backend-config';
import { authBasicConfig } from '../../servicios/authbasic/auth-basic-config';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-ingresarqr',
  templateUrl: './ingresarqr.page.html',
  styleUrls: ['./ingresarqr.page.scss'],
})
export class IngresarqrPage implements OnInit {

  url_base = authBasicConfig.url_base_qa;
  headers = new Headers(authBasicConfig.headers);
  options = new RequestOptions({ headers: this.headers });

  nueva_muestra:FormGroup;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public http: Http
  ) { 
    this.nueva_muestra = this.formBuilder.group({
      muestra_qr: ['', Validators.required]
    });
  }

  ngOnInit() {
  }



  guardarQRContinuar () {


    
    const nueva_muestra = this.nueva_muestra.value;

    //console.log(nueva_muestra);
    //return;

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
    this.http.post(`${this.url_base}/api/store_for_app`, nueva_muestra, this.options )
      .subscribe( 
        res => { 
          //console.log(res.json().muestra);
          const muestra = res.json().muestra;
          this.navCtrl.navigateForward(`/controlescalidad/${muestra.muestra_id}`);


        },
        err => {
          //console.log(err);
          this.errorMuestraQR();
        }
      );
  }

  async errorMuestraQR () {
    const alert = await this.alertCtrl.create({
      header: 'Error!',
      subHeader: 'Error QR',
      message: 'Esté código QR ya ha sido ingresado.',
      // message: error.message,
      buttons: ['OK']
    });

    alert.present();
  }

}
