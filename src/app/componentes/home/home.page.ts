import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController, NavParams } from "@ionic/angular";

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  options: BarcodeScannerOptions;
  encodedText:string='';
  encodedData:any={};
  scannedData:any={};

  constructor (
    public navCtrl: NavController,
    public router: Router,
    public barcodeScanner: BarcodeScanner
  ){}


  /**
   * Funcion de los botones de la seccion del QR
   */
  escanearQRMuestra () { // scan

    this.navCtrl.navigateForward('/controlescalidad');
    return;
    this.options = {
      prompt: 'Porfavor escanee el código QR'
    }
    this.barcodeScanner.scan(this.options).then((data)=>{
      this.scannedData = data;
    },(err)=>{
      console.log(err);
    });
  }

  ingresarQRMuestra () { // encode
    this.navCtrl.navigateForward('/ingresarqr');
    
    return;
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodedText).then((data)=>{
      this.encodedData = data;
    },(err)=>{
      console.log(err);
    });

    
  }


  
  /**
   * Funciones del submenú
   */
  irListadosMuestras () {
    this.navCtrl.navigateForward('/listasmuestras');
  }


}
