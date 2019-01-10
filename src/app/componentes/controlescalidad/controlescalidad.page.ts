import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from "@ionic/angular";

//import { Http, Headers, RequestOptions /*Response*/ } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



// API REST.
import { cfsmBackendConfig } from '../../servicios/apirest/cfsm-backend-config';
import { authBasicConfig } from '../../servicios/authbasic/auth-basic-config';

@Injectable()
@Component({
  selector: 'app-controlescalidad',
  templateUrl: './controlescalidad.page.html',
  styleUrls: ['./controlescalidad.page.scss'],
})
export class ControlescalidadPage implements OnInit {

  url_base = authBasicConfig.url_base_qa;
  headers = new Headers(authBasicConfig.headers);
  options = new RequestOptions({ headers: this.headers });

  control = {
    region_id:null,
    productor_id:null,
    especie_id:null,
    variedad_id:null,
    calibre:null,
    categoria_id:null,
    embalaje_id:null,
    etiqueta_id:null,
    peso:null,
    calculo_total:null,
  }

  regiones: any[];
  productores: any[];
  especies: any[];
  variedades: any[];
  calibres: any[];
  categorias: any[];
  embalajes: any[];
  etiquetas: any[];
  peso: any[];
  

  /*
  alerts = {
		error_formulario_incompleto:this.alertCtrl.create({
			header:'Error!',
			subHeader:'Formulario incompleto',
			buttons:['Aceptar'] 					
		}),
  };
  
	loaders = {
		loading:this.loadingCtrl.create({content:'Un momento porfavor...'}),
		error:this.loadingCtrl.create({content:'Usuario y/o contraseña invalida, un momento por favor...'}),
		success:this.loadingCtrl.create({content:'Un momento porfavor...'}),
  };
  */

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public http: Http
  ){}

  ngOnInit() {
    this.cargarInformacionInicial();
  }

  cargarInformacionInicial () {


    let self = this;
    this.http.get(`${this.url_base}/getRegiones`).subscribe( res => { self.regiones = res.json().regiones; });
    this.http.get(`${this.url_base}/getProductores`).subscribe( res => { self.productores = res.json().productores; });
    this.http.get(`${this.url_base}/getEspecies`).subscribe( res => { self.especies = res.json().especies; });
    this.http.get(`${this.url_base}/getVariedades`).subscribe( res => { self.variedades = res.json().variedades; });
    this.http.get(`${this.url_base}/getCalibres`).subscribe( res => { self.calibres = res.json().calibres; });
    this.http.get(`${this.url_base}/getCategorias`).subscribe( res => { self.categorias = res.json().categorias; });
    this.http.get(`${this.url_base}/getEmbalajes`).subscribe( res => { self.embalajes = res.json().embalajes; });
    this.http.get(`${this.url_base}/getEtiquetas`).subscribe( res => { self.etiquetas = res.json().etiquetas; });

  }
  
  /*
  async alertar (header, subHeader, message) {
    const alert = await this.alertCtrl.create({
      header:header,
      subHeader:subHeader,
      message:message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  */

  guardarContinuar() {
    this.navCtrl.navigateForward('/calidadcondicion');
  }

  irHome () {
    this.navCtrl.navigateForward('/home');
  }

  public calcularTolerancia () {    
    // this.control.calculo_total = (this.control.region_id + this.control.productor_id + this.control.especie_id + this.control.variedad_id ) / 4;
    // console.log(this.control.calculo_total);

  }


}
