import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController, AlertController, NavParams } from "@ionic/angular";

//import { Http, Headers, RequestOptions /*Response*/ } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';



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

  control = new FormGroup({
    'muestra_qr': new FormControl(),
    'fecha_jornada': new FormControl(),
    'region_id': new FormControl(),
    'productor_id': new FormControl(),
    'especie_id': new FormControl(),
    'variedad_id': new FormControl(),
    'calibre_id': new FormControl(),
    'categoria_id': new FormControl(),
    'embalaje_id': new FormControl(),
    'etiqueta_id': new FormControl(),
    'muestra_peso': new FormControl(),
    'muestra_bolsas': new FormControl(),
    'muestra_racimos': new FormControl(),
    'apariencia_id': new FormControl()
  });

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
  muestra:any;
  

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

    //const fecha_jornada = new Date().toISOString();



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

    // this.muestra = 
    this.obtenerMuestra(this.muestra_id);
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
        //console.log(res);
        self.muestra = res.json().muestra; 



      self.control = self.formBuilder.group({
        muestra_qr: new FormControl(self.muestra.muestra_qr, Validators.required),
        fecha_jornada: new FormControl(self.muestra.muestra_fecha, Validators.required),
        region_id: new FormControl(self.muestra.region_id, Validators.required),
        productor_id: new FormControl(self.muestra.productor_id, Validators.required),
        especie_id: new FormControl(self.muestra.especie_id, Validators.required),
        variedad_id: new FormControl(self.muestra.variedad_id, Validators.required),
        calibre_id: new FormControl(self.muestra.calibre_id, Validators.required),
        categoria_id: new FormControl(self.muestra.categoria_id, Validators.required), 
        embalaje_id: new FormControl(self.muestra.embalaje_id, Validators.required),
        etiqueta_id: new FormControl(self.muestra.etiqueta_id, Validators.required),
        muestra_peso: new FormControl(self.muestra.muestra_peso, Validators.required),
        muestra_bolsas: new FormControl(self.muestra.muestra_bolsas, Validators.required),
        muestra_racimos: new FormControl(self.muestra.muestra_racimos, Validators.required),
        apariencia_id: new FormControl(self.muestra.apariencia_id, Validators.required)
        //calculo_total: [null, Validators.required]
      });

        self.control.controls["muestra_qr"].setValue(self.muestra.muestra_qr);
        self.control.controls["fecha_jornada"].setValue(self.muestra.muestra_fecha);
        self.control.controls["region_id"].setValue(self.muestra.region_id);
        self.control.controls["productor_id"].setValue(self.muestra.productor_id);
        self.control.controls["especie_id"].setValue(self.muestra.especie_id);
        self.control.controls["variedad_id"].setValue(self.muestra.variedad_id);
        self.control.controls["calibre_id"].setValue(self.muestra.calibre_id);
        self.control.controls["categoria_id"].setValue(self.muestra.categoria_id);
        self.control.controls["embalaje_id"].setValue(self.muestra.embalaje_id);
        self.control.controls["etiqueta_id"].setValue(self.muestra.etiqueta_id);
        self.control.controls["muestra_peso"].setValue(self.muestra.muestra_peso);
        self.control.controls["muestra_bolsas"].setValue(self.muestra.muestra_bolsas);
        self.control.controls["muestra_racimos"].setValue(self.muestra.muestra_racimos);
        self.control.controls["apariencia_id"].setValue(self.muestra.apariencia_id);

        //console.log(self.control.controls);
        //console.log(self.control.controls);
        //console.log(self.muestra);

        //console.log(self.muestra);
    });

  }

  guardarMuestra () {

    //console.log('wena la estas haciendo');

    let control = this.control.value;

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
    control = Object.assign({muestra_id:this.muestra.muestra_id}, control);


    //console.log(control);
    //return;

    let self = this;
    this.http.post(`${this.url_base}/api/update_for_app`, control, this.options )
      .subscribe(
        res => { 
          console.log(res);




        },
        err => {
          console.log(err);
        }
      );


    // irCalidadCondicionMenu();
  }

  async errorMuestraId () {
    const alert = await this.alertCtrl.create({
      header: 'Error!',
      subHeader: 'Error Muestra',
      message: 'El Id de la Muestra va Vacío',
      // message: error.message,
      buttons: ['OK']
    });

    alert.present();
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
