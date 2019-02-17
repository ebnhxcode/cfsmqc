import { 
  Component, 
  OnInit 
} from '@angular/core';
import { 
  //NavController, 
  LoadingController, 
  //AlertController, 
  //NavParams, 
  Platform 
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


  constructor(
    //private navCtrl: NavController,
    //private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController,
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
    const tokens = JSON.parse(localStorage.getItem('tokens'))

    this.headers.append('Authorization', `${tokens.token_type} ${tokens.access_token}`);
    this.headers.append('X-CSRF-TOKEN', tokens.refresh_token);
    this.options = new RequestOptions({ headers: this.headers });
    */

    //console.log(this.options);


    /* NUEVO */
    this.presentCargandoMuestras().then( () => {
      this.apiService.consultarMuestras(refresh).subscribe(res => {
        if (res && res.length > 0 && refresh == false) {
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
    this.router.navigate(['members', `/controlescalidad/${muestra.muestra_qr}`]);
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
