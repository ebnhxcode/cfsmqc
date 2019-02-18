import { Component, OnInit } from '@angular/core';
import { 
  //NavController, 
  LoadingController, 
  AlertController, 
  //NavParams 
} from "@ionic/angular";

import { 
  Http, 
  Headers, 
  RequestOptions 
} from '@angular/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';



// API REST.
//import { cfsmBackendConfig } from '../../servicios/apirest/cfsm-backend-config';
import { authBasicConfig } from '../../../../servicios/authbasic/auth-basic-config';
import { Router } from '@angular/router';



@Component({
  selector: 'app-actualizarqr',
  templateUrl: './actualizarqr.page.html',
  styleUrls: ['./actualizarqr.page.scss'],
})
export class ActualizarqrPage implements OnInit {

  url_base = authBasicConfig.url_base_qa;
  headers = new Headers(authBasicConfig.headers);
  options = new RequestOptions({ headers: this.headers });

  actualizar_muestra:FormGroup;

  constructor(
    private alertCtrl: AlertController, 
    //private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: Http
  ) {
    this.actualizar_muestra = this.formBuilder.group({
      muestra_qr: ['', Validators.required]
    });
   }

  ngOnInit() {

  }


  guardarQRContinuar () {


    
    const actualizar_muestra = this.actualizar_muestra.value;

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

          //this.navCtrl.navigateForward(`/controlescalidad/${muestra.muestra_qr}`);


        },
        err => {
          //console.log(err);
          this.errorMuestraQR();
        }
      );
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

}
