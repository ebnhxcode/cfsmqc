import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController, AlertController, ModalController, NavParams } from "@ionic/angular";

import { Http, Headers, RequestOptions } from '@angular/http';

import { ModalformulariocondicionPage } from './modals/modalformulariocondicion/modalformulariocondicion.page';

@Component({
  selector: 'app-calculocondicion',
  templateUrl: './calculocondicion.page.html',
  styleUrls: ['./calculocondicion.page.scss'],
})
export class CalculocondicionPage implements OnInit {


  defectos = [
    {
      defecto: 'Defecto 1',
      descripcion: 'Descripcion o comentario del defecto',
      textoAdicional: 'texto adicional',
      categoria: 'prueba1',
      nota: 'A',
    },
    {
      defecto: 'Defecto 2',
      descripcion: 'Descripcion o comentario del defecto',
      textoAdicional: 'texto adicional',
      categoria: 'prueba2',
      nota: 'B',
    },
    {
      defecto: 'Defecto 3',
      descripcion: 'Descripcion o comentario del defecto',
      textoAdicional: 'texto adicional',
      categoria: 'prueba3',
      nota: 'A',
    }
  ];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public http: Http
  ) { }

  ngOnInit() {
  }

  irCalidadCondicionMenu () {
    this.navCtrl.navigateForward('/calidadcondicionmenu');
  }
  irHome () {
    this.navCtrl.navigateForward('/home'); 
  }

  async abrirModalFormularioCalidadCondicion () {
    const modal = await this.modalCtrl.create({
      component: ModalformulariocondicionPage
    });
    modal.present();
  }

}
