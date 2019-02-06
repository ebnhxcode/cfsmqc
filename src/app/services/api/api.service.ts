import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import { OfflineManagerService } from '../offlineManager/offline-manager.service';
import { NetworkService, ConnectionStatus } from '../network/network.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, catchError } from 'rxjs/operators';

const API_STORAGE_KEY = 'specialkey';
const API_URL = 'https://cfsmqcpreprod.publicidadorigen.cl';
const DEBUG = true;

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  

  constructor(
     private storage: Storage,
     private http: HttpClient,
     private toastCtrl: ToastController,
     private networkService: NetworkService,
     private offlineManagerService: OfflineManagerService
  ) { 

  }


  checkearConexionOnlineAplicacion () {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return false;
    } else {
      return true;
    }
  }

  obtenerDatosParametricosMuestras (forceRefresh: boolean = false): Observable<any> {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      if ( DEBUG ) {
        let toast = this.toastCtrl.create({
          message: `No estás conectado a internet, datos obtenidos desde la base de datos local`,
          duration :2000,
          position: 'bottom'
        });
        toast.then(toast => toast.present());
        console.log(`Datos obtenidos desde la base de datos local:`);
      }
      return from(this.getLocalData('dataControlCalidad'));
    } else {
      let page = Math.floor(Math.random() * Math.floor(6));

      return this.http.get(`${API_URL}/mobile/getDataControlCalidadCompactada`).pipe(
        map(res => res['dataControlCalidad']),
        tap(res => {

          if ( DEBUG ) {
            let toast = this.toastCtrl.create({
              message: 'Datos obtenidos desde la base de datos externa',
              duration :2000,
              position: 'bottom'
            });
            toast.then(toast => toast.present());
            console.log(`Datos obtenidos desde la base de datos externa:`);
            console.log(res);
          }

          /*
          this.setLocalData('regiones', res.regiones); 
          this.setLocalData('productores', res.productores);
          this.setLocalData('especies', res.especies);
          this.setLocalData('variedades', res.variedades);
          this.setLocalData('calibres', res.calibres);
          this.setLocalData('categorias', res.categorias);
          this.setLocalData('embalajes', res.embalajes);
          this.setLocalData('etiquetas', res.etiquetas);
          this.setLocalData('apariencias', res.apariencias);
          this.setLocalData('estados_muestras', res.estados_muestras);
          */
          //alert('returns real live API data');
          this.setLocalData('dataControlCalidad', res);
        })
      );

    }
  }

  obtenerMuestras (forceRefresh: boolean = false): Observable<any> {

    /*
    from(this.getLocalData('muestras')).subscribe(res => { 
      
      console.log(res); 
      console.log(`Cargando muestras desde obenerMuestras`);
      // return res;
    }, err => {}, 
    () => {

    });
    */
    

    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh ) {
      if ( DEBUG ) {
        let toast = this.toastCtrl.create({
          message: 'No estás conectado a internet, datos obtenidos desde la base de datos local',
          duration :2000,
          position: 'bottom'
        });
        toast.then(toast => toast.present());
        //console.log(`Datos obtenidos desde la base de datos local:`);
      }
      return from(this.getLocalData('muestras'));
      //return from(this.getLocalData('muestras'));
    } else {
      let page = Math.floor(Math.random() * Math.floor(6));
      

      return this.http.get(`${API_URL}/mobile/muestras`).pipe(
        map(res => res['muestras']),
        tap(res => {

          if ( DEBUG ) {
            let toast = this.toastCtrl.create({
              message: 'Datos obtenidos desde la base de datos externa',
              duration :2000,
              position: 'bottom'
            });
            toast.then(toast => toast.present());
            console.log(`Datos obtenidos desde la base de datos externa:`);
            //console.log(res);
          }

          //alert('returns real live API data');
          this.setLocalData('muestras', res);
        })
      );

    }
    
  }

  obtenerMuestra (muestra_id): Observable<any> {

    let url = `${API_URL}/mobile/muestras/show`;
    let data = { muestra_id:muestra_id };
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      /**
      * obtengo el dato de base local
      */


      if ( DEBUG ) {
        let toast = this.toastCtrl.create({
          message: `No estás conectado a internet, datos obtenidos desde la base de datos local`,
          duration :5000,
          position: 'bottom'
        });
        toast.then(toast => toast.present());
        //console.log(data);
      }

      /**
       * Lo que hace este return es "desde lo que obtengo de la peticion en base local, entonces envíalo"
       * a traves del método from
       */
      return from(this.offlineManagerService.storeRequest(url, 'POST', data));
    } else {
      /**
       * actualiza muestra en el backend, en caso de error guarda el dato en local
       * captura errores
       */
      return this.http.post(url, data).pipe(
        catchError(err => {

            this.offlineManagerService.storeRequest(url, 'POST', data);

            if ( DEBUG ) {
              let toast = this.toastCtrl.create({
                message: `${err}`,
                duration :5000,
                position: 'bottom'
              });
              toast.then(toast => toast.present());
              //console.log(err);
            }      

            throw new Error(err); 
        })
      );

    }

  }

  obtenerMuestraPorQR (muestra_qr): Observable<any>  {

    let url = `${API_URL}/mobile/muestras/showByQR`;
    let data = {
      muestra_qr:muestra_qr
    };

    /**
     * Si el usuario está trabajando con las muestras, se guardan en una base local
     */
    //if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || true) {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || true) {
      //console.log(data);
      if ( DEBUG ) {
        let toast = this.toastCtrl.create({
          message: `No estás conectado a internet, datos obtenidos desde la base de datos local`,
          duration :2000,
          position: 'bottom'
        });
        toast.then(toast => toast.present());
        //console.log(data);
      }

      return this.obtenerMuestras(true);
      /**
       * almacena el dato de forma local en sqlite
       */
      //return from(this.offlineManagerService.storeRequest(url, 'POST', data));
    } else {
      /**
       * actualiza muestra en el backend
       * captura errores
       */
      return this.http.post(url, data).pipe(
        catchError(err => {
            this.offlineManagerService.storeRequest(url, 'POST', data);
            throw new Error(err); 
        })
      );

    }

  }

  crearMuestra (muestra, data): Observable<any> {
    let url = `${API_URL}/mobile/muestras/store`;
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      console.log(data);
      if ( DEBUG ) {
        let toast = this.toastCtrl.create({
          message: `No estás conectado a internet, se guardara esta acción para su posterior envio`,
          duration :2000,
          position: 'bottom'
        });
        toast.then(toast => toast.present());
        //console.log(data);
      }
      /**
       * almacena el dato de forma local en sqlite
       */
      return from(this.offlineManagerService.storeRequest(url, 'POST', data));
    } else {
      if ( DEBUG ) {
        let toast = this.toastCtrl.create({
          message: `Muestra enviada`,
          duration :1000,
          position: 'bottom'
        });
        toast.then(toast => toast.present());
        //console.log(data);
      }
      /**
       * actualiza muestra en el backend
       * captura errores
       */
      return this.http.post(url, data).pipe(
        catchError(err => {
            if ( DEBUG ) {
              let toast = this.toastCtrl.create({
                message: `Ocurrió un error en el envío, se guardara esta acción para su posterior envio`,
                duration :2000,
                position: 'bottom'
              });
              toast.then(toast => toast.present());
              //console.log(data);
            }
            this.offlineManagerService.storeRequest(url, 'POST', data);
            throw new Error(err); 
        })
      );

    }
  }

  actualizarMuestra (muestra): Observable<any> {
    let url = `${API_URL}/mobile/muestras/update`;
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      //console.log(data);
      if ( DEBUG ) {
        let toast = this.toastCtrl.create({
          message: `No estás conectado a internet, se guardara esta acción para su posterior envio`,
          duration :3000,
          position: 'bottom'
        });
        toast.then(toast => toast.present());
        console.log(muestra);
      }
      /**
       * almacena el dato de forma local en sqlite
       */
      return from(this.offlineManagerService.storeRequest(url, 'POST', muestra));
    } else {
      if ( DEBUG ) {
        let toast = this.toastCtrl.create({
          message: `Muestra enviada`,
          duration :1000,
          position: 'bottom'
        });
        toast.then(toast => toast.present());
        //console.log(data);
      }
      /**
       * actualiza muestra en el backend
       * captura errores
       */
      return this.http.post(url, muestra).pipe(
        catchError(err => {
            if ( DEBUG ) {
              let toast = this.toastCtrl.create({
                message: `Ocurrió un error en el envío, se guardara esta acción para su posterior envio`,
                duration :2000,
                position: 'bottom'
              });
              toast.then(toast => toast.present());
              //console.log(data);
            }
            this.offlineManagerService.storeRequest(url, 'POST', muestra);
            throw new Error(err); 
        })
      );

    }
  }








  

  // Save result of API request
  setLocalData (key ,data) {

    if ( DEBUG ) {
      let toast = this.toastCtrl.create({
        message: `Guardando datos en local!`,
        duration :2000,
        position: 'bottom'
      });
      toast.then(toast => toast.present());
      //console.log('setting local data!');
      //console.log(`API_STORAGE_KEY:${API_STORAGE_KEY} - key:${key} - data:${data}`);
    }    

    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }

  // Get cached API result
  getLocalData (key) {

    if ( DEBUG ) {
      let toast = this.toastCtrl.create({
        message: `Cargando datos de local!`,
        duration :2000,
        position: 'bottom'
      });
      toast.then(toast => toast.present());
      //console.log(`API_STORAGE_KEY:${API_STORAGE_KEY} - key:${key}`);
      //console.log('return local data!');
    }    

    
    //alert('return local data!');
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
    
  }

}
