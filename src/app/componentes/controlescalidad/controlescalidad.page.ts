import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, NavParams } from "@ionic/angular";

@Component({
  selector: 'app-controlescalidad',
  templateUrl: './controlescalidad.page.html',
  styleUrls: ['./controlescalidad.page.scss'],
})
export class ControlescalidadPage implements OnInit {

  control = {
    region_id:null,
    productor_id:null,
    especie_id:null,
    variedad_id:null,
    calibre:null,
    categoria_id:null,
    embalaje_id:null,
    etiqueta_id:null,
    peso:null,
    calculo_total:null,
  }

  regiones = [
    {region_id:1,region_nombre:'Arica'},
    {region_id:2,region_nombre:'Antofagasta'},
    {region_id:3,region_nombre:'Copiapo'},
    {region_id:4,region_nombre:'Coquimbo'},
    {region_id:5,region_nombre:'Valparaiso'},
    {region_id:6,region_nombre:'RM'},
  ];
  

  constructor(
    public navCtrl: NavController
  ){}

  ngOnInit() {
    this.cargarInformacionInicial();
  }

  cargarInformacionInicial () {


  }

  irHome () {
    this.navCtrl.navigateForward('/home');
  }

  public calcularTolerancia () {    
    // this.control.calculo_total = (this.control.region_id + this.control.productor_id + this.control.especie_id + this.control.variedad_id ) / 4;
    // console.log(this.control.calculo_total);

  }


}
