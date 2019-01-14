import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { NavController, LoadingController, AlertController, NavParams } from "@ionic/angular";

//import { Http, Headers, RequestOptions /*Response*/ } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



// API REST.
import { cfsmBackendConfig } from '../../../../servicios/apirest/cfsm-backend-config';
import { authBasicConfig } from '../../../../servicios/authbasic/auth-basic-config';

@Component({
  selector: 'app-modalformulariocondicion',
  templateUrl: './modalformulariocondicion.page.html',
  styleUrls: ['./modalformulariocondicion.page.scss'],
})
export class ModalformulariocondicionPage implements OnInit {

  defecto = {
    defecto: '',
    descripcion: '',
    textoAdicional: '',
    categoria: '',
    nota: '',
  }

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public http: Http
  ) { }


  url_base = authBasicConfig.url_base_qa;
  headers = new Headers(authBasicConfig.headers);
  options = new RequestOptions({ headers: this.headers });

  defectos: any[];

  ngOnInit() {
    this.cargarInformacionInicial();
  }

  cargarInformacionInicial () {


    let self = this;
    this.http.get(`${this.url_base}/getDefectos`).subscribe( res => { self.defectos = res.json().defectos; });
  }


  guardarNotaCondicion () {

  }


  cerrarModal () {
    this.modalCtrl.dismiss();
  }

  volverCalculoCondicion () {
    this.cerrarModal();
  }





}
