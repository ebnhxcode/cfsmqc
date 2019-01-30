import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController, NavParams } from "@ionic/angular";

import { Http, Headers, RequestOptions } from '@angular/http';

import { ModalformulariocalidadPage } from './modals/modalformulariocalidad/modalformulariocalidad.page';
import { ActivatedRoute } from '@angular/router';



  // API REST.
  import { cfsmBackendConfig } from '../../servicios/apirest/cfsm-backend-config';
  import { authBasicConfig } from '../../servicios/authbasic/auth-basic-config';

@Component({
  selector: 'app-calculocalidad',
  templateUrl: './calculocalidad.page.html',
  styleUrls: ['./calculocalidad.page.scss'],
})
export class CalculocalidadPage implements OnInit {


url_base = authBasicConfig.url_base_qa;
headers = new Headers(authBasicConfig.headers);
options = new RequestOptions({ headers: this.headers });

  defectos = [
  ];

  muestra_id:any='';
  muestra:any={};



  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public activatedRoute: ActivatedRoute,
    public http: Http
  ) {
    this.muestra_id = this.activatedRoute.snapshot.paramMap.get('muestra_id');
  }


  ngOnInit() {
    this.cargarInformacionInicial();
  }

  cargarInformacionInicial () {


    this.obtenerMuestra(this.muestra_id);
    // Carga la muestra con el id que viene 

    //console.log(this.muestra_id);
    //console.log(new Date(Date.now()).toLocaleTimeString());
  }

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
    this.http.post(`${this.url_base}/mobile/muestras/show`, {muestra_id:muestra_id}, this.options )
      .subscribe( res => { 
        //console.log(res);
        self.muestra = res.json().muestra; 

        //console.log(self.muestra);




    });

  }

  irCalidadCondicionMenu (muestra_id) {
    this.navCtrl.navigateForward(`/calidadcondicionmenu/${this.muestra_id}`);
  }

  irHome () {
    this.navCtrl.navigateForward('/home'); 
  }


  async abrirModalFormularioCalidad () {
    const modal = await this.modalCtrl.create({
      component: ModalformulariocalidadPage
    });
    modal.present();
  }

}
