import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController, AlertController, NavParams, Platform, ToastController } from "@ionic/angular";

//import { Http, Headers, RequestOptions /*Response*/ } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';



// API REST.
import { cfsmBackendConfig } from '../../servicios/apirest/cfsm-backend-config';
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






    /*

    aqui voy

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

    */

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

        if ( DEBUG ) {
          let toast = this.toastCtrl.create({
            message: 'Muestra cargada',
            duration :1000,
            position: 'bottom'
          });
          toast.then(toast => toast.present());
        }

        //console.log(self.control.controls);
        //console.log(self.control.controls);
        //console.log(self.muestra);

        //console.log(this.control.value.apariencia_id);
    });

  }

  guardarMuestra () {

    //console.log('wena la estas haciendo');

    let control = this.control.value;

    /*
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
    */

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
    console.log(control);
    //return;

    let self = this;
    this.http.post(`${this.url_base}/mobile/muestras/update`, control, this.options )
      .subscribe(
        res => { 
          console.log(res.json().muestra);

          if (res.status == 200) {

            this.muestra = res.json().muestra;


            if ( DEBUG ) {
              let toast = this.toastCtrl.create({
                message: 'Muestra actualizada',
                duration :1000,
                position: 'bottom'
              });
              toast.then(toast => toast.present());
            }


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
