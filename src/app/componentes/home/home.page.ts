import { Component } from '@angular/core';
import { 
  //NavController, 
  MenuController 
} from "@ionic/angular";

/**
 * Modulos de uso de scanner QR y Barra
 */
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

/**
 * Router
 */
import { Router, ActivatedRoute } from '@angular/router';




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
  scan:any='';

  constructor (
    //private navCtrl: NavController,
    private menuCtrl: MenuController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private barcodeScanner: BarcodeScanner
  ){
    this.menuCtrl.enable(true);

    this.scan = this.activatedRoute.snapshot.paramMap.get('scan');
    if (this.scan) {
      this.escanearQRMuestra();
    }

    console.log([
      JSON.parse(localStorage.getItem('tokens')),
      JSON.parse(localStorage.getItem('datosUsuario'))
    ]);
  }


  /**
   * Funcion de los botones de la seccion del QR]
   */
  escanearQRMuestra () { // scan
    //this.navCtrl.navigateForward(`/controlescalidad/169`);
    //return;
    //this.navCtrl.navigateForward('/controlescalidad');
    //return;
    this.options = {
      prompt: 'Porfavor escanee el código QR'
    }

    this.barcodeScanner.scan(this.options).then((data)=>{
      
      this.scannedData = data; //JSON.stringify(data);
      if (this.scannedData) { //alert(this.scannedData);alert(JSON.stringify(this.scannedData));

        this.router.navigate([`/members/ingresarqr/${this.scannedData.text}`]);
        /*
        return;
        this.navCtrl.navigateForward(`/controlescalidad/${this.scannedData.text}`);
        */
      }
      //console.log(this.scannedData);
      
    },(err)=>{
      console.log(err);
    });

    
    
  }

  ingresarQRMuestra () { // encode


    this.router.navigate(['members', 'ingresarqr']);


    /*
    return;

    this.navCtrl.navigateForward('/ingresarqr');
    
    return;
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodedText).then((data)=>{
      this.encodedData = data;
    },(err)=>{
      console.log(err);
    });
    */

    
  }


  
  /**
   * Funciones del submenú
   */
  irListadosMuestras () {

    this.router.navigate(['members', 'listasmuestras']);

    /*
    return;
    this.navCtrl.navigateForward('/listasmuestras');
    */
  }


}
