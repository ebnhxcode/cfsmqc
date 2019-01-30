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
    'muestra_fecha': new FormControl(),
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
    'muestra_brix': new FormControl(),
    'muestra_desgrane': new FormControl(),
    'lote_codigo': new FormControl(),
    'estado_muestra_id': new FormControl(),
    'apariencia_id': new FormControl()
  });

  controlJson = {
    'muestra_qr':null,
    'muestra_fecha':null,
    'region_id':null,
    'productor_id':null,
    'especie_id':null,
    'variedad_id':null,
    'calibre_id':null,
    'categoria_id':null,
    'embalaje_id':null,
    'etiqueta_id':null,
    'muestra_peso':null,
    'muestra_bolsas':null,
    'muestra_racimos':null,
    'muestra_brix':null,
    'muestra_desgrane':null,
    'lote_codigo':null,
    'estado_muestra_id':null,
    'apariencia_id':null
  };


  regiones: any[];
  productores: any[];
  especies: any[];
  variedades: any[];
  calibres: any[];
  categorias: any[];
  embalajes: any[];
  etiquetas: any[];
  apariencias: any[];
  estados_muestras: any[];
  peso: any[];

  region_id:any=null;
  muestra_id:any=null;
  muestra_qr:any=null;
  muestra:any={};
  

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

    const muestra_fecha_por_defecto = new Date().toISOString();



  }

  ngOnInit() {
    this.cargarInformacionInicial();
  }

  cargarInformacionInicial () {


    let self = this;
    this.http.get(`${this.url_base}/mobile/getDataControlCalidad`).subscribe( res => { 
      self.regiones = res.json().regiones; 
      self.productores = res.json().productores;
      self.especies = res.json().especies;
      self.variedades = res.json().variedades;
      self.calibres = res.json().calibres;
      self.categorias = res.json().categorias;
      self.embalajes = res.json().embalajes;
      self.etiquetas = res.json().etiquetas;
      self.apariencias = res.json().apariencias;
      self.estados_muestras = res.json().estados_muestras;
    });

    this.muestra_qr = this.activatedRoute.snapshot.paramMap.get('muestra_qr');

    this.obtenerMuestra(this.muestra_qr);
    // Carga la muestra con el id que viene 

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

  obtenerMuestra (muestra_qr) {
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
    this.http.post(`${this.url_base}/mobile/muestras/showByQR`, {muestra_qr:muestra_qr}, this.options )
      .subscribe( res => { 
        //console.log(res);
        self.muestra = res.json().muestra; 

        self.region_id = self.muestra.region_id;
        //console.log(self.muestra);



        self.control = self.formBuilder.group({
          muestra_qr: new FormControl({value: self.muestra.muestra_qr,disabled:true}, Validators.required),
          muestra_fecha: new FormControl({value: self.muestra.muestra_fecha,disabled:true}, Validators.required),
          region_id: new FormControl({value: self.muestra.region_id,disabled:true}, Validators.required),
          productor_id: new FormControl({value: self.muestra.productor_id,disabled:true}, Validators.required),
          especie_id: new FormControl({value: self.muestra.especie_id,disabled:true}, Validators.required),
          variedad_id: new FormControl({value: self.muestra.variedad_id,disabled:true}, Validators.required),
          calibre_id: new FormControl({value: self.muestra.calibre_id,disabled:true}, Validators.required),
          categoria_id: new FormControl({value: self.muestra.categoria_id,disabled:true}, Validators.required), 
          embalaje_id: new FormControl({value: self.muestra.embalaje_id,disabled:true}, Validators.required),
          etiqueta_id: new FormControl({value: self.muestra.etiqueta_id,disabled:true}, Validators.required),
          muestra_peso: new FormControl({value: self.muestra.muestra_peso,disabled:true}, Validators.required),
          muestra_bolsas: new FormControl({value: self.muestra.muestra_bolsas,disabled:true}, Validators.required),
          muestra_racimos: new FormControl({value: self.muestra.muestra_racimos,disabled:true}, Validators.required),
          muestra_brix: new FormControl({value: self.muestra.muestra_brix,disabled:true}, Validators.required),
          muestra_desgrane: new FormControl({value: self.muestra.muestra_desgrane,disabled:true}, Validators.required),
          lote_codigo: new FormControl({value: self.muestra.lote_codigo,disabled:true}, Validators.required),
          estado_muestra_id: new FormControl({value: self.muestra.estado_muestra_id,disabled:true}, Validators.required),
          apariencia_id: new FormControl({value: self.muestra.apariencia_id,disabled:true}, Validators.required)
          //calculo_total: [null, Validators.required]
        });

        self.control.controls["muestra_qr"].setValue(self.muestra.muestra_qr);
        self.control.controls["muestra_fecha"].setValue(self.muestra.muestra_fecha);
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
        self.control.controls["muestra_brix"].setValue(self.muestra.muestra_brix);
        self.control.controls["muestra_desgrane"].setValue(self.muestra.muestra_desgrane);
        self.control.controls["lote_codigo"].setValue(self.muestra.lote_codigo);
        self.control.controls["estado_muestra_id"].setValue(self.muestra.estado_muestra_id);
        self.control.controls["apariencia_id"].setValue(self.muestra.apariencia_id);

        //console.log(self.control.controls);
        //console.log(self.control.controls);
        //console.log(self.muestra);

        //console.log(this.control.value.apariencia_id);
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

    this.controlJson = control;

    console.log(control);
    //return;

    let self = this;
    this.http.post(`${this.url_base}/mobile/muestras/update`, control, this.options )
      .subscribe(
        res => { 
          console.log(res.json().muestra);

          if (res.status == 200) {

            this.muestra = res.json().muestra;

            this.irCalidadCondicionMenu(this.muestra);
          }
        },
        err => {
          console.log(err);
        }
      );


    
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

  irCalidadCondicionMenu (muestra) {
    this.navCtrl.navigateForward(`/calidadcondicionmenu/${muestra.muestra_id}`);
  }

  irHome () {
    this.navCtrl.navigateForward('/home');
  }

  public calcularTolerancia () {    
    // this.control.calculo_total = (this.control.region_id + this.control.productor_id + this.control.especie_id + this.control.variedad_id ) / 4;
    // console.log(this.control.calculo_total);

  }


}
