import { Component, OnInit } from '@angular/core';
import { 
  //NavController, 
  LoadingController, 
  AlertController,
  Platform,
  ToastController, 
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
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

const DEBUG = true;

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
  muestra_id:any;
  muestra:any;

  constructor(
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController,
    //private loadingCtrl: LoadingController,
    private platform: Platform,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private http: Http
  ) {

    this.actualizar_muestra = this.formBuilder.group({
      muestra_qr: ['', Validators.required]
    });

    this.muestra_id = this.activatedRoute.snapshot.paramMap.get('muestra_id');

   }

  ngOnInit() {
    this.platform.ready().then( () => {
      this.cargarInformacionInicial(true);
    });
  }

  cargarInformacionInicial(refresh = false) {

    this.muestra_id = this.activatedRoute.snapshot.paramMap.get('muestra_id');

    this.apiService.obtenerMuestraPorID(this.muestra_id).subscribe(res => {

      if (res.length > 1) { //si viene mas de un objeto es por que hay que buscarlo en los datos locales
        this.muestra = res.filter((m) => { return m.muestra_id == this.muestra_id;})[0];
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
      }    
      //this.apiService.checkForEvents();

      return;
      

  });



  }

  guardarQRContinuar () {
    
    var actualizar_muestra = this.actualizar_muestra.value;
    actualizar_muestra = Object.assign({muestra_id:this.muestra.muestra_id}, actualizar_muestra);
    this.apiService.actualizarSoloQRMuestra(actualizar_muestra).subscribe(res => {

      if (res.status = 200) {

        this.muestra = res.muestra;

        if ( DEBUG ) {
          let toast = this.toastCtrl.create({
            message: 'Muestra actualizada',
            duration :1000,
            position: 'bottom'
          });
          toast.then(toast => toast.present());
        }
        //console.log(res);
      }

      this.muestra.muestra_qr = actualizar_muestra.muestra_qr; // para offline
      this.irControlesCalidad(this.muestra);  

    });

    return;


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
    this.http.post(`${this.url_base}/mobile/muestras/update`, actualizar_muestra, this.options )
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

  irControlesCalidad (muestra) {
    this.router.navigate([`/members/controlescalidad/${muestra.muestra_qr}`]);
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
