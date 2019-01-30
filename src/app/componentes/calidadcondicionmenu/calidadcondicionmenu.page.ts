import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController, AlertController, ModalController, NavParams } from "@ionic/angular";

import { Http, Headers, RequestOptions } from '@angular/http';

import { ModalformulariocalidadcondicionPage } from './modals/modalformulariocalidadcondicion/modalformulariocalidadcondicion.page';
import { ActivatedRoute } from '@angular/router';
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
  muestra_id:any='';

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
    
  }

  irHome () {
    this.navCtrl.navigateForward('/home'); 
  }

  irControlCalidad (muestra_id) {
    this.navCtrl.navigateForward(`/controlescalidad/${muestra_id}`);
  }

  irCalculoCondicion () {
    this.navCtrl.navigateForward('/calculocondicion');
  }

  irCalculoCalidad () {
    this.navCtrl.navigateForward('/calculocalidad');
  }

  async abrirModalFormularioCalidadCondicion (concepto_id, concepto_nombre) {
    const modal = await this.modalCtrl.create({
      component: ModalformulariocalidadcondicionPage,
      componentProps: {
        concepto_id: concepto_id,
        concepto_nombre: concepto_nombre,
      }
    });
    modal.present();
  }
  



}
