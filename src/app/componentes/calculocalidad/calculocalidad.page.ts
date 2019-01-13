import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from "@ionic/angular";

import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-calculocalidad',
  templateUrl: './calculocalidad.page.html',
  styleUrls: ['./calculocalidad.page.scss'],
})
export class CalculocalidadPage implements OnInit {

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

}
