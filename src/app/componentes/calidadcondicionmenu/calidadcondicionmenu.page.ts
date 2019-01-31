import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController, AlertController, ModalController, NavParams } from "@ionic/angular";

import { Http, Headers, RequestOptions } from '@angular/http';

import { ModalformulariocalidadcondicionPage } from './modals/modalformulariocalidadcondicion/modalformulariocalidadcondicion.page';
import { ActivatedRoute } from '@angular/router';

  // API REST.
  import { cfsmBackendConfig } from '../../servicios/apirest/cfsm-backend-config';
  import { authBasicConfig } from '../../servicios/authbasic/auth-basic-config';

@Component({
  selector: 'app-calidadcondicion',
  templateUrl: './calidadcondicionmenu.page.html',
  styleUrls: ['./calidadcondicionmenu.page.scss'],
})
export class CalidadcondicionmenuPage implements OnInit {

  url_base = authBasicConfig.url_base_qa;
  headers = new Headers(authBasicConfig.headers);
  options = new RequestOptions({ headers: this.headers });

  servicio: {
    nota_calidad:0,
    nota_condicion:0,
  }
  muestra_id:any='';
  muestra:any={};

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public activatedRoute: ActivatedRoute,
    public http: Http
  ) {
    this.muestra_id = this.activatedRoute.snapshot.paramMap.get('muestra_id');
  }

  ngOnInit() {
    this.cargarInformacionInicial();
  }

  cargarInformacionInicial () {


    this.obtenerMuestra(this.muestra_id);
    this.obtenerCalificacionMuestra(this.muestra_id);
    // Carga la muestra con el id que viene 

    //console.log(this.muestra_id);
    //console.log(new Date(Date.now()).toLocaleTimeString());
  }

  obtenerCalificacionMuestra (muestra_id) {
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

    let self = this;
    this.http.post(`${this.url_base}/mobile/obtenerCalificacionMuestra`, {muestra_id:muestra_id}, this.options )
      .subscribe( res => { 
        //console.log(res);
        //self.muestra = res.json().muestra; 
        console.log(res.json());

        //console.log(self.muestra);




    });
  }

  obtenerMuestra (muestra_id) {
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

    let self = this;
    this.http.post(`${this.url_base}/mobile/muestras/show`, {muestra_id:muestra_id}, this.options )
      .subscribe( res => { 
        //console.log(res);
        self.muestra = res.json().muestra; 

        //console.log(self.muestra);




    });

  }

  irHome () {
    this.navCtrl.navigateForward('/home'); 
  }

  irControlCalidad (muestra_id) {
    this.navCtrl.navigateForward(`/controlescalidad/${this.muestra.muestra_qr}`);
  }

  irCalculoCondicion (muestra_id) {
    this.navCtrl.navigateForward(`/calculocondicion/${muestra_id}`);
  }

  irCalculoCalidad (muestra_id) {
    this.navCtrl.navigateForward(`/calculocalidad/${muestra_id}`);
  }

  async abrirModalFormularioCalidadCondicion (concepto_id, concepto_nombre, muestra_id) {
    const modal = await this.modalCtrl.create({
      component: ModalformulariocalidadcondicionPage,
      componentProps: {
        concepto_id: concepto_id,
        concepto_nombre: concepto_nombre,
        muestra_id: muestra_id,
      }
    });
    modal.present();
  }
  



}
