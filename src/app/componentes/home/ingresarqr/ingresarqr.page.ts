import { Component, OnInit } from '@angular/core';
import { 
  //NavController, 
  LoadingController, 
  AlertController, 
  //NavParams 
} from "@ionic/angular";

//import { Http, Headers, RequestOptions /*Response*/ } from '@angular/http';
import { 
  //Http, 
  Headers, 
  RequestOptions 
} from '@angular/http';

//import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';



// API REST.
//import { cfsmBackendConfig } from '../../servicios/apirest/cfsm-backend-config';
import { authBasicConfig } from '../../../servicios/authbasic/auth-basic-config';

import { ApiService } from '../../../services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresarqr',
  templateUrl: './ingresarqr.page.html',
  styleUrls: ['./ingresarqr.page.scss'],
})
export class IngresarqrPage implements OnInit {

  url_base = authBasicConfig.url_base_qa;
  headers = new Headers(authBasicConfig.headers);
  options = new RequestOptions({ headers: this.headers });

  private loading:any;

  nueva_muestra:FormGroup;

  constructor(
    //public navCtrl: NavController,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    //private http: Http
  ) { 
    this.nueva_muestra = this.formBuilder.group({
      muestra_qr: ['', Validators.required]
    });
  }

  ngOnInit() {
  }



  guardarQRContinuar () {

    const nueva_muestra = this.nueva_muestra.value;

    this.presentCreandoMuestra().then( () => {


      this.apiService.crearMuestra(nueva_muestra, nueva_muestra).subscribe(res => {
        
        this.loading.dismiss();
        // Valida si vienen datos y si variable refresh es falso para obtener 
        // las muestras que estaban suscritas a espera de carga con el servicio de la api
        //if (res.status == 200 && res.nueva_muestra) {
          
          this.router.navigate([`/members/controlescalidad/${nueva_muestra.muestra_qr}`]);
        //}
        //console.log(res);

      });

    });


    /*
    
    const nueva_muestra = this.nueva_muestra.value;

    //console.log(nueva_muestra);
    //return;

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
    this.http.post(`${this.url_base}/mobile/muestras/store`, nueva_muestra, this.options )
      .subscribe( 
        res => { 
          //console.log(res.json().muestra);
          const muestra = res.json().muestra;
          //console.log(muestra);

          this.router.navigate(['controlescalidad', muestra.muestra_qr]);
          this.router.navigate(`/controlescalidad/${muestra.muestra_qr}`);

          //this.navCtrl.navigateForward(`/controlescalidad/${muestra.muestra_qr}`);


        },
        err => {
          //console.log(err);
          this.errorMuestraQR();
        }
      );

      */
  }

  async errorMuestraQR () {
    const alert = await this.alertCtrl.create({
      header: 'Error!',
      subHeader: 'Error QR',
      message: 'Esté código QR ya ha sido ingresado.',
      // message: error.message,
      buttons: ['OK']
    });

    alert.present();
  }

  private async presentCreandoMuestra () { 
    this.loading = await this.loadingCtrl.create({
      message: 'Guardando...',
      spinner: 'crescent',
      //duration: 2000
    });
    return await this.loading.present();
  }

}
