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
import { ActivatedRoute } from '@angular/router';

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

  control:FormGroup;

  regiones: any[];
  productores: any[];
  especies: any[];
  variedades: any[];
  calibres: any[];
  categorias: any[];
  embalajes: any[];
  etiquetas: any[];
  apariencias: any[];
  peso: any[];

  muestra_id:any;
  

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
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public http: Http
  ){

    const fecha_jornada = new Date().toISOString();

    this.control = this.formBuilder.group({
      muestra_qr: ['123456', Validators.required],
      fecha_jornada:[fecha_jornada , Validators.required],
      region_id: ['', Validators.required],
      productor_id: ['1', Validators.required],
      especie_id: ['1', Validators.required],
      variedad_id: ['', Validators.required],
      calibre_id: ['', Validators.required],
      categoria_id: ['', Validators.required],    
      embalaje_id: ['', Validators.required],
      etiqueta_id: ['', Validators.required],
      muestra_peso: ['', Validators.required],
      muestra_bolsas: ['', Validators.required],
      muestra_racimos: ['', Validators.required],
      apariencia_id: ['', Validators.required]

      //calculo_total: [null, Validators.required]
    });

  }

  ngOnInit() {
    this.cargarInformacionInicial();
  }

  cargarInformacionInicial () {


    let self = this;
    this.http.get(`${this.url_base}/getDataControlCalidad`).subscribe( res => { 
      self.regiones = res.json().regiones; 
      self.productores = res.json().productores;
      self.especies = res.json().especies;
      self.variedades = res.json().variedades;
      self.calibres = res.json().calibres;
      self.categorias = res.json().categorias;
      self.embalajes = res.json().embalajes;
      self.etiquetas = res.json().etiquetas;
      self.apariencias = res.json().apariencias;
    });

    this.muestra_id = this.activatedRoute.snapshot.paramMap.get('muestra_id');

    const muestra = this.obtenerMuestra(this.muestra_id)
    //console.log(this.muestra_id);



    //console.log(new Date(Date.now()).toLocaleTimeString());
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
    this.http.post(`${this.url_base}/api/get_muestra_for_app`, {muestra_id:muestra_id}, this.options )
      .subscribe( res => { 
        console.log(res);
    });

  }

  guardarMuestra () {

    //console.log('wena la estas haciendo');

    const control = this.control.value;

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
    this.http.post(`${this.url_base}/api/store_for_app`, control, this.options )
      .subscribe( res => { 
        console.log(res);
    });


    // irCalidadCondicionMenu();
  }

  irCalidadCondicionMenu () {
    this.navCtrl.navigateForward('/calidadcondicionmenu');
  }

  irHome () {
    this.navCtrl.navigateForward('/home');
  }

  public calcularTolerancia () {    
    // this.control.calculo_total = (this.control.region_id + this.control.productor_id + this.control.especie_id + this.control.variedad_id ) / 4;
    // console.log(this.control.calculo_total);

  }


}
