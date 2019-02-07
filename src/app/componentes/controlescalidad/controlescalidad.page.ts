import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController, AlertController, NavParams, Platform, ToastController } from "@ionic/angular";

//import { Http, Headers, RequestOptions /*Response*/ } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { authBasicConfig } from '../../servicios/authbasic/auth-basic-config';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api/api.service';

const DEBUG = true;

@Injectable()
@Component({
  selector: 'app-controlescalidad',
  templateUrl: './controlescalidad.page.html',
  styleUrls: ['./controlescalidad.page.scss'],
})
export class ControlescalidadPage implements OnInit {

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
  
  loading:any;

  private error_messages = {
    'muestra_qr': [
      { type: 'required', message: 'Codigo QR requerido' },
      /*
      { type: 'minlength', message: 'El campo debe ser mayor a 6 caracteres' },
      { type: 'maxlength', message: 'El campo debe ser menor a 50 caracteres' },
      { type: 'pattern', message: 'Ingrese un campo válido' }
      */
    ],
    'muestra_fecha': [
      { type: 'required', message: 'Fecha requerida' },
    ],
    'region_id': [
      { type: 'required', message: 'Región requerida' },
    ],
    'productor_id': [
      { type: 'required', message: 'Productor requerido' },
    ],
    'especie_id': [
      { type: 'required', message: 'Especie requerida' },
    ],
    'variedad_id': [
      { type: 'required', message: 'Variedad requerida' },
    ],
    'calibre_id': [
      { type: 'required', message: 'Calibre requerido' },
    ],
    'categoria_id': [
      { type: 'required', message: 'Categoria requerida' },
    ],
    'embalaje_id': [
      { type: 'required', message: 'Embalaje requerido' },
    ],
    'etiqueta_id': [
      { type: 'required', message: 'Etiqueta requerida' },
    ],
    'muestra_peso': [
      { type: 'required', message: 'Peso requerido' },
    ],
    'muestra_bolsas': [
      { type: 'required', message: 'Bolsas requerido' },
    ],
    'muestra_racimos': [
      { type: 'required', message: 'Racimos requerido' },
    ],
    'muestra_brix': [
      { type: 'required', message: 'Brix requerido' },
    ],
    'muestra_desgrane': [
      { type: 'required', message: 'Desgrane requerido' },
    ],
    'lote_codigo': [
      { type: 'required', message: 'Lote requerido' },
    ],
    'estado_muestra_id': [
      { type: 'required', message: 'Estado requerido' },
    ],
    'apariencia_id': [
      { type: 'required', message: 'Apariencia requerida' },
    ],
  }

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController, 
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private platform: Platform,
    private http: Http
  ){
    const muestra_fecha_por_defecto = new Date().toISOString();
  }

  ngOnInit() {
    this.platform.ready().then( () => {
      this.cargarInformacionInicial(true);
    });
  }

  cargarInformacionInicial (refresh = false, refresher?) {

    //this.presentCargandoControlCalidad();

    this.apiService.obtenerDatosParametricosMuestras(refresh).subscribe(res => {
      //this.loading.dismiss();
      if ( DEBUG ) {
        let toast = this.toastCtrl.create({
          message: 'Carga completa',
          duration :500,
          position: 'top'
        });
        toast.then(toast => toast.present());
        //console.log(res);
      }
      this.regiones = res.regiones; 
      this.productores = res.productores;
      this.especies = res.especies;
      this.variedades = res.variedades;
      this.calibres = res.calibres;
      this.categorias = res.categorias;
      this.embalajes = res.embalajes;
      this.etiquetas = res.etiquetas;
      this.apariencias = res.apariencias;
      this.estados_muestras = res.estados_muestras;
      if (refresher) {
        refresher.target.complete();
      }
    });

    this.muestra_qr = this.activatedRoute.snapshot.paramMap.get('muestra_qr');
    //this.obtenerMuestra(this.muestra_qr);

    this.presentCargandoMuestra();
    this.apiService.obtenerMuestraPorQR(this.muestra_qr).subscribe(res => {
      this.loading.dismiss();

      if (res.length > 1) { //si viene mas de un objeto es por que hay que buscarlo en los datos locales
        this.muestra = res.filter((m) => { return m.muestra_qr == this.muestra_qr;})[0];
      } else {
        this.muestra = res.muestra; 
      } //console.log(res);

      if (!this.muestra) { 
        if ( DEBUG ) {
          let toast = this.toastCtrl.create({
            message: 'No se encontro la muestra',
            duration :500,
            position: 'bottom'
          });
          toast.then(toast => toast.present()); //console.log(res);
           
        }
      } else { //console.log(this.muestra);

        //this.apiService.setLocalData('muestrasTemp', this.muestra);

        this.region_id = this.muestra.region_id;


        this.control = this.formBuilder.group({
          muestra_qr: new FormControl({value: this.muestra.muestra_qr,disabled:true}, Validators.required),
          muestra_fecha: new FormControl({value: this.muestra.muestra_fecha,disabled:true}, Validators.required),
          region_id: new FormControl({value: this.muestra.region_id,disabled:true}, Validators.required),
          productor_id: new FormControl({value: this.muestra.productor_id,disabled:true}, Validators.required),
          especie_id: new FormControl({value: this.muestra.especie_id,disabled:true}, Validators.required),
          variedad_id: new FormControl({value: this.muestra.variedad_id,disabled:true}, Validators.required),
          calibre_id: new FormControl({value: this.muestra.calibre_id,disabled:true}, Validators.required),
          categoria_id: new FormControl({value: this.muestra.categoria_id,disabled:true}, Validators.required), 
          embalaje_id: new FormControl({value: this.muestra.embalaje_id,disabled:true}, Validators.required),
          etiqueta_id: new FormControl({value: this.muestra.etiqueta_id,disabled:true}, Validators.required),
          muestra_peso: new FormControl({value: this.muestra.muestra_peso,disabled:true}, Validators.required),
          muestra_bolsas: new FormControl({value: this.muestra.muestra_bolsas,disabled:true}, Validators.required),
          muestra_racimos: new FormControl({value: this.muestra.muestra_racimos,disabled:true}, Validators.required),
          muestra_brix: new FormControl({value: this.muestra.muestra_brix,disabled:true}, Validators.required),
          muestra_desgrane: new FormControl({value: this.muestra.muestra_desgrane,disabled:true}, Validators.required),
          lote_codigo: new FormControl({value: this.muestra.lote_codigo,disabled:true}, Validators.required),
          estado_muestra_id: new FormControl({value: this.muestra.estado_muestra_id,disabled:true}, Validators.required),
          apariencia_id: new FormControl({value: this.muestra.apariencia_id,disabled:true}, Validators.required)
          //calculo_total: [null, Validators.required]
        });

        this.control.controls["muestra_qr"].setValue(this.muestra.muestra_qr);
        this.control.controls["muestra_fecha"].setValue(this.muestra.muestra_fecha);
        this.control.controls["region_id"].setValue(this.muestra.region_id);
        this.control.controls["productor_id"].setValue(this.muestra.productor_id);
        this.control.controls["especie_id"].setValue(this.muestra.especie_id);
        this.control.controls["variedad_id"].setValue(this.muestra.variedad_id);
        this.control.controls["calibre_id"].setValue(this.muestra.calibre_id);
        this.control.controls["categoria_id"].setValue(this.muestra.categoria_id);
        this.control.controls["embalaje_id"].setValue(this.muestra.embalaje_id);
        this.control.controls["etiqueta_id"].setValue(this.muestra.etiqueta_id);
        this.control.controls["muestra_peso"].setValue(this.muestra.muestra_peso);
        this.control.controls["muestra_bolsas"].setValue(this.muestra.muestra_bolsas);
        this.control.controls["muestra_racimos"].setValue(this.muestra.muestra_racimos);
        this.control.controls["muestra_brix"].setValue(this.muestra.muestra_brix);
        this.control.controls["muestra_desgrane"].setValue(this.muestra.muestra_desgrane);
        this.control.controls["lote_codigo"].setValue(this.muestra.lote_codigo);
        this.control.controls["estado_muestra_id"].setValue(this.muestra.estado_muestra_id);
        this.control.controls["apariencia_id"].setValue(this.muestra.apariencia_id);

        if ( DEBUG ) {
          let toast = this.toastCtrl.create({
            message: 'Muestra cargada',
            duration :1000,
            position: 'bottom'
          });
          toast.then(toast => toast.present());
        }

      }
      


      this.apiService.checkForEvents();

      return;
      


      //console.log(self.control.controls);
      //console.log(self.control.controls);
      //console.log(self.muestra);

      //console.log(this.control.value.apariencia_id);
  });


  }


  guardarMuestra () {
    let control = this.control.value;
    control = Object.assign({muestra_id:this.muestra.muestra_id}, control);
    this.controlJson = control;
    this.apiService.actualizarMuestra(this.controlJson).subscribe(res => {
      this.muestra = this.controlJson;

      if ( DEBUG ) {
        let toast = this.toastCtrl.create({
          message: 'Muestra actualizada',
          duration :1000,
          position: 'bottom'
        });
        toast.then(toast => toast.present());
      }
      //console.log(res);
      this.irCalidadCondicionMenu(this.controlJson);

    });

    return;
    
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

  irListaMuestras () {
    this.navCtrl.navigateForward('/listasmuestras');
  }

  public calcularTolerancia () {    
    // this.control.calculo_total = (this.control.region_id + this.control.productor_id + this.control.especie_id + this.control.variedad_id ) / 4;
    // console.log(this.control.calculo_total);

  }

  private async presentCargandoControlCalidad () { 
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando información del formulario...',
      spinner: 'crescent',
      //duration: 2000
    });
    return await this.loading.present();
  }
  private async presentCargandoMuestra () { 
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando muestra...',
      spinner: 'crescent',
      //duration: 2000
    });
    return await this.loading.present();
  }

}
