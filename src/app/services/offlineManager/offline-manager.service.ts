import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { forkJoin, Observable, from, of } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { storeCleanupFn } from '@angular/core/src/render3/instructions';

const STORAGE_REQ_KEY = 'storedreq';

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

   constructor (
      private storage: Storage,
      private toastCtrl: ToastController,
      private http: HttpClient
   ) { }

   checkForEvents(): Observable<any> {
      return from(this.storage.get(STORAGE_REQ_KEY)).pipe(
         switchMap(storedOperations => {
            let storedObj = JSON.parse(storedOperations);
            if (storedObj && storedObj.length > 0) {
               return this.sendRequest(storedObj).pipe(
                  finalize( () => {
                     let toast = this.toastCtrl.create({
                        message: 'Datos locales sincronizados con la API',
                        duration :3000,
                        position: 'bottom'
                     });
                     toast.then(toast => toast.present());
                     this.storage.remove(STORAGE_REQ_KEY);
                  })
               );

            } else {
               console.log('No hay eventos locales');
               return of(false);
            }
         })
      );
   }

   storeRequest (url, type, data) {
      let toast = this.toastCtrl.create({
         message: 'Tus datos han sido almacenados localmente debido a que te encuentras sin conexión.',
         duration: 3000,
         position: 'bottom'
      });
      toast.then( toast => toast.present());

      let action: StoredRequest = {
         url:url,
         type:type,
         data:data,
         time: new Date().getTime(),
         id: Math.random().toString(36).replace(/^[a-z]+/g, '').substr(0, 5)
      }

      return this.storage.get(STORAGE_REQ_KEY).then(storedOperations => {
         let storedObj = JSON.parse(storedOperations);
         if (storedObj) {
            storedObj.push(action);
         } else {
            storedObj = [action];
         }

         console.log('Petición guardada: ', action);
         // Guarda viejas y nuevas transiciones devuelta al storage
         return this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
      });
   }

   sendRequest (operations: StoredRequest[]) {
      let obs = [];

      for (let op of operations) {
         console.log('Realizando solicitud: ', op);
         let oneObs = this.http.request(op.type, op.url, op.data);
         obs.push(oneObs);
      }

      // Envia todos los eventos locales y retorna algunos que estén finalizados
      return forkJoin(obs);
   }

}