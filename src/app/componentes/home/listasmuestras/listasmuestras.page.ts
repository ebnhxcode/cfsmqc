import { 
  Component, 
  OnInit 
} from '@angular/core';
import { 
  //NavController, 
  LoadingController, 
  //AlertController, 
  //NavParams, 
  Platform, 
  ToastController
} from "@ionic/angular";

//import { Http, Headers, RequestOptions /*Response*/ } from '@angular/http';
import { 
  //Http, 
  Headers, 
  RequestOptions 
} from '@angular/http';

//import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';



// API REST.
//import { cfsmBackendConfig } from '../../servicios/apirest/cfsm-backend-config';
import { authPassportConfig } from '../../../servicios/authbasic/auth-passport-config';

import { ApiService } from '../../../services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listasmuestras',
  templateUrl: './listasmuestras.page.html',
  styleUrls: ['./listasmuestras.page.scss'],
})
export class ListasmuestrasPage implements OnInit {

  url_base = authPassportConfig.url_base_qa;
  headers = new Headers(authPassportConfig.headers);
  options = new RequestOptions({ headers: this.headers });

  private loading:any;
  muestras: any[];
  textoBusqueda: any;
  buscando: boolean;
  esPrimeraCarga: boolean=true;


  constructor(
    //private navCtrl: NavController,
    //private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private apiService: ApiService,
    private platform: Platform,
    private router: Router
    //private http: Http
  ) { }

  ngOnInit() {
    this.platform.ready().then( () => {
      this.cargarInformacionInicial(false);
    });
  }






  cargarInformacionInicial (refresh = false, refresher?) {

    /*
    // Sirve para cuando se intenta autenticar y se necesita enviar el token
    const tokens = JSON.parse(localStorage.getItem('tokens'))

    this.headers.append('Authorization', `${tokens.token_type} ${tokens.access_token}`);
    this.headers.append('X-CSRF-TOKEN', tokens.refresh_token);
    this.options = new RequestOptions({ headers: this.headers });
    */

    //console.log(this.options);

    this.esPrimeraCarga = (
      JSON.parse(localStorage.getItem('esPrimeraCarga')) === null
      || JSON.parse(localStorage.getItem('esPrimeraCarga')) === 'true'
    ) ? true:false;
    

    /* NUEVO */
    // Muestra el loader
    this.presentCargandoMuestras().then( () => {

      if (this.esPrimeraCarga) {
        this.loading.dismiss();
        localStorage.setItem('esPrimeraCarga', JSON.stringify('false'));
        return this.cargarInformacionInicial(true);
      }

      
      // Solicita muestras al servicio para que internamente lo resuelva
      this.apiService.consultarMuestras(refresh).subscribe(res => {
        // Valida si vienen datos y si variable refresh es falso para obtener 
        // las muestras que estaban suscritas a espera de carga con el servicio de la api

          if (res && res.length > 0 && refresh == false) {
            console.log('Habian datos en local, cargando esos datos');
            this.loading.dismiss();
            this.muestras = res;
          } else {
            this.apiService.obtenerMuestras(refresh).subscribe(res => {  
              this.loading.dismiss();
              this.muestras = res;
              if (refresher) {
                refresher.target.complete();
              }
            });
          }

      });
    });






    /* /NUEVO */


    /*
    const tokens = JSON.parse(localStorage.getItem('tokens'))

    let headers = new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json',
      'withCredentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `${tokens.token_type} ${tokens.access_token}`,
      'X-CSRF-TOKEN': `${tokens.access_token}`
    });

    this.options = new RequestOptions({ headers: this.headers });



    let self = this;
    this.http.get(`${this.url_base}/mobile/muestras`, this.options ).subscribe( res => { 
      self.muestras = res.json().muestras; 
    });
    */
    
  }




  filtrarMuestras(ev: any):void{
    this.buscando = true;
    setTimeout(()=>{
      //console.log(ev.target.value);
      //this.muestras = [];
      //this.cargarInformacionInicial(false);
      this.muestras = this.muestras.filter((muestra) => {
        return (
          muestra.muestra_nombre.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1 ||
          muestra.apariencia.apariencia_nombre.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1 ||
          muestra.muestra_qr.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1
        );
      });
      this.buscando = false;
    },2500);
  }

  eliminarMuestra (muestra) {
    this.apiService.eliminarMuestra(muestra).subscribe(res => {
      this.muestras.splice(this.muestras.indexOf(muestra), 1);
    });
  }


  anularMuestra (muestra) {
    this.apiService.anularMuestra(muestra).subscribe(res => {
      this.muestras.splice(this.muestras.indexOf(muestra), 1);
    });
  }


  irHome () {
    this.router.navigate(['members', 'home']);
    /*
    this.navCtrl.navigateForward('/home');
    */
    
  }

  irEditarMuestra (muestra) {
    /**
     * Le mando el QR por que aprobecho de usar esa misma opcion cuando se escanea la muestra
     */
    //console.log(muestra);
    if (!muestra.muestra_qr) {
      let toast = this.toastCtrl.create({
        message: `El código QR no ha sido ingresado, debe completar antes de continuar`,
        duration :1500,
        position: 'middle'
      });
      toast.then(toast => toast.present());  
      return this.router.navigate([`/members/actualizarqr/${muestra.muestra_id}`]);
    } else {
      return this.router.navigate([`/members/controlescalidad/${muestra.muestra_qr}`]);
    }
    

    /*
    this.navCtrl.navigateForward(`/controlescalidad/${muestra.muestra_qr}`);
    */
    
  }

  private async presentCargandoMuestras () { 
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'crescent',
      //duration: 2000
    });
    return await this.loading.present();
  }



}
