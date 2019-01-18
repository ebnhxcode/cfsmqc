import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController, AlertController, ModalController, NavParams } from "@ionic/angular";

import { Http, Headers, RequestOptions } from '@angular/http';

import { ModalformulariocalidadcondicionPage } from './modals/modalformulariocalidadcondicion/modalformulariocalidadcondicion.page';

@Component({
  selector: 'app-calidadcondicion',
  templateUrl: './calidadcondicionmenu.page.html',
  styleUrls: ['./calidadcondicionmenu.page.scss'],
})
export class CalidadcondicionmenuPage implements OnInit {

  servicio: {
    nota_calidad:0,
    nota_condicion:0,
  }

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public http: Http
  ) { }

  ngOnInit() {
    
  }

  irHome () {
    this.navCtrl.navigateForward('/home'); 
  }

  irControlCalidad () {
    this.navCtrl.navigateForward('/controlescalidad');
  }

  irCalculoCondicion () {
    this.navCtrl.navigateForward('/calculocondicion');
  }

  irCalculoCalidad () {
    this.navCtrl.navigateForward('/calculocalidad');
  }

  async abrirModalFormularioCalidadCondicion (concepto) {
    const modal = await this.modalCtrl.create({
      component: ModalformulariocalidadcondicionPage,
      componentProps: {
        concepto_id: concepto
      }
    });
    modal.present();
  }
  



}
