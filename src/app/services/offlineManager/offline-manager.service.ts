import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { forkJoin, Observable, from, of } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { storeCleanupFn } from '@angular/core/src/render3/instructions';

const STORAGE_REQ_KEY = 'storedreq';
const DEBUG = true;

interface StoredRequest {
   url:string,
   type:string,
   data:any,
   time:number,
   id:string
}

@Injectable({
   providedIn: 'root'
})

export class OfflineManagerService {

   private debug:boolean=true;

   constructor (
      private storage: Storage,
      private toastCtrl: ToastController,
      private http: HttpClient
   ) { }

   /**
    * Funcion observable que checkea los eventos de conexion de la aplicacion
    * revisa todas las acciones pendientes por realizar y las almacena en una base local
    * cuando la aplicacion vuelve a conectar, estas peticiones se envian al servidor sincronizando la aplicacion
    * funciona como bus de eventos
    */
   checkForEvents(): Observable<any> {
      /**
       * Existen varias funciones como from, of, etc que provienen de rxjs para el manejo de observables y promises asyncronas
       * en este caso, desde los datos de la key, ejecuto un pipe a partir de los resultados
       * switchMap funciona para crear promesas sobre observables
       */
      return from(this.storage.get(STORAGE_REQ_KEY)).pipe(
         switchMap(storedOperations => {
            /**
             * Parsea y valida si hay algo para enviar
             */
            let storedObj = JSON.parse(storedOperations);
            if (storedObj && storedObj.length > 0) {
               return this.sendRequest(storedObj).pipe(
                  finalize( () => {
                     if ( DEBUG ) {
                        let toast = this.toastCtrl.create({
                           message: 'Datos locales sincronizados con la API',
                           duration :500,
                           position: 'bottom'
                        });
                        toast.then(toast => toast.present());
                     }
                     /**
                      * Una ves que envia, elimina los registros locales de envio para que no siga enviando nada mas al servidor
                      */
                     this.storage.remove(STORAGE_REQ_KEY);
                  })
               );

            } else {
               if ( DEBUG ) {
                  let toast = this.toastCtrl.create({
                     message: 'No hay eventos locales',
                     duration :5000,
                     position: 'bottom'
                  });
                  toast.then(toast => toast.present());
                  console.log('No hay eventos locales');
               }
               this.storage.remove(STORAGE_REQ_KEY);
               return of(false);
            }
         })
      );
   }

   /**
    * Fabrica las peticiones y las guarda localmente para su posterior envío
    * a traves del bus de eventos
    * 
    * @param url 
    * @param type 
    * @param data 
    */
   storeRequest (url, type, data) {
      if ( DEBUG ) {
         let toast = this.toastCtrl.create({
            message: 'Tus datos han sido almacenados localmente debido a que te encuentras sin conexión.',
            duration: 5000,
            position: 'bottom'
         });
         toast.then( toast => toast.present());
      }

      let action: StoredRequest = {
         url:url,
         type:type,
         data:data,
         time: new Date().getTime(),
         id: Math.random().toString(36).replace(/^[a-z]+/g, '').substr(0, 5)
      }

      return this.storage.get(STORAGE_REQ_KEY).then(storedOperations => {
         
         let storedObj = JSON.parse(storedOperations);

         if ( DEBUG ) {
            let toast = this.toastCtrl.create({
               message: `${storedObj}`,
               duration: 5000,
               position: 'bottom'
            });
            toast.then( toast => toast.present());
            console.log(storedObj);

         }
         

         if (storedObj) {
            storedObj.push(action);
         } else {

            storedObj = [action];
         }



         if ( DEBUG ) {
            let toast = this.toastCtrl.create({
               message: `Petición guardada: ${action}`,
               duration :5000,
               position: 'bottom'
            });
            toast.then(toast => toast.present());
            console.log('Petición guardada: ', action);
         }
      

         // Guarda viejas y nuevas transiciones devuelta al storage
         return this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
      });
   }

   /**
    * Envia las peticiones de envios pendientes al servidor
    * recibe objeto del tipo StoredRequest que es una estructura definda para enviar un paquete (es una interfaz)
    * de acciones, settings, etc para el manejo de envios de peticiones con la base de datos
    * @param operations 
    */
   sendRequest (operations: StoredRequest[]) {
      let obs = [];

      for (let op of operations) {
         let toast = this.toastCtrl.create({
            message: `Enviando peticiones pendientes: ${op}`,
            duration :1000,
            position: 'bottom'
         });
         toast.then(toast => toast.present());
         console.log('Enviando peticiones pendientes: ', op);

         /**
          * Al array obs le paso cada una de las peticiones, en este caso
          * se usa http.request para especificar el tipo de peticion como parametro
          * type : tipo de peticion {get|put|post|delete|head|patch}
          * url : url de destino al recurso
          * data : los datos a enviar
          */
         let oneObs = this.http.request(op.type, op.url, op.data);
         obs.push(oneObs);
      }

      // Envia todos los eventos locales y retorna algunos que estén finalizados
      return forkJoin(obs);
   }

}