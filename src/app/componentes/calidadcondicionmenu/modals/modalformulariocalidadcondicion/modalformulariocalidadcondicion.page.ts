import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController, AlertController, ModalController, NavParams } from "@ionic/angular";

//import { Http, Headers, RequestOptions /*Response*/ } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// API REST.
import { cfsmBackendConfig } from '../../../../servicios/apirest/cfsm-backend-config';
import { authBasicConfig } from '../../../../servicios/authbasic/auth-basic-config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modalformulariocalidadcondicion',
  templateUrl: './modalformulariocalidadcondicion.page.html',
  styleUrls: ['./modalformulariocalidadcondicion.page.scss'],
})
export class ModalformulariocalidadcondicionPage implements OnInit {

  /*
  defectoForm = {
    grupo_id: null,
    defecto_id: null,
    muestra_id: null,
    valor_defecto: null
  }
  */

  codigoConcepto:number = 1;
  nombreConcepto:string = "";
  muestra_id:string = "";


  defectoForm = new FormGroup({
    'muestra_id': new FormControl(),
    'grupo_id': new FormControl(),
    'defecto_id': new FormControl(),
    'valor_defecto': new FormControl()
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
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
    // Paramétricos
    let self = this;
    this.http.get(`${this.url_base}/getDefectos`).subscribe( res => { self.defectos = res.json().defectos; });
    this.http.get(`${this.url_base}/getGrupos`).subscribe( res => { self.grupos = res.json().grupos; });

    //console.log([self.defectos,self.grupos]);

    // Params
    this.codigoConcepto = this.navParams.get('concepto_id');
    this.nombreConcepto = this.navParams.get('concepto_nombre');
    this.muestra_id = this.navParams.get('muestra_id');


    self.defectoForm = self.formBuilder.group({
      muestra_id: new FormControl({value: self.muestra_id,disabled:false}, Validators.required),
      grupo_id: new FormControl({value: null,disabled:false}, Validators.required),
      defecto_id: new FormControl({value: null,disabled:false}, Validators.required),
      valor_defecto: new FormControl({value: null,disabled:false}, Validators.required),
    });





  }

  guardarDefecto () {


    let defectoForm = this.defectoForm.value;

    const tokens = JSON.parse(localStorage.getItem('tokens'))
    let headers = new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json',
      'withCredentials': 'true',
      'Access-Control-Allow-Origin': '*',
      //'Authorization': `${tokens.token_type} ${tokens.access_token}`,
      //'X-CSRF-TOKEN': `${tokens.access_token}`
    });

    this.options = new RequestOptions({ headers: this.headers });

    //console.log(control);
    //return;

    let self = this;
    this.http.post(`${this.url_base}/mobile/defectos/store`, defectoForm, this.options )
      .subscribe(
        res => { 
          console.log(res);

          if (res.status == 200) {
            this.cerrarModal();
          }
        },
        err => {
          console.log(err);
        }
      );


  }


  cerrarModal () {
    this.modalCtrl.dismiss();
  }

  volverCalculoCondicion () {
    this.cerrarModal();
  }

}
