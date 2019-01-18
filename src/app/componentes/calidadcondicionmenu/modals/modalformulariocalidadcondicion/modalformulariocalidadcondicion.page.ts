import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController, AlertController, NavParams } from "@ionic/angular";

//import { Http, Headers, RequestOptions /*Response*/ } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



// API REST.
import { cfsmBackendConfig } from '../../../../servicios/apirest/cfsm-backend-config';
import { authBasicConfig } from '../../../../servicios/authbasic/auth-basic-config';


@Component({
  selector: 'app-modalformulariocalidadcondicion',
  templateUrl: './modalformulariocalidadcondicion.page.html',
  styleUrls: ['./modalformulariocalidadcondicion.page.scss'],
})
export class ModalformulariocalidadcondicionPage implements OnInit {

  defectoForm = {
    grupo_id: null,
    defecto_id: null,
    valor_defecto: null
  }

  codigoConcepto:number = 1;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public http: Http
  ) { }

  url_base = authBasicConfig.url_base_qa;
  headers = new Headers(authBasicConfig.headers);
  options = new RequestOptions({ headers: this.headers });

  defectos: any[];
  grupos: any[];

  ngOnInit() {
    this.cargarInformacionInicial();
  }

  cargarInformacionInicial () {
    let self = this;
    this.http.get(`${this.url_base}/getDefectos`).subscribe( res => { self.defectos = res.json().defectos; });
    this.http.get(`${this.url_base}/getGrupos`).subscribe( res => { self.grupos = res.json().grupos; });
  }

}
